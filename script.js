document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope');
    const bgMusic = document.getElementById('bgMusic');
    const soundBtn = document.querySelector('.sound-btn');
    let isMuted = false;
    let musicStarted = false;

    // Инициализация звука
    bgMusic.volume = 0.5;
    
    // Предварительная загрузка аудио
    bgMusic.load();

    // Обработчик клика по конверту
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        
        // Начинаем воспроизведение музыки при первом открытии
        if (!musicStarted && !isMuted) {
            startMusic();
        }
    });

    // Функция запуска музыки
    function startMusic() {
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    musicStarted = true;
                    soundBtn.querySelector('i').className = 'fas fa-volume-up';
                    soundBtn.classList.remove('muted');
                })
                .catch(error => {
                    console.log("Autoplay prevented:", error);
                    // Если автовоспроизведение заблокировано, показываем кнопку воспроизведения
                    soundBtn.querySelector('i').className = 'fas fa-volume-mute';
                    soundBtn.classList.add('muted');
                    isMuted = true;
                });
        }
    }

    // Управление звуком
    soundBtn.addEventListener('click', () => {
        if (isMuted) {
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        soundBtn.querySelector('i').className = 'fas fa-volume-up';
                        isMuted = false;
                        musicStarted = true;
                    })
                    .catch(error => {
                        console.log("Playback prevented:", error);
                    });
            }
        } else {
            bgMusic.pause();
            soundBtn.querySelector('i').className = 'fas fa-volume-mute';
            isMuted = true;
        }
        soundBtn.classList.toggle('muted');
    });

    // Обработка событий аудио
    bgMusic.addEventListener('play', () => {
        soundBtn.querySelector('i').className = 'fas fa-volume-up';
        soundBtn.classList.remove('muted');
        isMuted = false;
    });

    bgMusic.addEventListener('pause', () => {
        soundBtn.querySelector('i').className = 'fas fa-volume-mute';
        soundBtn.classList.add('muted');
        isMuted = true;
    });

    // Обработка ошибок загрузки аудио
    bgMusic.addEventListener('error', (e) => {
        console.log("Error loading audio:", e);
        soundBtn.querySelector('i').className = 'fas fa-volume-mute';
        soundBtn.classList.add('muted');
        isMuted = true;
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

// Анимация при наведении на элементы развлечений
document.querySelectorAll('.entertainment-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Функция создания конфетти
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const colors = [
            '#ff4081', '#64b5f6', '#81c784', '#ffd54f', '#ff8a65',
            '#ba68c8', '#4db6ac', '#fff176', '#f06292', '#7986cb'
        ];
        
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            animation: confetti ${2 + Math.random() * 2}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
            z-index: 1000;
        `;

        // Добавляем keyframes для конфетти
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confetti {
                0% { 
                    transform: translateY(0) rotate(${Math.random() * 360}deg);
                    opacity: 1;
                }
                100% { 
                    transform: translateY(100vh) rotate(${Math.random() * 720}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
            style.remove();
        }, 4000);
    }
}

// Функция воспроизведения звука
function playSound() {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.log('Audio autoplay was prevented'));
}

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

// Добавляем обработчики для плейсхолдера фотографии
document.querySelector('.photo-placeholder').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function() {
        addPhoto(this, document.querySelector('.main-photo'));
    };
    input.click();
}); 