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

const lyricsData = {
    10: "Ты погасила свечи на тортике",
    14: "Вспомнила, как было нехорошо",
    18: "Как сидела грустно на бортике",
    22: "Обнимаясь год со своей душой",
    26: "Знаешь, я уверена, что не зря",
    29: "Время пролетало по дресс-коду",
    33: "Теперь с тобой такие друзья",
    37: "Что ты можешь в огонь и в воду",
    40: "Hey, happy birthday, girl",
    44: "Я желаю тебе жизнь из любимого фильма",
    48: "Happy birthday, girl",
    51: "Я желаю тебе петь, танцевать и гулять",
    55: "Hey, happy birthday, girl",
    59: "И пускай те, кто нужен, горят тобой сильно",
    63: "Happy birthday, girl",
    66: "Не разреши себя потерять",
    76: "Я знаю, ты не хочешь все поскорей",
    80: "Главное, чтоб вовремя, но всегда",
    83: "Я тебя прошу, больше не болей",
    87: "Остальное все мы разрулим, да",
    91: "Карты лягут так, как ты кинешь их",
    95: "А ты кинула их джокером на крыши",
    98: "И голоса из прошлого стихли",
    102: "Ведь больше ты их не слышишь",
    106: "Hey, happy birthday, girl",
    110: "Я желаю тебе жизнь из любимого фильма",
    114: "Happy birthday, girl",
    117: "Я желаю тебе петь, танцевать и гулять",
    121: "Hey, happy birthday, girl",
    125: "И пускай те, кто нужен, горят тобой сильно",
    129: "Happy birthday, girl",
    132: "Не разреши себя потерять",
    136: "Happy birthday",
    140: "Happy birthday",
    144: "Happy birthday 🎵"
};

const lyricsContainer = document.getElementById('tekst-pesme');

if (music && lyricsContainer) {
    music.addEventListener('timeupdate', () => {
        const currentSecond = Math.floor(music.currentTime);
        let activeLyric = "Мари Краймбрери - Happy Birthday, Girl! 🎵";
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
