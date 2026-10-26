/* Premium instructor shell. Enhances presentation, never changes session content. */
(()=>{"use strict";
const script=document.currentScript;
const root=new URL("../",script.src);
const days=[
["اول تقرير، خطوة بخطوة","../week1/day1/web/Day01_Trainer.html"],
["تنظيف بيانات تقييم الاداء","Day02_Performance.html"],
["من الملفات للتحديث التلقائي","Day03_Integration.html"],
["نموذج بيانات الاداء","Day04_Model.html"],
["DAX وExecutive Overview","Day05_DAX.html"],
["Filter Context",null],
["مقارنات الاداء",null],
["تجربة الداشبورد",null],
["التفاعلات المتقدمة",null],
["HTML / SVG والتسليم",null]
];
const link=(p)=>new URL(p,root).href;
const style=document.createElement("link");style.rel="stylesheet";style.href=new URL("trainer-shell.css?v=20261025-premium",script.src).href;document.head.append(style);
const mobile=document.createElement("link");mobile.rel="stylesheet";mobile.href=new URL("trainer-mobile.css?v=20261026-r1",script.src).href;document.head.append(mobile);
function load(){
 if(document.body.classList.contains("xp-portal"))return;
 document.body.classList.add("xp-trainer");
 const focus=document.getElementById("focus-app");
 const target=focus||document.querySelector("body > main");
 if(!target)return;
 document.body.classList.toggle("xp-focus",!!focus);document.body.classList.toggle("xp-reference",!focus);
 const shell=document.createElement("div");shell.className="xp-shell-layout";
 const sidebar=document.createElement("aside");sidebar.className="xp-shell-sidebar";sidebar.id="xp-shell-sidebar";sidebar.setAttribute("aria-label","قائمة أيام الدورة");
 sidebar.innerHTML='<a class="xp-shell-brand" href="'+link("index.html")+'"><img src="'+link("assets/X_Academy_Intersection.svg")+'" alt=""><span><b>X ACADEMY</b><small>TRAINER STUDIO</small></span></a><div class="xp-shell-heading">COURSE 223 <span>10 SESSIONS</span></div>';
 const nav=document.createElement("nav");nav.className="xp-shell-days";nav.setAttribute("aria-label","أيام التدريب");
 const pathname=location.pathname;
 days.forEach(([name,p],i)=>{
 const a=document.createElement(p?"a":"div");a.className="xp-shell-day"+(!p?" pending":"");
 const path=p?link(p):"";
 if(p)a.href=path;
 if(path&&new URL(path).pathname===pathname){a.classList.add("current");a.setAttribute("aria-current","page")}
 const number=document.createElement("span");number.className="xp-shell-num";number.textContent=String(i+1).padStart(2,"0");
 const names=document.createElement("span");names.className="xp-shell-name";names.textContent=name;
 const note=document.createElement("small");note.textContent=i<4?"مكتمل":i===4?"جاهز":"مخطط";
 a.append(number,names,note);nav.append(a);
 });
 sidebar.append(nav);
 const footer=document.createElement("div");footer.className="xp-shell-foot";footer.innerHTML='<a href="'+link("index.html")+'">مركز المدرب ↗</a><span>PRIVATE WORKSPACE</span>';sidebar.append(footer);
 const backdrop=document.createElement("button");backdrop.type="button";backdrop.className="xp-shell-backdrop";backdrop.hidden=true;backdrop.setAttribute("aria-label","إغلاق قائمة الأيام");
 const toggle=document.createElement("button");toggle.type="button";toggle.className="xp-shell-toggle";toggle.setAttribute("aria-label","فتح قائمة الأيام");toggle.setAttribute("aria-controls","xp-shell-sidebar");toggle.setAttribute("aria-expanded","false");toggle.textContent="☰";
 target.before(shell);shell.append(sidebar,target);document.body.append(backdrop);
 // On a phone the menu belongs in the toolbar, never floating above lesson text.
 const toolbar=focus?.querySelector(`.cf-header`);
 if(toolbar)toolbar.append(toggle);else document.body.append(toggle);
 function close(){document.body.classList.remove("xp-side-open");toggle.setAttribute("aria-expanded","false");backdrop.hidden=true}
 toggle.addEventListener("click",()=>{const opened=document.body.classList.toggle("xp-side-open");toggle.setAttribute("aria-expanded",String(opened));backdrop.hidden=!opened});
 backdrop.addEventListener("click",close);document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
 // Mark the currently displayed lesson as the natural destination in the persistent nav.
 if(focus){
   const id=Number(document.body.dataset.checklist?.match(/Day(\d+)/)?.[1]);
   if(id>=1&&id<=10){nav.querySelectorAll(".xp-shell-day").forEach((a,i)=>{a.classList.toggle("current",i===id);if(i===id)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")})}
   const reveal=focus.querySelector("#cf-step-help");
   if(reveal){reveal.textContent="كشف الإجابة والتفاصيل ✦";reveal.hidden=false}
 }
 const motionQuery=window.matchMedia("(prefers-reduced-motion: reduce)");
 document.addEventListener("pointermove",e=>{if(motionQuery.matches||window.innerWidth<1000)return;const ambient=focus?.querySelector(".cf-ambient");if(!ambient)return;ambient.style.setProperty("--pointer-x",((e.clientX/window.innerWidth)-.5)*20+"px");ambient.style.setProperty("--pointer-y",((e.clientY/window.innerHeight)-.5)*14+"px")},{passive:true});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",load,{once:true});else load();
})();