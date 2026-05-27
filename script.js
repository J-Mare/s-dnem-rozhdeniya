// MOBILE FIXES

// Pointer support
glavnaSlika.addEventListener('pointerdown', (e) => {

    const isMobile = window.innerWidth < 768;
    const heartCount = isMobile ? 8 : 15;

    for (let i = 0; i < heartCount; i++) {
        stvoriSrce(e.clientX, e.clientY);
    }
});

// Progress fix
if (music.duration) {
    const pct = (music.currentTime / music.duration) * 100;
    progressBar.style.width = pct + '%';
}

// iPhone autoplay fix
music.volume = 0.2;
music.playsInline = true;

music.play();
