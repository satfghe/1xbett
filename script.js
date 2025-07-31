document.addEventListener('DOMContentLoaded', function() {
    const playButtonOverlay = document.getElementById('playButtonOverlay');
    const gridOverlay = document.getElementById('gridOverlay');
    const gameImage = document.querySelector('.game-image');
    
    // إعدادات الشبكة 5x5
    const GRID_SIZE = 5;
    const SAFE_CELLS_COUNT = 3;
    
    // أبعاد الصورة الأصلية
    const ORIGINAL_WIDTH = 828;
    const ORIGINAL_HEIGHT = 1792;
    
    // إحداثيات الشبكة بالبكسل في الصورة الأصلية (بناءً على التحليل البصري)
    const GRID_BOUNDS = {
        top: 340,      // بداية الشبكة من الأعلى
        left: 125,     // بداية الشبكة من اليسار
        width: 578,    // عرض الشبكة
        height: 578    // ارتفاع الشبكة
    };
    
    // إحداثيات الزر الأخضر بالبكسل في الصورة الأصلية
    const PLAY_BUTTON_BOUNDS = {
        top: 1110,     // موقع الزر من الأعلى
        left: 360,     // موقع الزر من اليسار
        width: 108,    // عرض الزر
        height: 80     // ارتفاع الزر
    };
    
    // مصفوفة لتخزين المربعات المختارة
    let selectedCells = [];
    
    // حساب مواضع المربعات في الشبكة بناءً على أبعاد الصورة المعروضة
    function calculateGridPositions() {
        const positions = [];
        
        // الحصول على أبعاد الصورة المعروضة
        const displayedRect = gameImage.getBoundingClientRect();
        const containerRect = gameImage.parentElement.getBoundingClientRect();
        
        // حساب نسبة التحجيم
        const scaleX = displayedRect.width / ORIGINAL_WIDTH;
        const scaleY = displayedRect.height / ORIGINAL_HEIGHT;
        
        // حساب أبعاد الشبكة المعروضة
        const gridDisplayed = {
            top: GRID_BOUNDS.top * scaleY,
            left: GRID_BOUNDS.left * scaleX,
            width: GRID_BOUNDS.width * scaleX,
            height: GRID_BOUNDS.height * scaleY
        };
        
        // حساب أبعاد كل مربع
        const cellWidth = gridDisplayed.width / GRID_SIZE;
        const cellHeight = gridDisplayed.height / GRID_SIZE;
        
        // إنشاء مواضع المربعات
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                positions.push({
                    top: gridDisplayed.top + (row * cellHeight),
                    left: gridDisplayed.left + (col * cellWidth),
                    width: cellWidth * 0.85, // تقليل الحجم قليلاً للمظهر
                    height: cellHeight * 0.85
                });
            }
        }
        
        return positions;
    }
    
    // تحديث موقع الزر بناءً على أبعاد الصورة المعروضة
    function updatePlayButtonPosition() {
        const displayedRect = gameImage.getBoundingClientRect();
        const containerRect = gameImage.parentElement.getBoundingClientRect();
        
        // حساب نسبة التحجيم
        const scaleX = displayedRect.width / ORIGINAL_WIDTH;
        const scaleY = displayedRect.height / ORIGINAL_HEIGHT;
        
        // حساب موقع الزر المعروض
        const buttonDisplayed = {
            top: PLAY_BUTTON_BOUNDS.top * scaleY,
            left: PLAY_BUTTON_BOUNDS.left * scaleX,
            width: PLAY_BUTTON_BOUNDS.width * scaleX,
            height: PLAY_BUTTON_BOUNDS.height * scaleY
        };
        
        // تطبيق المواقع على الزر
        playButtonOverlay.style.top = buttonDisplayed.top + 'px';
        playButtonOverlay.style.left = buttonDisplayed.left + 'px';
        playButtonOverlay.style.width = buttonDisplayed.width + 'px';
        playButtonOverlay.style.height = buttonDisplayed.height + 'px';
    }
    
    // اختيار مربعات عشوائية
    function selectRandomCells() {
        const totalCells = GRID_SIZE * GRID_SIZE;
        const selected = new Set();
        
        while (selected.size < SAFE_CELLS_COUNT) {
            const randomIndex = Math.floor(Math.random() * totalCells);
            selected.add(randomIndex);
        }
        
        return Array.from(selected);
    }
    
    // إنشاء وعرض المربعات المختارة
    function showSafeCells() {
        // إزالة المربعات السابقة
        clearPreviousCells();
        
        // اختيار مربعات جديدة
        selectedCells = selectRandomCells();
        const positions = calculateGridPositions();
        
        // إنشاء وعرض المربعات
        selectedCells.forEach(cellIndex => {
            const position = positions[cellIndex];
            const cellElement = document.createElement('div');
            
            cellElement.className = 'grid-cell';
            cellElement.style.position = 'absolute';
            cellElement.style.top = position.top + 'px';
            cellElement.style.left = position.left + 'px';
            cellElement.style.width = position.width + 'px';
            cellElement.style.height = position.height + 'px';
            cellElement.style.border = '3px solid #00ff00';
            cellElement.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
            cellElement.style.borderRadius = '8px';
            cellElement.style.opacity = '0';
            cellElement.style.transition = 'opacity 0.3s ease-in-out';
            cellElement.style.pointerEvents = 'none';
            cellElement.style.zIndex = '5';
            
            gridOverlay.appendChild(cellElement);
            
            // تأثير الظهور التدريجي
            setTimeout(() => {
                cellElement.style.opacity = '1';
            }, 100);
        });
    }
    
    // إزالة المربعات السابقة
    function clearPreviousCells() {
        const existingCells = gridOverlay.querySelectorAll('.grid-cell');
        existingCells.forEach(cell => {
            cell.style.opacity = '0';
            setTimeout(() => {
                if (cell.parentNode) {
                    cell.parentNode.removeChild(cell);
                }
            }, 300);
        });
    }
    
    // تحديث المواقع عند تغيير حجم النافذة
    function updatePositions() {
        updatePlayButtonPosition();
        if (selectedCells.length > 0) {
            showSafeCells();
        }
    }
    
    // إضافة مستمع الحدث للزر
    playButtonOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        showSafeCells();
        
        // تأثير بصري للزر
        this.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
        setTimeout(() => {
            this.style.backgroundColor = 'transparent';
        }, 200);
    });
    
    // إضافة تأثير hover للزر
    playButtonOverlay.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
    });
    
    playButtonOverlay.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
    });
    
    // تحديث المواقع عند تحميل الصورة
    gameImage.addEventListener('load', updatePositions);
    
    // تحديث المواقع عند تغيير حجم النافذة
    window.addEventListener('resize', updatePositions);
    
    // تحديث المواقع الأولي
    if (gameImage.complete) {
        updatePositions();
    }
});

