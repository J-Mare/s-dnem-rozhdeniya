// ==========================================
// 1. SELEKTORI
// ==========================================
const intro             = document.getElementById('intro');
const opened            = document.getElementById('opened');
const music             = document.getElementById('bg-music');
const musicToggle       = document.getElementById('music-toggle');
const playerPlay        = document.getElementById('player-play');
const progressBar       = document.getElementById('progress-bar');
const progressContainer = document.querySelector('.progress-container');
const volumeSlider      = document.getElementById('volume-slider');
const lyricsContainer   = document.getElementById('tekst-pesme');
const glavnaSlika       = document.getElementById('glavna-slika');

// ==========================================
// 2. MOBILE SCALE FIX
//
// Kartica (.letter) je 660px siroka.
// Ukupna visina sa plejerom i karaoke ≈ 610px.
// JS meri ekran, racuna scale koji staje u oba smera,
// i postavlja ga direktno kao inline transform.
// CSS animacija (show) ne dira transform — samo opacity.
// ==========================================
function setScale() {
    const letter = document.querySelector('.letter');
    if (!letter) return;

    // visualViewport daje tacno vidljivi deo ekrana — bez URL bara, bez nav bara
    const vw = window.visualViewport ? window.visualViewport.width  : window.innerWidth;
    const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;

    // Desktop — ne diramo, CSS media query handles it
    if (vw > 950) {
        letter.style.removeProperty('transform');
        letter.style.removeProperty('top');
        letter.style.removeProperty('left');
        return;
    }

    // Dimenzije kartice sa padinjem 5% sa svake strane
    const CARD_W = 660;
    const CARD_H = 610; // paper ~480 + player 65 + karaoke 40 + margine

    const scaleW = (vw * 0.92) / CARD_W;
    const scaleH = (vh * 0.92) / CARD_H;
    const scale  = Math.min(scaleW, scaleH, 1);

    letter.style.position  = 'fixed';
    letter.style.top       = '50%';
    letter.style.left      = '50%';
    letter.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`;
}

setScale();
// visualViewport.resize je tacan event — okida se samo kad se stvarno menja
// vidljivi prostor (orijentacija, keyboard), ne pri scroll/URL bar hide
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setScale);
} else {
    window.addEventListener('orientationchange', () => setTimeout(setScale, 300));
}

// ==========================================
// 3. PISANJE PORUKE I POTPIDA (typewriter)
// ==========================================
const messageEl   = document.getElementById('message');
const signatureEl = document.getElementById('signature');
const fullMessage   = window.customMessage   || '';
const fullSignature = window.customSignature || '';

let typeTimer = null;

function clearTypeTimer() {
    if (typeTimer) clearTimeout(typeTimer);
    typeTimer = null;
}

function typeText(element, text, charDelay, onDone) {
    if (!element) {
        if (onDone) onDone();
        return;
    }
    clearTypeTimer();
    element.innerText = '';

    let i = 0;
    function step() {
        if (i >= text.length) {
            if (onDone) onDone();
            return;
        }
        const ch = text[i++];
        element.innerText += ch;

        let delay = charDelay;
        if (ch === '\n') delay = charDelay * 5;
        else if ('.!?❤️'.includes(ch)) delay = charDelay * 3.5;
        else if (',;:—'.includes(ch)) delay = charDelay * 2;

        typeTimer = setTimeout(step, delay);
    }
    step();
}

function lockLetterLayout() {
    const paper = document.querySelector('.paper');
    if (!paper || !messageEl) return;

    let sigH = 28;
    if (signatureEl) {
        signatureEl.innerText = fullSignature;
        sigH = signatureEl.offsetHeight;
    }

    messageEl.innerText = fullMessage;
    messageEl.classList.add('typing-done');

    paper.style.minHeight = paper.offsetHeight + 'px';
    messageEl.style.minHeight = messageEl.offsetHeight + 'px';

    messageEl.innerText = '';
    messageEl.classList.remove('typing-done');
    if (signatureEl) {
        signatureEl.innerText = '';
        signatureEl.style.minHeight = sigH + 'px';
    }
}

function startLetterTyping() {
    if (!messageEl) return;
    lockLetterLayout();
    setScale();
    messageEl.innerText = '';
    messageEl.classList.remove('typing-done');
    if (signatureEl) signatureEl.innerText = '';

    // Poruka, pa potpis na polaroidu
    typeText(messageEl, fullMessage, 70, () => {
        messageEl.classList.add('typing-done');
        setTimeout(() => {
            typeText(signatureEl, fullSignature, 95, null);
        }, 450);
    });
}

if (messageEl) messageEl.innerText = '';
if (signatureEl) signatureEl.innerText = '';

// ==========================================
// 3b. LATICE RUZA (blago, ne dira klik)
// ==========================================
function spawnPetal(layer) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = (Math.random() * 100) + '%';
    petal.style.setProperty('--dur', (7 + Math.random() * 7) + 's');
    petal.style.setProperty('--delay', (Math.random() * 4) + 's');
    petal.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
    petal.style.setProperty('--rot', (Math.random() * 360) + 'deg');
    layer.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove());
}

function initPetals() {
    let layer = document.getElementById('petals-layer');
    if (!layer) {
        layer = document.createElement('div');
        layer.id = 'petals-layer';
        layer.className = 'petals-layer';
        layer.setAttribute('aria-hidden', 'true');
        document.body.appendChild(layer);
    }
    if (layer.dataset.ready) return;
    layer.dataset.ready = '1';

    for (let i = 0; i < 14; i++) spawnPetal(layer);
    setInterval(() => {
        if (layer.childElementCount < 20) spawnPetal(layer);
    }, 1600);
}

initPetals();

// ==========================================
// 4. PRELAZ SA STRANE 1 NA STRANU 2
// ==========================================
let introOpened = false;

document.querySelector('.click-area').addEventListener('click', () => {
    if (introOpened) return;
    introOpened = true;

    // Zakljucava dimenzije papira ODMAH dok je #opened jos nevidljiv.
    // Bez ovoga, papir bi bio skupljen (prazan tekst) prvih ~500ms
    // dok ne krene typewriter — korisnik bi video kako se karta rasiri.
    lockLetterLayout();
    setScale();

    intro.classList.remove('active');

    setTimeout(() => {
        if (music) {
            music.volume = 0.2;
            music.play()
                .then(() => updateButtonStates())
                .catch(err => console.log('Audio play blocked:', err));
        }
    }, 2500);

    setTimeout(() => {
        opened.classList.add('active');
        const letter = document.querySelector('.letter');
        if (letter) letter.classList.add('visible');
        setTimeout(startLetterTyping, 1500);
    }, 1000);
});

// ==========================================
// 5. STANJA DUGMADI ZA MUZIKU
// ==========================================
function updateButtonStates() {
    if (!music) return;
    if (music.paused) {
        if (playerPlay)  playerPlay.innerText = '▶';
        if (musicToggle) {
            musicToggle.innerText = '🔇';
            musicToggle.classList.add('muted');
            musicToggle.classList.remove('playing');
        }
    } else {
        if (playerPlay)  playerPlay.innerText = '⏸';
        if (musicToggle) {
            musicToggle.innerText = '🎵';
            musicToggle.classList.remove('muted');
            musicToggle.classList.add('playing');
        }
    }
}

// ==========================================
// 6. KONTROLE MUZIKE
// ==========================================
if (musicToggle && music) {
    musicToggle.addEventListener('click', () => {
        music.paused ? music.play() : music.pause();
        updateButtonStates();
    });
}

if (playerPlay && music) {
    playerPlay.addEventListener('click', () => {
        music.paused ? music.play() : music.pause();
        updateButtonStates();
    });
}

if (progressContainer && music) {
    progressContainer.addEventListener('click', (e) => {
        if (music.duration) {
            music.currentTime = (e.offsetX / progressContainer.clientWidth) * music.duration;
        }
    });
}

if (volumeSlider && music) {
    volumeSlider.addEventListener('input', (e) => {
        music.volume = e.target.value;
    });
    music.addEventListener('volumechange', () => {
        if (music.volume !== parseFloat(volumeSlider.value)) {
            volumeSlider.value = music.volume;
        }
    });
}

// ==========================================
// 7. KARAOKE — TEKST PESME
// ==========================================
const lyricsData = [
    { time: 0.17,   text: "Happy Birthday!" },
    { time: 5.59,   text: "Happy Birthday to you!" },
    { time: 10.84,  text: "Ты погасила свечи на тортике" },
    { time: 13.51,  text: "Вспомнила, как было не хорошо" },
    { time: 16.11,  text: "Как сидела грустно на бортике" },
    { time: 18.45,  text: "Обнимаясь год со своей душой" },
    { time: 20.81,  text: "Знаешь, я уверена, что не зря" },
    { time: 22.93,  text: "Время пролетало по дресс-коду" },
    { time: 25.45,  text: "Теперь с тобой такие друзья" },
    { time: 27.46,  text: "Что ты можешь в огонь и в воду" },
    { time: 29.28,  text: "Hey, Happy Birthday, girl" },
    { time: 31.19,  text: "Я желаю тебе жизнь из любимого фильма" },
    { time: 34.16,  text: "Happy Birthday, girl" },
    { time: 36.23,  text: "Я желаю тебе петь, танцевать и гулять" },
    { time: 38.80,  text: "Hey, Happy Birthday, girl" },
    { time: 41.27,  text: "И пускай те, кто нужен, горят тобой сильно" },
    { time: 44.09,  text: "Happy Birthday, girl" },
    { time: 46.16,  text: "Не разреши себя потерять" },
    { time: 49.50,  text: "" },
    { time: 69.54,  text: "Я знаю, ты не хочешь всё поскорей" },
    { time: 72.13,  text: "Главное, чтоб вовремя, но всегда" },
    { time: 74.68,  text: "Я тебя прошу, больше не болей" },
    { time: 77.21,  text: "Остальное всё мы разрулим, да" },
    { time: 79.27,  text: "Карты лягут так, как ты кинешь их" },
    { time: 81.59,  text: "А ты кинула их джокером на крыши" },
    { time: 84.56,  text: "И голоса из прошлого стихли" },
    { time: 86.50,  text: "Ведь больше ты их не слышишь" },
    { time: 87.59,  text: "Hey, Happy Birthday, girl" },
    { time: 90.41,  text: "Я желаю тебе жизнь из любимого фильма" },
    { time: 93.21,  text: "Happy Birthday, girl" },
    { time: 95.36,  text: "Я желаю тебе петь, танцевать и гулять" },
    { time: 97.92,  text: "Hey, Happy Birthday, girl" },
    { time: 100.10, text: "И пускай те, кто нужен, горят тобой сильно" },
    { time: 102.66, text: "Happy Birthday, girl" },
    { time: 105.11, text: "Не разреши себя потерять" },
    { time: 107.65, text: "Happy birthday" },
    { time: 112.59, text: "Happy birthday" },
    { time: 122.63, text: "Happy birthday 🎵" }
];

function setLyric(text) {
    if (!lyricsContainer || lyricsContainer.innerText === text) return;
    lyricsContainer.classList.add('is-updating');
    lyricsContainer.innerText = text;
    lyricsContainer.style.display = text === "" ? "none" : "block";
    requestAnimationFrame(() => lyricsContainer.classList.remove('is-updating'));
}

if (music) {
    music.addEventListener('timeupdate', () => {
        if (progressBar && music.duration && isFinite(music.duration)) {
            progressBar.style.width = (music.currentTime / music.duration) * 100 + '%';
        }
        if (lyricsContainer) {
            const t = music.currentTime;
            let activeLyric = "";
            for (let i = 0; i < lyricsData.length; i++) {
                if (t >= lyricsData[i].time) activeLyric = lyricsData[i].text;
            }
            setLyric(activeLyric);
        }
    });
}

// ==========================================
// 8. VATROMET OD SRCA — KLIK NA GLAVNU SLIKU
// ==========================================
if (glavnaSlika) {
    glavnaSlika.addEventListener('click', (e) => {
        for (let i = 0; i < 15; i++) stvoriSrce(e.clientX, e.clientY);
    });
}

function stvoriSrce(x, y) {
    const srce = document.createElement('div');
    srce.classList.add('klik-srce');
    srce.innerText = '❤️';
    srce.style.left     = x + 'px';
    srce.style.top      = y + 'px';
    srce.style.fontSize = (Math.random() * 20 + 15) + 'px';
    srce.style.setProperty('--x', ((Math.random() - 0.5) * 300) + 'px');
    srce.style.setProperty('--y', (-(Math.random() * 250 + 100)) + 'px');
    document.body.appendChild(srce);
    setTimeout(() => srce.remove(), 1200);
}
