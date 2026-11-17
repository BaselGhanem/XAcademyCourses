/* Course224 trainer interface gate. Client-side only: never use for genuine secrecy. */
(()=>{"use strict";
  const script=document.currentScript;
  const authKey="xa224_trainer_session_v1";
  const returnKey="xa224_trainer_return_v1";
  const login=new URL("../login.html",script.src);
  let authorized=false;
  try{authorized=sessionStorage.getItem(authKey)==="authenticated";}catch{}
  if(authorized){document.documentElement.classList.add("trainer-ok");return;}
  try{sessionStorage.setItem(returnKey,location.pathname+location.search+location.hash);}catch{}
  location.replace(login.href);
})();