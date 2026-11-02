// Course224-local learner state. NOT authentication or server-synchronized progress.
const CourseProgress = (() => {
  const PROFILE_KEY = 'xacademy_course224_profile';
  const DOMAINS = Object.freeze({
    general:'تحليل البيانات العام',sales:'المبيعات والأداء',operations:'العمليات',
    finance:'المالية',hr:'الموارد البشرية',marketing:'التسويق',
    education:'التعليم',healthcare:'الإدارة الصحية',technology:'التقنية',other:'مجال آخر'
  });
  const normalized = name => String(name || '').trim().normalize('NFKC').toLocaleLowerCase('en');
  const keyFor = name => `xacademy_course224_completed_${encodeURIComponent(normalized(name))}`;
  function getProfile(){
    try{
      const value=JSON.parse(localStorage.getItem(PROFILE_KEY)||'null');
      if(!value || typeof value.name!=='string' || !value.name.trim())return null;
      return {name:value.name.trim(),domain:Object.hasOwn(DOMAINS,value.domain)?value.domain:'general'};
    }catch{return null;}
  }
  function setProfile(input){
    const name=String(input?.name||'').trim();
    if(!name)throw new Error('Learner name required.');
    const profile={name,domain:Object.hasOwn(DOMAINS,input?.domain)?input.domain:'general'};
    localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));
    return profile;
  }
  function getCompleted(){
    const profile=getProfile();
    if(!profile)return [];
    try{
      const value=JSON.parse(localStorage.getItem(keyFor(profile.name))||'[]');
      return Array.isArray(value)?[...new Set(value.filter(x=>Number.isInteger(x)&&x>=1&&x<=10))].sort((a,b)=>a-b):[];
    }catch{return [];}
  }
  function setCompleted(days){
    const profile=getProfile();
    if(!profile)throw new Error('Learner is not signed in.');
    const cleaned=[...new Set(days.filter(x=>Number.isInteger(x)&&x>=1&&x<=10))].sort((a,b)=>a-b);
    localStorage.setItem(keyFor(profile.name),JSON.stringify(cleaned));
    return cleaned;
  }
  function logout(){localStorage.removeItem(PROFILE_KEY);}
  function domainLabel(domain){return DOMAINS[domain]||DOMAINS.general;}
  return Object.freeze({getProfile,setProfile,getCompleted,setCompleted,logout,domainLabel,domains:DOMAINS});
})();
