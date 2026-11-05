(() => {
const toast=document.createElement(`div`);toast.className=`feedback-toast`;toast.setAttribute(`role`,`status`);toast.setAttribute(`aria-live`,`polite`);document.body.append(toast);let timer;
window.day9Feedback=message=>{toast.textContent=message;toast.classList.add(`show`);clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove(`show`),2200);const surface=document.querySelector(`.stage,.mj-content,.shell`);if(surface){surface.classList.remove(`celebrate`);void surface.offsetWidth;surface.classList.add(`celebrate`);}};
document.addEventListener(`click`,event=>{const button=event.target.closest(`button,a`);if(!button||button.disabled)return;if(!matchMedia(`(prefers-reduced-motion: reduce)`).matches&&!document.body.classList.contains(`reduced`)){button.animate([{transform:`scale(1)`},{transform:`scale(.96)`},{transform:`scale(1)`}],{duration:220,easing:`ease-out`});}if(button.id===`mj-complete`)window.day9Feedback(`تم تسجيل تقدمك ✓`);});
})();
