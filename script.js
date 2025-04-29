document.addEventListener('DOMContentLoaded', () => {
    const seal = document.getElementById('seal');
    const content = document.querySelector('.content');
    let isRevealed = false;

    seal.addEventListener('click', () => {
        if (!isRevealed) {
            // Анимация печати
            seal.style.animation = 'sealClick 0.3s ease';
            
            // После анимации печати показываем контент
            setTimeout(() => {
                content.classList.remove('hidden');
                setTimeout(() => {
                    content.classList.add('show');
                }, 50);
            }, 300);

            isRevealed = true;
        }
    });

    // Сброс анимации печати
    seal.addEventListener('animationend', () => {
        seal.style.animation = '';
    });
});

document.querySelector('.card').addEventListener('click', function() {
    this.classList.toggle('open');
    
    // Создаем конфетти при открытии
    if (this.classList.contains('open')) {
        createConfetti();
    }
});

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${getRandomColor()};
            left: ${Math.random() * 100}vw;
            top: -20px;
            animation: confetti 3s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        document.body.appendChild(confetti);
        
        // Удаляем конфетти после анимации
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

function getRandomColor() {
    const colors = ['#ff4081', '#64b5f6', '#81c784', '#ffd54f', '#ff8a65'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Добавляем звуковой эффект при открытии
const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
document.querySelector('.card').addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play().catch(err => console.log('Audio autoplay was prevented'));
}); 