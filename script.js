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
        fixMobileLandscape();
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

/* ==========================================
   11. MOBILE LANDSCAPE RESPONSIVE FIX
   ========================================== */
function fixMobileLandscape() {
    const letter = document.querySelector('.letter');
    if (!letter) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width > height && width <= 980) {
        const safeScale = height / 740;
        letter.style.transform = `translate(-50%, -50%) scale(${Math.min(safeScale, 0.55)})`;
        letter.style.transformOrigin = 'center center';
        document.body.style.overflow = 'auto';
    } else {
        letter.style.transform = 'translate(-50%, -50%) scale(1)';
        document.body.style.overflow = 'hidden';
    }
}

window.addEventListener('load', fixMobileLandscape);
window.addEventListener('resize', fixMobileLandscape);

const layoutObserver = new ResizeObserver(() => {
    fixMobileLandscape();
});
if (opened) {
    layoutObserver.observe(opened);
}
