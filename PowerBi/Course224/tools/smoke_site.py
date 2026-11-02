#!/usr/bin/env python3
"""Real Chromium smoke test for the static Course224 learner website.

Tests browser navigation and JS interactions; does NOT open Power BI Desktop.
"""
import asyncio
import json
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        return

async def smoke(base):
    events=[]
    async with async_playwright() as playwright:
        browser=await playwright.chromium.launch(headless=True,args=['--no-sandbox'])
        context=await browser.new_context(viewport={'width':1280,'height':800},locale='ar-JO')
        page=await context.new_page()
        errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        # Login failure is correctly rejected and success stores domain choice.
        await page.goto(base+'/login.html')
        await page.locator('#loginBtn').click()
        assert await page.locator('#errorBox').is_visible(), 'No error for missing identity'
        await page.locator('#name').fill('QA Learner')
        await page.locator('#interest').select_option('finance')
        await page.locator('#password').fill('PowerBI')
        await page.locator('#loginBtn').click()
        await page.wait_for_url('**/dashboard.html')
        assert 'QA Learner' in await page.locator('#studentName').inner_text()
        assert 'المالية' in await page.locator('#learnerInterest').inner_text()
        assert await page.locator('#daysGrid').locator('a[href*="day.html?id="]').count()>=1
        events.append('login/profile/dashboard')

        for day,resource in [
            (8,'week3/day8/downloads/Nova_Day08_Executive_360_PBIR.zip'),
            (9,'week3/day9/downloads/Day09_INTERACTIVITY_LAB.zip'),
            (10,'week3/day10/downloads/Day10_CAPSTONE.zip')]:
            await page.goto(base+'/day.html?id='+str(day))
            await page.locator('#titleEn').wait_for()
            assert 'Day' in (await page.title())
            links=await page.locator('a[href]').evaluate_all('(nodes)=>nodes.map(x=>x.getAttribute("href"))')
            assert any(resource in (u or '') for u in links),(day,links)
            response=await page.request.head(base+'/'+resource)
            assert response.status==200,(resource,response.status)
            events.append('day'+str(day)+'_resources')
        # New domain-based challenge has no named-person choice.
        await page.goto(base+'/week3/day10/student-missions.html')
        assert await page.locator('button[data-role="finance"]').count()==1
        await page.locator('button[data-role="finance"]').click()
        assert 'المالية' in await page.locator('#roleName').inner_text()
        events.append('domain_mission_switch')
        # AI is optional and clearly described as a prompt tool.
        await page.goto(base+'/week3/day10/ai-visual-design-lab.html')
        assert await page.locator('button[data-role="finance"]').count()>=1
        assert 'Prompt' in (await page.locator('body').inner_text())
        events.append('ai_prompt_builder')
        await page.goto(base+'/week3/day7/web/index.html')
        assert await page.locator('a[href="FINANCE_SCENARIO.html"]').count()==1
        events.append('general_scenario_navigation')
        if errors:
            raise AssertionError('Unhandled browser JavaScript errors: '+json.dumps(errors,ensure_ascii=False))
        print(json.dumps({'status':'PASS','browser':'Chromium','checks':events,'uncaught_errors':errors},ensure_ascii=False))
        await browser.close()

def main():
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    thread=threading.Thread(target=server.serve_forever,daemon=True)
    thread.start()
    try:
        asyncio.run(smoke('http://127.0.0.1:'+str(server.server_port)))
    finally:
        server.shutdown()
        server.server_close()

if __name__=='__main__':
    main()
