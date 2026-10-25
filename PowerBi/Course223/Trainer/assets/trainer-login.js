/* A light PIN gate for a public static website; not server authentication. */
(()=>{"use strict";
const HASH="9060ce5653093cd9bff480cb01ff0e3a790e6f545e214a3dd85841daabac7848";
const authKey="xa223_trainer_session_v1",returnKey="xa223_trainer_return_v1";
const root="/XAcademyCourses/PowerBi/Course223/";
const form=document.querySelector("#pin-form"),input=document.querySelector("#pin"),error=document.querySelector("#pin-error"),submit=document.querySelector("#unlock"),dots=[...document.querySelectorAll(".pin-dot")];
const params=new URLSearchParams(location.search);
const defaultPage=new URL("index.html",location.href);
function display(){let pin=input.value.replace(/\D/g,"").slice(0,4);input.value=pin;dots.forEach((dot,i)=>{dot.classList.toggle("filled",i<pin.length);dot.classList.remove("invalid")});error.textContent="";submit.disabled=pin.length!==4;}
async function validate(e){e.preventDefault();if(input.value.length!==4)return;submit.disabled=true;submit.textContent="جار التحقق…";try{
 const data=new TextEncoder().encode(input.value);
 const digest=await crypto.subtle.digest("SHA-256",data);
 const got=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,"0")).join("");
 if(got!==HASH)throw Error("Incorrect PIN");
 sessionStorage.setItem(authKey,"authenticated");
 const from=params.get("next")||sessionStorage.getItem(returnKey)||"";
 sessionStorage.removeItem(returnKey);
 // Only navigate back to known local trainer pages, including the day-one trainer handout.
 const parsed=from?new URL(from,location.origin):null;
 const safe=parsed&&parsed.origin===location.origin&&(parsed.pathname.startsWith(root+"Trainer/")||parsed.pathname===root+"week1/day1/web/Day01_Trainer.html")&&!parsed.pathname.endsWith("/login.html");
 location.replace(safe?parsed.href:defaultPage.href);
 }catch(_){error.textContent="رمز الدخول غير صحيح، جرب مرة ثانية";dots.forEach(x=>x.classList.add("invalid"));input.value="";submit.disabled=true;submit.textContent="دخول مساحة المدرب";input.focus();}
}
input.addEventListener("input",display);form.addEventListener("submit",validate);
document.querySelectorAll("[data-pin-key]").forEach(btn=>btn.addEventListener("click",()=>{let key=btn.dataset.pinKey;if(key==="erase")input.value=input.value.slice(0,-1);else if(key==="clear")input.value="";else if(input.value.length<4)input.value+=key;display();if(input.value.length===4)form.requestSubmit();}));
document.querySelector("#toggle-pin").addEventListener("click",()=>{const shown=input.type==="text";input.type=shown?"password":"text";document.querySelector("#toggle-pin").textContent=shown?"عرض الرمز":"إخفاء الرمز";input.focus();});
input.focus();display();
})();