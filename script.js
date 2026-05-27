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

const lyricsData = [
    { time: 0.17, text: "Happy Birthday!" },
    { time: 5.59, text: "Happy Birthday to you!" },
    { time: 10.84, text: "Ты погасила свечи на тортике" },
    { time: 13.51, text: "Вспомнила, как было не хорошо" },
    { time: 16.11, text: "Как сидела грустно на бортике" },
    { time: 18.45, text: "Обнимаясь год со своей душой" },
    { time: 20.81, text: "Знаешь, я уверена, что не зря" },
    { time: 22.93, text: "Время пролетало по дресс-коду" },
    { time: 25.45, text: "Теперь с тобой такие друзья" },
    { time: 27.46, text: "Что ты можешь в огонь и в воду" },
    { time: 29.28, text: "Hey, Happy Birthday, girl" },
    { time: 31.19, text: "Я желаю тебе жизнь из любимого фильма" },
    { time: 34.16, text: "Happy Birthday, girl" },
    { time: 36.23, text: "Я желаю тебе петь, танцевать и гулять" },
    { time: 38.80, text: "Hey, Happy Birthday, girl" },
    { time: 41.27, text: "И пускай те, кто нужен, горят тобой сильно" },
    { time: 44.09, text: "Happy Birthday, girl" },
    { time: 46.16, text: "Не разреши себя потерять" },
    { time: 49.50, text: "" }, // Muzička pauza između refrena i drugog dela (briše tekst)
    { time: 69.54, text: "Я знаю, ты не хочешь всё поскорей" },
    { time: 72.13, text: "Главное, чтоб вовремя, но всегда" },
    { time: 74.68, text: "Я тебя прошу, больше не болей" },
    { time: 77.21, text: "Остальное всё мы разрулим, да" },
    { time: 79.27, text: "Карты лягут так, как ты кинешь их" },
    { time: 81.59, text: "А ты кинула их джокером на крыши" },
    { time: 84.56, text: "И голоса из прошлого стихли" },
    { time: 86.50, text: "Ведь больше ты их не слышишь" },
    { time: 87.59, text: "Hey, Happy Birthday, girl" },
    { time: 90.41, text: "Я желаю тебе жизнь из любимого фильма" },
    { time: 93.21, text: "Happy Birthday, girl" },
    { time: 95.36, text: "Я желаю тебе петь, танцевать и гулять" },
    { time: 97.92, text: "Hey, Happy Birthday, girl" },
    { time: 100.10, text: "И пускай те, кто нужен, горят тобой сильно" },
    { time: 102.66, text: "Happy Birthday, girl" },
    { time: 105.11, text: "Не разреши себя потерять" },
    { time: 107.65, text: "Happy birthday" },
    { time: 112.59, text: "Happy birthday" },
    { time: 122.63, text: "Happy birthday 🎵" }
];

const lyricsContainer = document.getElementById('tekst-pesme');

if (music && lyricsContainer) {
    music.addEventListener('timeupdate', () => {
        const currentTime = music.currentTime;
        let activeLyric = "";
        
        for (let i = 0; i < lyricsData.length; i++) {
            if (currentTime >= lyricsData[i].time) {
                activeLyric = lyricsData[i].text;
            }
        }
        
        if (lyricsContainer.innerText !== activeLyric) {
            lyricsContainer.innerText = activeLyric;
            
            // Sakriva ceo crni okvir ako nema teksta (tokom pauze)
            if (activeLyric === "") {
                lyricsContainer.style.display = "none";
            } else {
                lyricsContainer.style.display = "block";
            }
        }
    });
}
