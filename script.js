(function(){
  const gridEl = document.getElementById('grid');
  const playBtn = document.getElementById('playBtn');
  const toast = document.getElementById('toast');

  const styles = getComputedStyle(document.documentElement);
  const rows = parseInt(styles.getPropertyValue('--rows')) || 5;
  const cols = parseInt(styles.getPropertyValue('--cols')) || 5;
  const total = rows * cols;

  const cells = [];
  for(let i=0;i<total;i++){
    const c = document.createElement('div');
    c.className = 'cell';
    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.innerHTML = '★';
    c.appendChild(icon);
    gridEl.appendChild(c);
    cells.push(c);
  }

  function pickUniqueRandom(n){
    const arr = Array.from({length:total}, (_,i)=>i);
    for(let i=arr.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr.slice(0,n);
  }

  function highlight(indices){
    cells.forEach(cl => cl.classList.remove('marked'));
    indices.forEach((idx, order) => {
      const el = cells[idx];
      setTimeout(()=> {
        el.classList.add('marked');
      }, order * 180);
    });
  }

  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 1200);
  }

  playBtn.addEventListener('click', async ()=>{
    playBtn.classList.add('disabled');
    const chosen = pickUniqueRandom(3);
    highlight(chosen);
    showToast('تم اختيار 3 مواقع');
    await new Promise(r => setTimeout(r, 1200));
    playBtn.classList.remove('disabled');
  });
})();
