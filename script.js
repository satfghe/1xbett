const grid = document.getElementById('grid');
const playBtn = document.getElementById('playBtn');

// إنشاء المربعات
for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
}

playBtn.addEventListener('click', () => {
    // إزالة أي تمييز سابق
    document.querySelectorAll('.cell').forEach(c => c.classList.remove('highlight'));

    // اختيار 3 مربعات عشوائية
    let chosen = [];
    while (chosen.length < 3) {
        let rand = Math.floor(Math.random() * 25);
        if (!chosen.includes(rand)) chosen.push(rand);
    }

    // تمييز المربعات المختارة
    chosen.forEach(index => {
        grid.children[index].classList.add('highlight');
    });
});
