(function(){
const toast=document.getElementById('toast');let tt;
function show(m){toast.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('show'),1400)}
document.querySelectorAll('.copy').forEach(b=>b.addEventListener('click',async()=>{
  const clone=b.parentElement.cloneNode(true);clone.querySelector('.copy').remove();
  const text=clone.textContent.trim();
  try{await navigator.clipboard.writeText(text)}catch(e){const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}
  b.classList.add('done');b.textContent='복사됨';show('복사했어요');
  setTimeout(()=>{b.classList.remove('done');b.textContent='복사'},1500);
}));
})();
