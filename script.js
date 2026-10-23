const STORAGE_KEY = "lamarHosaTracker_v1";
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

let entries = [];
let displayName = "";

function loadData(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    entries = Array.isArray(saved.entries) ? saved.entries : [];
    displayName = typeof saved.displayName === "string" ? saved.displayName : "";
  } catch { entries = []; displayName = ""; }
}
function saveData(){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({entries, displayName})); }
  catch { setMessage("Your browser couldn't save this data. Try exporting your log."); }
}
function total(){ return entries.reduce((sum, item) => sum + Number(item.points || 0), 0); }
function fmt(n){ return Number(n.toFixed(1)).toString(); }
function setMessage(text){ const el=$("#progressMessage"); if(el) el.textContent=text; }
function render(){
  const sum=total();
  $("#totalPoints").textContent=fmt(sum);
  $("#progressFill").style.width=Math.min(100,(sum/15)*100)+"%";
  if(sum>=15) setMessage("You've reached 15 points! Confirm your official active-member status with an officer.");
  else setMessage(`${fmt(15-sum)} more points to reach the 15-point annual goal.`);
  const log=$("#activityLog");
  log.innerHTML="";
  if(entries.length===0){
    const li=document.createElement("li"); li.className="empty-log"; li.textContent="No activities added yet."; log.appendChild(li);
  } else {
    entries.slice().reverse().forEach((item, reversedIndex)=>{
      const actualIndex=entries.length-1-reversedIndex;
      const li=document.createElement("li");
      const left=document.createElement("span");
      left.textContent=item.name+" · "+item.date;
      const right=document.createElement("span");
      const strong=document.createElement("strong"); strong.textContent="+"+fmt(item.points)+" pt"+(item.points===1?"":"s");
      const remove=document.createElement("button"); remove.type="button"; remove.className="remove-entry"; remove.textContent="×"; remove.setAttribute("aria-label","Remove "+item.name); remove.addEventListener("click",()=>{entries.splice(actualIndex,1);saveData();render();});
      right.append(strong,remove); li.append(left,right); log.appendChild(li);
    });
  }
  $("#memberName").value=displayName;
}
function initTracker(){
  loadData(); render();
  $("#memberName").addEventListener("input",e=>{displayName=e.target.value.slice(0,40);saveData();});
  $("#addActivity").addEventListener("click",()=>{
    const select=$("#activitySelect");
    const points=Number(select.value);
    const name=select.options[select.selectedIndex].text.split(" — ")[0];
    entries.push({name,points,date:new Date().toLocaleDateString()});
    saveData();render();
  });
  $("#clearLog").addEventListener("click",()=>{
    if(entries.length && confirm("Clear your entire local activity log? This cannot be undone.")){entries=[];saveData();render();}
  });
  $("#exportLog").addEventListener("click",()=>{
    const rows=[["Activity","Points","Date"],...entries.map(e=>[e.name,fmt(e.points),e.date])];
    const csv=rows.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(",")).join("\r\n");
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob); const a=document.createElement("a");a.href=url;a.download="lamar-hosa-points.csv";a.click();URL.revokeObjectURL(url);
  });
}
function initFilters(){
  $$(".filter-pill").forEach(button=>button.addEventListener("click",()=>{
    $$(".filter-pill").forEach(b=>b.classList.toggle("selected",b===button));
    const filter=button.dataset.filter;let count=0;
    $$(".event-row").forEach(row=>{const show=filter==="all"||row.dataset.category===filter;row.hidden=!show;if(show)count++;});
    $("#eventsCount").textContent=`${count} opportunit${count===1?"y":"ies"}`;
  }));
}
function initNav(){
  const toggle=$("#menuToggle"), nav=$("#mainNav");
  toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});
  $$(".nav-link").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");}));
  const sections=$$(".section-anchor");
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const id=entry.target.id;$$(".nav-link").forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+id));}}),{rootMargin:"-25% 0px -65% 0px"});
  sections.forEach(section=>observer.observe(section));
}
$("#year").textContent=new Date().getFullYear();
initTracker();initFilters();initNav();
