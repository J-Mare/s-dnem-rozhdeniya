// ==========================================
// MOBILE FIXED VERSION
// ==========================================

const intro = document.getElementById('intro');
const opened = document.getElementById('opened');
const music = document.getElementById('bg-music');
const glavnaSlika = document.getElementById('glavna-slika');

// PRELAZ
document.querySelector('.click-area').addEventListener('click', () => {

    intro.classList.remove('active');

    setTimeout(() => {

        if (music) {

            music.volume = 0.2;
            music.playsInline = true;

            music.play().catch(err => {
                console.log('Audio blocked:', err);
            });
        }

    }, 2500);

    setTimeout(() => {
        opened.classList.add('active');
    }, 1000);
});

// SRCA
if (glavnaSlika) {

    glavnaSlika.addEventListener('pointerdown', (e) => {

        const isMobile = window.innerWidth < 768;
        const heartCount = isMobile ? 8 : 15;

        for (let i = 0; i < heartCount; i++) {
            stvoriSrce(e.clientX, e.clientY);
        }
    });
}

function stvoriSrce(x, y) {

    const srce = document.createElement('div');

    srce.classList.add('klik-srce');

    srce.innerText = '❤️';

    srce.style.left = x + 'px';
    srce.style.top = y + 'px';

    document.body.appendChild(srce);

    setTimeout(() => {
        srce.remove();
    }, 1200);
}
