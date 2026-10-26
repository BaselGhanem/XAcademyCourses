/* X Academy · Course223 shared loader controller.
   Content readiness drives dismissal; max watchdog prevents blocking the user. */
(function(){
 "use strict";
 function mount(options){
   options=options||{};
   if(!document.body)return null;
   const reduced=typeof window.matchMedia==="function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   const safeText=s=>String(s==null?"":s);
   const overlay=document.createElement("div");
   overlay.className="xa-loader";
   overlay.setAttribute("role","status");
   overlay.setAttribute("aria-live","polite");
   overlay.setAttribute("aria-label","جاري تجهيز مساحة التعلم");
   const card=document.createElement("div");
   card.className="xa-loader__card";
   card.innerHTML='<div class="xa-loader__overline"><span class="xa-loader__live" aria-hidden="true"></span><span>LEARNING EXPERIENCE</span></div>'+
    '<div class="xa-loader__mark"><span class="xa-loader__ring" aria-hidden="true"></span><span class="xa-loader__logo"><img src="Trainer/assets/X_Academy_Intersection.svg" width="56" height="56" alt=""></span></div>'+
    '<div class="xa-loader__brand" dir="ltr">X ACADEMY</div><div class="xa-loader__brand-sub" dir="ltr">LEARN · ANALYSE · LEAD</div>'+
    '<h2 class="xa-loader__title">جاري تجهيز مساحة التعلم</h2><p class="xa-loader__subtitle">COURSE223 · MARIAM</p>'+
    '<div class="xa-loader__track" aria-hidden="true"><span class="xa-loader__fill"></span></div>'+
    '<div class="xa-loader__footer"><span>PREPARING YOUR WORKSPACE</span><i aria-hidden="true"></i></div>';
   const heading=card.querySelector(".xa-loader__subtitle");
   if(options.day)heading.textContent="COURSE223 · DAY "+String(options.day).padStart(2,"0");
   if(options.subtitle)heading.textContent=safeText(options.subtitle);
   overlay.append(card);
   document.body.prepend(overlay);
   document.body.classList.add("xa-loading-active");
   const content=options.content||null;
   if(content)content.inert=true;
   const fill=overlay.querySelector(".xa-loader__fill");
   let settled=false,done=false,watchdog=null,pending=null,removeLater=null;
   const started=performance.now();
   function clean(){
     if(done)return;
     done=true;clearTimeout(watchdog);clearTimeout(pending);clearTimeout(removeLater);
     if(content)content.inert=false;
     document.body.classList.remove("xa-loading-active");
     overlay.remove();
   }
   function finish(){
     if(settled||done)return;
     settled=true;
     if(reduced){clean();return;}
     const minDuration=Math.max(0,Math.min(1000,Number(options.minDuration)||680));
     const wait=Math.max(0,minDuration-(performance.now()-started));
     pending=setTimeout(()=>{
       if(done)return;
       overlay.classList.add("is-ready");
       removeLater=setTimeout(()=>{
         if(done)return;
         overlay.classList.add("is-leaving");
         setTimeout(clean,430);
       },270);
     },wait);
   }
   watchdog=setTimeout(clean,2600);
   if(reduced){overlay.style.display="none";}
   else requestAnimationFrame(()=>{fill.style.width="77%";});
   return {finish,remove:clean,element:overlay};
 }
 window.XAcademyLoader={mount};
})();
