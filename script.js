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
        // Force evaluation right when page 2 opens
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
   10. MOBILE LANDSCAPE RESPONSIVE FIX
   ========================================== */
function fixMobileLandscape() {
    const letter = document.querySelector('.letter');
    if (!letter) return;

    // 10.1 Check actual viewport bounds to catch landscape orientation
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width > height && width <= 980) {
        // 10.2 Strict mathematical calculation based on active phone height
        // Adjusted divisor to 680 to force smaller size and save background view
        const safeScale = height / 680;
        letter.style.transform = `translate(-50%, -50%) scale(${Math.min(safeScale, 0.70)})`;
        letter.style.transformOrigin = 'center center';
    } else {
        // 10.3 Maintain flawless center design on desktop and portrait models
        letter.style.transform = 'translate(-50%, -50%) scale(1)';
    }
}

// 10.4 Safe global layout tracking setup
window.addEventListener('load', fixMobileLandscape);
window.addEventListener('resize', fixMobileLandscape);

// 10.5 High-utility observer to track lazy rendering bugs
const layoutObserver = new ResizeObserver(() => {
    fixMobileLandscape();
});
if (opened) {
    layoutObserver.observe(opened);
}
