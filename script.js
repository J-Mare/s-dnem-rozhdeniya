const intro = document.getElementById('intro');
const opened = document.getElementById('opened');
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

const playerPlay = document.getElementById('player-play');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.querySelector('.progress-container');

document.getElementById('message').innerText = window.customMessage;
document.getElementById('signature').innerText = window.customSignature;

document.querySelector('.click-area').addEventListener('click', ()=>{
    intro.classList.remove('active');

    setTimeout(() => {
        if (music) {
            music.volume = 0.3; 
            music.play().catch(error => console.log("Audio play blocked:", error));
            if (playerPlay) playerPlay.innerText = '⏸';
        }
    }, 2500);

    setTimeout(()=>{
        opened.classList.add('active');
    },1000);
});

function updateButtonStates() {
    if (music.paused) {
        if (playerPlay) playerPlay.innerText = '▶';
        if (musicToggle) {
            musicToggle.classList.add('muted');
            musicToggle.innerText = '🔇';
        }
    } else {
        if (playerPlay) playerPlay.innerText = '⏸';
        if (musicToggle) {
            musicToggle.classList.remove('muted');
            musicToggle.innerText = '🎵';
        }
    }
}

if (musicToggle && music) {
    musicToggle.addEventListener('click', () => {
        if (music.paused) music.play();
        else music.pause();
        updateButtonStates();
    });
}

if (playerPlay && music) {
    playerPlay.addEventListener('click', () => {
        if (music.paused) music.play();
        else music.pause();
        updateButtonStates();
    });
}

if (music && progressBar) {
    music.addEventListener('timeupdate', () => {
        const percentage = (music.currentTime / music.duration) * 100;
        progressBar.style.width = percentage + '%';
    });
}

if (progressContainer && music) {
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = music.duration;
        if (duration) music.currentTime = (clickX / width) * duration;
    });
}

// ==========================================

// ==========================================
const lyricsData = {
    0: "🎵 (Вступление) 🎵",
    5: "Ты погасила свечи на тортике",
    9: "Вспомнила, как было нехорошо",
    13: "Как сидела грустно на бортике",
    17: "Обнимаясь год со своей душой",
    21: "Знаешь, я уверена, что не зря",
    24: "Время пролетало по дресс-коду",
    28: "Теперь с тобой такие друзья",
    32: "Что ты можешь в огонь и в воду",
    35: "Hey, happy birthday, girl",
    39: "Я желаю тебе жизнь из любимого фильма",
    43: "Happy birthday, girl",
    46: "Я желаю тебе петь, танцевать и гулять",
    50: "Hey, happy birthday, girl",
    54: "И пускай те, кто нужен, горят тобой сильно",
    58: "Happy birthday, girl",
    61: "Не разреши себя потерять",
    71: "Я знаю, ты не хочешь все поскорей",
    75: "Главное, чтоб вовремя, но всегда",
    78: "Я тебя прошу, больше не болей",
    82: "Остальное все мы разрулим, да",
    86: "Карты лягут так, как ты кинешь их",
    90: "А ты кинула их джокером на крыши",
    93: "И голоса из прошлого стихли",
    97: "Ведь больше ты их не слышишь",
    101: "Hey, happy birthday, girl",
    105: "Я желаю тебе жизнь из любимого фильма",
    109: "Happy birthday, girl",
    112: "Я желаю тебе петь, танцевать и гулять",
    116: "Hey, happy birthday, girl",
    120: "И пускай те, кто нужен, горят тобой сильно",
    124: "Happy birthday, girl",
    127: "Не разреши себя потерять",
    131: "Happy birthday",
    135: "Happy birthday",
    139: "Happy birthday 🎵"
};

const lyricsContainer = document.getElementById('tekst-pesme');

if (music && lyricsContainer) {
    music.addEventListener('timeupdate', () => {
        const currentSecond = Math.floor(music.currentTime);
        
        let activeLyric = "";
        for (const second in lyricsData) {
            if (currentSecond >= parseInt(second)) {
                activeLyric = lyricsData[second];
            }
        }
        
        if (lyricsContainer.innerText !== activeLyric) {
            lyricsContainer.innerText = activeLyric;
        }
    });
}
