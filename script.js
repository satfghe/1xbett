const grid = document.getElementById('grid');
const playBtn = document.getElementById('playBtn');

for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
}

playBtn.addEventListener('click', () => {
    document.querySelectorAll('.cell').forEach(c => c.classList.remove('highlight'));

    let chosen = [];
    while (chosen.length < 3) {
        let rand = Math.floor(Math.random() * 25);
        if (!chosen.includes(rand)) chosen.push(rand);
    }

    chosen.forEach(index => {
        grid.children[index].classList.add('highlight');
    });
});