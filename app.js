(function(){
const toast=document.getElementById('toast');let tt;
function show(m){toast.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('show'),1400)}
// copy buttons
document.querySelectorAll('.copy').forEach(b=>b.addEventListener('click',async()=>{
  const box=b.parentElement;const clone=box.cloneNode(true);clone.querySelector('.copy').remove();
  const text=clone.textContent.trim();
  try{await navigator.clipboard.writeText(text)}catch(e){const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}
  b.classList.add('done');b.textContent='복사됨';show('복사했어요');
  setTimeout(()=>{b.classList.remove('done');b.textContent='복사'},1500);
}));
// must only
const mo=document.getElementById('mustOnly');
mo.checked=localStorage.getItem('yuha-must')==='1';
function applyMo(){document.body.classList.toggle('must-only',mo.checked);localStorage.setItem('yuha-must',mo.checked?'1':'0')}
mo.addEventListener('change',applyMo);applyMo();
// checklists
document.querySelectorAll('.ck[data-store]').forEach(ul=>{
  const key='yuha-'+ul.dataset.store;
  const saved=JSON.parse(localStorage.getItem(key)||'[]');
  const boxes=ul.querySelectorAll('input');
  boxes.forEach((c,i)=>{c.checked=!!saved[i];c.addEventListener('change',()=>{
    localStorage.setItem(key,JSON.stringify([...boxes].map(x=>x.checked)));prog()})});
});
function prog(){
  const ul=document.querySelector('.ck[data-store="follow"]');if(!ul)return;
  const all=[...ul.querySelectorAll('li')].filter(li=>li.offsetParent!==null).map(li=>li.querySelector('input'));
  const done=all.filter(x=>x.checked).length;
  document.getElementById('bar').style.width=(all.length?done/all.length*100:0)+'%';
  document.getElementById('barTxt').textContent=done+' / '+all.length;
}
mo.addEventListener('change',prog);prog();
// print: expand all collapsibles (fallback for older browsers)
window.addEventListener('beforeprint',()=>document.querySelectorAll('details').forEach(d=>d.open=true));
// scrollspy
const links=[...document.querySelectorAll('#nav a')];
const map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove('on'));const a=map.get(e.target.id);if(a){a.classList.add('on');const n=document.querySelector('#nav');n.scrollTo({left:a.offsetLeft-n.clientWidth/2+a.clientWidth/2,behavior:'smooth'})}}})},{rootMargin:'-30% 0px -60% 0px'});
document.querySelectorAll('section[id]').forEach(s=>io.observe(s));
})();
