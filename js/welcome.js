(function() {
    'use strict';

    const preloader = document.getElementById('preloader');

    function hidePreloader() {
        if (typeof gsap !== 'undefined') {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.4,
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
          .from('.btn-welcome', { opacity: 0, scale: 0.9, duration: 0.6, ease: 'back.out(2)' }, '-=0.2')
          .from('.scroll-indicator', { opacity: 0, y: 10, duration: 0.5 }, '-=0.2');
    }

    // Preloader com duração de 0.8 segundos
    setTimeout(() => {
        hidePreloader();
    }, 800);

    // Fallback
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            hidePreloader();
        }
    }, 1500);

    console.log('✅ UrbanShop - Boas-vindas carregada!');

})();