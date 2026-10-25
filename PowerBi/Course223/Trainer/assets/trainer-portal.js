(()=>{"use strict";
const paths={1:"../week1/day1/web/Day01_Trainer.html",2:"Day02_Performance.html",3:"Day03_Integration.html",4:"Day04_Model.html",5:"Day05_DAX.html"};
const dates={1:"15 OCT",2:"18 OCT",3:"20 OCT",4:"22 OCT",5:"25 OCT",6:"27 OCT",7:"29 OCT",8:"01 NOV",9:"03 NOV",10:"05 NOV"};
const parent=document.getElementById("xp-days"),cards=document.getElementById("xp-daycards");
if(!parent||!cards||typeof DAYS==="undefined")return;
for(const day of DAYS){
 const a=document.createElement(day.id<=5?"a":"div");
 a.className="xp-day-link"+(day.id===5?" is-active":"")+(day.id>5?" is-planned":"");
 if(day.id<=5)a.href=paths[day.id];
 if(day.id===5)a.setAttribute("aria-current","page");
 const numeral=document.createElement("span");numeral.className="xp-day-numeral";numeral.textContent=String(day.id).padStart(2,"0");
 const text=document.createElement("span");text.className="xp-day-text";
 const title=document.createElement("strong");title.textContent=day.titleAr;
 const sub=document.createElement("small");sub.textContent=day.id<=4?"تم التدريب":day.id===5?"جاهز للتدريب":"مخطط";
 text.append(title,sub);a.append(numeral,text);parent.append(a);
 const card=document.createElement(day.id<=5?"a":"article");card.className="xp-daycard"+(day.id===5?" is-featured":"")+(day.id>5?" is-planned":"");
 if(day.id<=5)card.href=paths[day.id];
 const head=document.createElement("div");head.className="xp-daycard-head";
 const number=document.createElement("span");number.className="xp-card-num";number.textContent="DAY "+String(day.id).padStart(2,"0");
 const date=document.createElement("span");date.className="xp-card-date";date.textContent=dates[day.id];
 head.append(number,date);
 const h=document.createElement("h3");h.textContent=day.titleAr;
 const footer=document.createElement("div");footer.className="xp-daycard-foot";
 const status=document.createElement("span");status.textContent=day.id<=4?"مكتمل":day.id===5?"جاهز للفتح":"قيد التخطيط";
 const mark=document.createElement("span");mark.textContent=day.id<=5?"↖":"—";
 footer.append(status,mark);card.append(head,h,footer);cards.append(card);
}
const toggle=document.getElementById("xp-toggle"),back=document.getElementById("xp-backdrop");
function close(){document.body.classList.remove("xp-open");toggle?.setAttribute("aria-expanded","false");if(back)back.hidden=true}
toggle?.addEventListener("click",()=>{const open=document.body.classList.toggle("xp-open");toggle.setAttribute("aria-expanded",String(open));back.hidden=!open});
back?.addEventListener("click",close);window.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
})();