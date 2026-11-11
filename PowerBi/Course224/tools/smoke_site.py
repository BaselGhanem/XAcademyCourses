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
        await page.locator('#interestSummary').click()
        await page.locator('button[data-domain="finance"]').click()
        assert await page.locator('#interest').input_value() == 'finance'
        assert 'المالية' in await page.locator('#interestLabel').inner_text()
        assert not await page.locator('#interestPicker').evaluate('(node) => node.open')
        # Keyboard selection must not submit the login form.
        await page.locator('#interestSummary').focus()
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('End')
        await page.keyboard.press('Enter')
        assert await page.locator('#interest').input_value() == 'other'
        assert page.url.endswith('/login.html')
        await page.locator('#interestSummary').click()
        await page.locator('button[data-domain="finance"]').click()
        await page.locator('#password').fill('PowerBI')
        await page.locator('#loginBtn').click()
        await page.wait_for_url('**/dashboard.html')
        assert 'QA Learner' in await page.locator('#studentName').inner_text()
        assert 'المالية' in await page.locator('#learnerInterest').inner_text()
        assert await page.locator('#daysGrid').locator('a[href*="day.html?id="]').count()>=1
        events.append('login/profile/dashboard')

        await page.goto(base+'/day.html?id=1',wait_until='domcontentloaded')
        player=page.locator('#videoBox iframe')
        await player.wait_for()
        assert await player.get_attribute('src')=='https://1drv.ms/v/c/a1a27fad04d192e9/IQRhd2OqUAiGS4Z9nRq-RX3dATYBszhzhg0VC8u919tFtLQ'
        assert await page.locator('#recordingHeroWrap').is_visible()
        assert await page.locator('#dayQuickVideo').is_visible()
        titles=await page.locator('#resources .resource-copy strong').all_inner_texts()
        assert 'Nova Data Dictionary' not in titles
        assert 'Nova Business Rules' not in titles
        assert len(titles)==3, titles
        assert 'Day 01 - Nova Source Pack' in titles
        events.append('day1_video_new_and_two_docs_removed')

        for day,resource in [
            (8,'week3/day8/downloads/Nova_Day08_Executive_360_PBIR.zip'),
            (9,'week3/day9/downloads/Day09_INTERACTIVITY_LAB.zip'),
            (10,'week3/day10/downloads/Day10_CAPSTONE.zip')]:
            response=await page.request.head(base+'/'+resource)
            assert response.status==200,(resource,response.status)
            await page.goto(base+'/day.html?id='+str(day),wait_until='domcontentloaded')
            await page.wait_for_timeout(150)
            if '/day.html?' in page.url:
                links=await page.locator('a[href]').evaluate_all('(nodes)=>nodes.map(x=>x.getAttribute("href"))')
                assert any(resource in (u or '') for u in links),(day,links)
            else:
                assert '/dashboard.html' in page.url,(day,page.url)
            events.append('day'+str(day)+'_resource_and_publication_check')
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
        # Full Concept Studio coverage: every concept must display and open a real lesson.
        # These three days were previously empty and would incorrectly show "0 concepts".
        for day,expected in [(8,5),(9,5),(10,6)]:
            await page.goto(base+'/concepts/?day='+str(day),wait_until='domcontentloaded')
            cards=page.locator('#dayConceptGrid .card')
            await cards.first.wait_for()
            assert await cards.count()==expected,(day,'concepts',await cards.count())
            assert (await page.locator('#conceptCount').inner_text()).strip()==str(expected)
            for idx in range(expected):
                card=cards.nth(idx)
                assert await card.get_attribute('role')=='button'
                await card.click()
                dialog=page.locator('#conceptDialog')
                assert await dialog.is_visible(),(day,idx,'modal failed')
                assert (await page.locator('#dialogTitle').inner_text()).strip(),(day,idx,'no title')
                assert (await page.locator('#dialogVisual').inner_text()).strip(),(day,idx,'no visual')
                await page.locator('#closeDialog').click()
                assert not await dialog.is_visible(),(day,idx,'modal did not close')
            await cards.first.focus()
            await cards.first.press('Enter')
            assert await page.locator('#conceptDialog').is_visible(),(day,'keyboard not working')
            await page.locator('#closeDialog').click()
            events.append('day'+str(day)+'_concepts_'+str(expected)+'_modal_and_keyboard')
        await page.get_by_role('button',name='استكشف أكثر').click()
        assert await page.locator('#cardsGrid .card').count()>=16, 'Concept Explore mode failed'
        events.append('concept_explore_mode')

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
