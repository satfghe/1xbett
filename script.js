\
// Gems Mines — Simulated 5x5 grid that picks 3 safe cells on play
(function(){
  const GRID = document.getElementById('grid');
  const PLAY = document.getElementById('playBtn');
  const BOXES = document.getElementById('boxesCount');
  const DIAMOND = document.getElementById('diamondCount');
  const RISK = document.getElementById('riskPercent');
  const TOTAL = 25;
  const SAFE_TO_PICK = 3;

  let cells = [];
  let lastSafe = [];

  // create cells
  function buildGrid(){
    GRID.innerHTML = '';
    cells = [];
    for(let i=0;i<TOTAL;i++){
      const c = document.createElement('button');
      c.className = 'cell';
      c.setAttribute('aria-label','خانة رقم ' + (i+1));
      c.dataset.index = i;
      const inner = document.createElement('div');
      inner.className = 'content';
      inner.textContent = '';
      c.appendChild(inner);
      GRID.appendChild(c);
      cells.push(c);
    }
    updateStats();
  }

  // utility: pick n unique random indices
  function pickRandom(n, exclude=[]){
    const pool = [];
    for(let i=0;i<TOTAL;i++){
      if(!exclude.includes(i)) pool.push(i);
    }
    for(let i=pool.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [pool[i],pool[j]]=[pool[j],pool[i]];
    }
    return pool.slice(0,n).map(x=>Number(x));
  }

  function clearSafe(){
    lastSafe.forEach(idx=>{
      const el = cells[idx];
      if(el){
        el.classList.remove('safe');
        el.innerHTML = '<div class="content"></div>';
      }
    });
    lastSafe = [];
  }

  function revealSafes(indices){
    // reveal with small stagger
    indices.forEach((idx,i)=>{
      setTimeout(()=>{
        const el = cells[idx];
        if(!el) return;
        el.classList.add('safe');
        el.innerHTML = '<div class="tick">✓</div>';
        // subtle sparkle scaling
        setTimeout(()=>{ el.classList.add('spark'); }, 400);
      }, i*250);
    });
    lastSafe = indices;
  }

  function updateStats(){
    BOXES.textContent = '0 / ' + TOTAL;
    const diamonds = lastSafe.length;
    DIAMOND.textContent = diamonds;
    RISK.textContent = Math.round((1 - (diamonds/TOTAL))*100) + '%';
  }

  PLAY.addEventListener('click', function(){
    // disable while animating
    PLAY.disabled = true;
    PLAY.style.opacity = '0.9';
    clearSafe();

    // pick 3 indices
    const picks = pickRandom(SAFE_TO_PICK);
    revealSafes(picks);
    // update stats after reveal
    setTimeout(()=>{
      updateStats();
      // re-enable button
      PLAY.disabled = false;
      PLAY.style.opacity = '1';
    }, SAFE_TO_PICK * 300 + 450);
  });

  // build on load
  buildGrid();

  // allow clicking individual cell to toggle (optional)
  GRID.addEventListener('click', (e)=>{
    const cell = e.target.closest('.cell');
    if(!cell) return;
    // toggle safe (developer mode)
    const idx = Number(cell.dataset.index);
    if(cell.classList.contains('safe')){
      cell.classList.remove('safe');
      cell.innerHTML = '<div class="content"></div>';
      lastSafe = lastSafe.filter(x=>x!==idx);
    } else {
      if(lastSafe.length < SAFE_TO_PICK){
        cell.classList.add('safe');
        cell.innerHTML = '<div class="tick">✓</div>';
        lastSafe.push(idx);
      } else {
        // flash to show can't add more than safe count
        cell.animate([{transform:'scale(0.98)'},{transform:'scale(1)'}],{duration:160});
      }
    }
    updateStats();
  });

  // small accessibility: press Enter on play when focused
  PLAY.addEventListener('keyup', (ev)=>{
    if(ev.key === 'Enter') PLAY.click();
  });

})();\n