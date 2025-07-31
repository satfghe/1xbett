// script.js
const gridContainer = document.querySelector('.grid-container');
const playButton = document.getElementById('playButton');
const totalSquares = 25;

for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-item');
    gridContainer.appendChild(square);
}

playButton.addEventListener('click', () => {
    const allSquares = document.querySelectorAll('.grid-item');

    allSquares.forEach(square => {
        square.classList.remove('selected');
    });

    const selectedIndices = new Set();
    while (selectedIndices.size < 3) {
        const randomIndex = Math.floor(Math.random() * totalSquares);
        selectedIndices.add(randomIndex);
    }

    selectedIndices.forEach(index => {
        allSquares[index].classList.add('selected');
    });
});
