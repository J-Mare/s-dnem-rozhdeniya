const intro = document.getElementById('intro');
const opened = document.getElementById('opened');
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

/* Player elements */
const playerPlay = document.getElementById('player-play');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.querySelector('.progress-container');
const letterContainer = document.querySelector('.letter');

document.getElementById('message').innerText = window.customMessage;
document.getElementById('signature').innerText = window.customSignature;

/* Fixed dynamic scaling function - prevents top-left alignment error */
function autoScaleScreen() {
    if (!letterContainer) return;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    /* Auto calculates scaling based on active resolution */
    if (windowWidth < 900 || windowHeight < 600) {
        const widthScale = windowWidth / 740; 
        const heightScale = windowHeight / 560; 
        const perfectScale = Math.min(widthScale, heightScale, 0.85); 
        
        /* Fixed: translate(-50%, -50%) MUST stay here to keep it perfectly centered */
        letterContainer.style.transform = `translate(-50%, -50%) scale(${perfectScale})`;
    } else {
        letterContainer.style.transform = `translate(-50%, -50%) scale(1)`;
    }
}

window.addEventListener('resize', autoScaleScreen);
window.addEventListener('load', autoScaleScreen);
autoScaleScreen();

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
        autoScaleScreen(); 
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
