const scene = document.getElementById('scene');
const playBtn = document.getElementById('play');

function toggleReveal() {
  const willReveal = !scene.classList.contains('reveal');
  scene.classList.toggle('reveal', willReveal);
  playBtn.setAttribute('aria-pressed', String(willReveal));
  playBtn.title = willReveal ? 'Hide' : 'Play';
}

playBtn.addEventListener('click', toggleReveal);
playBtn.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleReveal();
  }
});
