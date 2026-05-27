const intro = document.getElementById('intro');
const opened = document.getElementById('opened');
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

const playerPlay = document.getElementById('player-play');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.querySelector('.progress-container');

// Selektor za klizač jačine zvuka
const volumeSlider = document.getElementById('volume-slider');

document.getElementById('message').innerText = window.customMessage;
document.getElementById('signature').innerText = window.customSignature;

document.querySelector('.click-area').addEventListener('click', ()=>{
    intro.classList.remove('active');

    setTimeout(() => {
        if (music) {
            music.volume = 0.2; 
            music.play().then(() => {
                updateButtonStates(); // Pokreće plesanje note odmah na startu
            }).catch(error => console.log("Audio play blocked:", error));
        }
    }, 2500);

    setTimeout(()=>{
        opened.classList.add('active');
    },1000);
});

// Paljenje i gašenje .playing klase za plesanje note
function updateButtonStates() {
    if (music.paused) {
        if (playerPlay) playerPlay.innerText = '▶';
        if (musicToggle) {
            musicToggle.classList.add('muted');
            musicToggle.classList.remove('playing'); // Nota prestaje da pleše
            musicToggle.innerText = '🔇';
        }
    } else {
        if (playerPlay) playerPlay.innerText = '⏸';
        if (musicToggle) {
            musicToggle.classList.remove('muted');
            musicToggle.classList.add('playing'); // Nota počinje da pleše
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

// Kontrola jačine zvuka pomeranjem klizača i prateći promenu
if (volumeSlider && music) {
    volumeSlider.addEventListener('input', (e) => {
        music.volume = e.target.value;
    });

    // Ako se zvuk promeni negde drugde, pomera se i klizač
    music.addEventListener('volumechange', () => {
        if (music.volume !== parseFloat(volumeSlider.value)) {
            volumeSlider.value = music.volume;
        }
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
    { time: 49.50, text: "" }, 
    { time: 69.54, text: "Я знаю, ты не хочешь всё поскорей" },
    { time: 72.13, text: "Главное, чтоб вовремя, но всегда" },
    { time: 74.68, text: "Я тебя прошу, больше не болей" },
    { time: 77.21, text: "Остальное всё мы разрулим, да" },
    { time: 79.27, text: "Карты лягут так, как ты кинешь ich" },
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
            
            if (activeLyric === "") {
                lyricsContainer.style.display = "none";
            } else {
                lyricsContainer.style.display = "block";
            }
        }
    });
}

const glavnaSlika = document.getElementById('glavna-slika');

if (glavnaSlika) {
    console.log("Glavna slika je uspešno pronađena u HTML-u!");
    
    glavnaSlika.addEventListener('click', (e) => {
        // Test prozorčić koji mora da iskoči
        alert("Kliknuo si na sliku! JS radi, tražimo problem dalje...");

        for (let i = 0; i < 15; i++) {
            stvoriSrce(e.clientX, e.clientY);
        }
    });
} else {
    console.log("GREŠKA: JS uopšte ne može da nađe element sa id='glavna-slika'!");
}

function stvoriSrce(x, y) {
    const srce = document.createElement('div');
    srce.classList.add('klik-srce');
    srce.innerText = '❤️'; 
    
    srce.style.left = x + 'px';
    srce.style.top = y + 'px';
    
    const velicina = Math.random() * 20 + 15; 
    srce.style.fontSize = velicina + 'px';
    
    const pomerajX = (Math.random() - 0.5) * 300; 
    const pomerajY = -(Math.random() * 250 + 100); 
    
    srce.style.setProperty('--x', pomerajX + 'px');
    srce.style.setProperty('--y', pomerajY + 'px');
    
    document.body.appendChild(srce);
    
    setTimeout(() => {
        srce.remove();
    }, 1200);
}
