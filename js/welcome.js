(function() {
    'use strict';

    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    const ringFill = document.getElementById('ringFill');
    const RING_CIRCUMFERENCE = 377;

    let progress = 0;

    function updateProgress(value) {
        progress = Math.min(value, 100);
        if (progressBar) progressBar.style.width = progress + '%';
        if (progressPercent) progressPercent.textContent = Math.floor(progress) + '%';
        if (ringFill) {
            const offset = RING_CIRCUMFERENCE - (progress / 100) * RING_CIRCUMFERENCE;
            ringFill.style.strokeDashoffset = offset;
        }
    }

    function simulateProgress() {
        return new Promise((resolve) => {
            let current = 0;
            const step = () => {
                const increment = Math.random() * 8 + 2;
                current = Math.min(current + increment, 90);
                updateProgress(current);
                if (current < 90) {
                    setTimeout(step, 150 + Math.random() * 200);
                } else {
                    resolve();
                }
            };
            step();
        });
    }

    function hidePreloader() {
        updateProgress(100);
        if (typeof gsap !== 'undefined') {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                onComplete: () => {
                    preloader.classList.add('hidden');
                    document.body.style.overflow = '';
                    animateWelcome();
                }
            });
        } else {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            animateWelcome();
        }
    }

    function animateWelcome() {
        if (typeof gsap === 'undefined') return;
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.welcome-logo', { opacity: 0, y: -30, duration: 0.8 })
          .from('.welcome-title', { opacity: 0, y: 30, duration: 0.8 }, '-=0.4')
          .from('.welcome-subtitle', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
          .from('.welcome-message p', { opacity: 0, y: 20, duration: 0.6, stagger: 0.15 }, '-=0.3')
          .from('.btn-enter', { opacity: 0, scale: 0.9, duration: 0.6, ease: 'back.out(2)' }, '-=0.2')
          .from('.welcome-scroll-cue', { opacity: 0, y: 10, duration: 0.6 }, '-=0.2')
          .from('.welcome-footer', { opacity: 0, y: 10, duration: 0.5 }, '-=0.3');

        const bg = document.querySelector('.welcome-bg-img');
        if (bg) {
            gsap.to(bg, { scale: 1.08, duration: 22, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        }

        // Paralaxe suave dos orbs conforme o mouse se move
        const orb1 = document.querySelector('.welcome-orb-1');
        const orb2 = document.querySelector('.welcome-orb-2');
        if (orb1 && orb2 && window.matchMedia('(min-width: 821px)').matches) {
            window.addEventListener('mousemove', (e) => {
                const xRatio = (e.clientX / window.innerWidth) - 0.5;
                const yRatio = (e.clientY / window.innerHeight) - 0.5;
                gsap.to(orb1, { x: xRatio * 40, y: yRatio * 40, duration: 1.2, ease: 'power2.out' });
                gsap.to(orb2, { x: xRatio * -50, y: yRatio * -50, duration: 1.2, ease: 'power2.out' });
            });
        }

        // Botão "Visitar Site" com transição suave para o dashboard
        const enterBtn = document.querySelector('.btn-enter');
        if (enterBtn) {
            enterBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('href');
                gsap.to('.welcome-wrapper', {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.inOut',
                    onComplete: () => { window.location.href = target; }
                });
            });
        }
    }

    async function startPreloader() {
        await simulateProgress();
        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
        }
    }

    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) hidePreloader();
    }, 5000);

    startPreloader();

    // Header scroll (caso exista em outras páginas)
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.pageYOffset > 20);
        });
    }

    // Menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMobile.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (header && !header.contains(e.target)) navMobile.classList.remove('open');
        });
    }

    console.log('✅ Boas-vindas carregada!');
})();
