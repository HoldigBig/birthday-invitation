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

// Анимация звёзд
function createStars() {
    const stars = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        stars.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', createStars);

// Анимация открытия карточки
document.querySelector('.card').addEventListener('click', function() {
    this.classList.toggle('open');
    
    // Создаем конфетти при открытии
    if (this.classList.contains('open')) {
        createConfetti();
        playSound();
    }
});

// Функция создания конфетти
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
            animation: confetti ${2 + Math.random() * 2}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        document.body.appendChild(confetti);
        
        // Удаляем конфетти после анимации
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Функция получения случайного цвета
function getRandomColor() {
    const colors = [
        '#ff4081', '#64b5f6', '#81c784', '#ffd54f', '#ff8a65',
        '#ba68c8', '#4db6ac', '#fff176', '#f06292', '#7986cb'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Функция воспроизведения звука
function playSound() {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.log('Audio autoplay was prevented'));
}

// Анимация при наведении на элементы развлечений
document.querySelectorAll('.entertainment-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Функция для добавления фотографий
function addPhoto(input, target) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            const placeholder = target.querySelector('.photo-placeholder');
            if (placeholder) {
                placeholder.replaceWith(img);
            }
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Добавляем обработчики для плейсхолдеров фотографий
document.querySelectorAll('.photo-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function() {
            addPhoto(this, placeholder.parentElement);
        };
        input.click();
    });
}); 