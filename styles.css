// ==========================================
// 1. SELEKTORI
// ==========================================
const intro              = document.getElementById('intro');
const opened             = document.getElementById('opened');
const music              = document.getElementById('bg-music');
const musicToggle        = document.getElementById('music-toggle');
const playerPlay         = document.getElementById('player-play');
const progressBar        = document.getElementById('progress-bar');
const progressContainer  = document.querySelector('.progress-container');
const volumeSlider       = document.getElementById('volume-slider');
const lyricsContainer    = document.getElementById('tekst-pesme');
const glavnaSlika        = document.getElementById('glavna-slika');

// ==========================================
// 2. PUNJENJE TEKSTA IZ message.js
// ==========================================
document.getElementById('message').innerText   = window.customMessage;
document.getElementById('signature').innerText = window.customSignature;

// ==========================================
// 3. PRELAZ SA STRANE 1 NA STRANU 2
// ==========================================
document.querySelector('.click-area').addEventListener('click', () => {
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
    }, 1000);
});

// ==========================================
// 4. STANJA DUGMADI ZA MUZIKU
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
// 5. KONTROLE MUZIKE
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

if (music && progressBar) {
    music.addEventListener('timeupdate', () => {
        const pct = (music.currentTime / music.duration) * 100;
        progressBar.style.width = pct + '%';
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
// 6. KARAOKE — TEKST PESME
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

if (music && lyricsContainer) {
    music.addEventListener('timeupdate', () => {
        const t = music.currentTime;
        let activeLyric = "";

        for (let i = 0; i < lyricsData.length; i++) {
            if (t >= lyricsData[i].time) activeLyric = lyricsData[i].text;
        }

        if (lyricsContainer.innerText !== activeLyric) {
            lyricsContainer.innerText = activeLyric;
            lyricsContainer.style.display = activeLyric === "" ? "none" : "block";
        }
    });
}

// ==========================================
// 7. VATROMET OD SRCA — KLIK NA GLAVNU SLIKU
// ==========================================
if (glavnaSlika) {
    glavnaSlika.addEventListener('click', (e) => {
        for (let i = 0; i < 15; i++) {
            stvoriSrce(e.clientX, e.clientY);
        }
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

// ==========================================
// 8. ZOOM — MALI POLAROIDI
// ==========================================
(function () {

    const overlay       = document.getElementById('zoomOverlay');
    const maliPolaroidi = document.querySelectorAll('.mali-polaroid');

    // Koji polaroid je trenutno uvecan i njegovi originalni stilovi
    let trenutnoUvecan  = null;
    let originalniRect  = null;   // getBoundingClientRect() pre zoom-a
    let originalniInline = null;  // inline stilovi pre zoom-a
    let zakacen         = false;  // true = klik ga je zakacio (ne vraca se na mouseleave)
    let hoverTimeout    = null;

    // ---- Uvelicaj ----
    function uvelicaj(polaroid) {
        if (trenutnoUvecan === polaroid) return;

        // Ako je vec neko drugi uvecan, vrati ga tiho
        if (trenutnoUvecan) {
            vratiTiho(trenutnoUvecan);
        }

        // Zapamti gde je polaroid BIO (fixed koordinate)
        originalniRect = polaroid.getBoundingClientRect();

        // Zapamti originalne inline stilove da ih mozemo potpuno obnoviti
        originalniInline = {
            position:   polaroid.style.position,
            top:        polaroid.style.top,
            left:       polaroid.style.left,
            width:      polaroid.style.width,
            height:     polaroid.style.height,
            zIndex:     polaroid.style.zIndex,
            transform:  polaroid.style.transform,
            transition: polaroid.style.transition,
        };

        // Korak 1: Privremeno postavi fixed na TACNU trenutnu poziciju
        //          i iskljuci tranziciju — browser vidi "isti" element
        polaroid.style.transition = 'none';
        polaroid.style.position   = 'fixed';
        polaroid.style.top        = originalniRect.top  + 'px';
        polaroid.style.left       = originalniRect.left + 'px';
        polaroid.style.width      = originalniRect.width + 'px';
        polaroid.style.height     = originalniRect.height + 'px';
        polaroid.style.transform  = 'rotate(0deg)';
        polaroid.style.zIndex     = '999';

        // Korak 2: Forsiramo reflow — browser "vidi" pocetnu poziciju
        polaroid.getBoundingClientRect();

        // Korak 3: Dodajemo klasu — CSS tranzicija animira put do centra
        requestAnimationFrame(() => {
            polaroid.classList.add('uvecan');
            overlay.classList.add('aktivni');
            trenutnoUvecan = polaroid;
        });
    }

    // ---- Vrati na mesto (sa animacijom) ----
    function vrati(polaroid) {
        if (!polaroid) return;

        polaroid.classList.remove('uvecan');
        overlay.classList.remove('aktivni');
        polaroid.style.cursor = 'zoom-in';

        // Cekamo da CSS tranzicija zavrsi (45ms rezerva)
        setTimeout(() => {
            if (!polaroid.classList.contains('uvecan')) {
                obnovi(polaroid);
            }
        }, 500);

        trenutnoUvecan = null;
        zakacen        = false;
    }

    // ---- Vrati tiho (bez animacije overlay-a, za zamenu) ----
    function vratiTiho(polaroid) {
        polaroid.classList.remove('uvecan');
        polaroid.classList.remove('kliknuto');
        setTimeout(() => {
            if (!polaroid.classList.contains('uvecan')) {
                obnovi(polaroid);
            }
        }, 500);
    }

    // ---- Obnovi originalne inline stilove ----
    function obnovi(polaroid) {
        if (!originalniInline) return;
        polaroid.style.position   = originalniInline.position;
        polaroid.style.top        = originalniInline.top;
        polaroid.style.left       = originalniInline.left;
        polaroid.style.width      = originalniInline.width;
        polaroid.style.height     = originalniInline.height;
        polaroid.style.zIndex     = originalniInline.zIndex;
        polaroid.style.transform  = originalniInline.transform;
        polaroid.style.transition = originalniInline.transition;
        originalniInline          = null;
    }

    // ---- Event listeneri na svaki mali polaroid ----
    maliPolaroidi.forEach(polaroid => {

        // HOVER IN: uvelicaj posle kratkog delaya
        polaroid.addEventListener('mouseenter', function () {
            // Ako je nesto zakaceno klikom, ignorisi hover
            if (zakacen) return;

            hoverTimeout = setTimeout(() => {
                uvelicaj(this);
            }, 120);
        });

        // HOVER OUT: vrati ako nije zakacen klikom
        polaroid.addEventListener('mouseleave', function () {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;

            if (zakacen) return;

            if (trenutnoUvecan === this) {
                vrati(this);
            }
        });

        // KLIK: zakaci/otkaci
        polaroid.addEventListener('click', function (e) {
            e.stopPropagation();

            if (zakacen && trenutnoUvecan === this) {
                // Vec zakacen — otkaci i vrati
                zakacen = false;
                vrati(this);
            } else if (trenutnoUvecan === this) {
                // Uvecan hover-om — zakaci
                zakacen = true;
            } else {
                // Nije uvecan — uvelicaj i zakaci
                uvelicaj(this);
                // Malo cekamo da uvelicaj zavrsi pre zakacivanja
                setTimeout(() => { zakacen = true; }, 50);
            }
        });

    });

    // ---- Klik na overlay — vrati ----
    overlay.addEventListener('click', () => {
        if (trenutnoUvecan) {
            zakacen = false;
            vrati(trenutnoUvecan);
        }
    });

    // ---- ESC taster — vrati ----
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && trenutnoUvecan) {
            zakacen = false;
            vrati(trenutnoUvecan);
        }
    });

})();
