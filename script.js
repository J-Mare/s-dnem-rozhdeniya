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
   11. MOBILE LANDSCAPE RESPONSIVE FIX
   ========================================== */
function fixMobileLandscape() {
    const letter = document.querySelector('.letter');
    const openedPage = document.getElementById('opened');
    if (!letter) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width > height && width <= 980) {
        // 11.1 Dynamically scale based on height
        const safeScale = height / 740;
        letter.style.transform = `translate(-50%, -50%) scale(${Math.min(safeScale, 0.55)})`;
        letter.style.transformOrigin = 'center center';

        // 11.2 Force enable scrolling and pinch-zooming for landscape mobile views
        document.body.style.overflow = 'auto';
        
        // 11.3 Reset background to cover on mobile to fix the squish/stretch bug
        if (openedPage) {
            openedPage.style.backgroundSize = 'cover';
        }
    } else if (width <= 980) {
        // 11.4 If mobile is portrait (vertical), also force cover to prevent stretching
        if (openedPage) {
            openedPage.style.backgroundSize = 'cover';
        }
        document.body.style.overflow = 'hidden';
    } else {
        // 11.5 Maintain standard dimensions for desktop views
        letter.style.transform = 'translate(-50%, -50%) scale(1)';
        document.body.style.overflow = 'hidden';
        
        // 11.6 Return to perfect 100vw 100vh desktop layout with maximum depth
        if (openedPage) {
            openedPage.style.backgroundSize = '100vw 100vh';
        }
    }
}

// 11.7 Safe global layout tracking setup
window.addEventListener('load', fixMobileLandscape);
window.addEventListener('resize', fixMobileLandscape);

// 11.8 Observer to enforce scaling instantly on page change
const layoutObserver = new ResizeObserver(() => {
    fixMobileLandscape();
});
if (opened) {
    layoutObserver.observe(opened);
}
