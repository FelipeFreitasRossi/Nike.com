(function() {
    'use strict';

    // ============================================
    // PRELOADER (0.8s)
    // ============================================
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

    // ============================================
    // ANIMAÇÕES GSAP
    // ============================================
    function animateWelcome() {
        if (typeof gsap === 'undefined') return;
        
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Logo
        tl.from('.welcome-logo', {
            opacity: 0,
            y: -30,
            duration: 0.8
        })
        // Título
        .from('.welcome-title', {
            opacity: 0,
            y: 40,
            duration: 0.9
        }, '-=0.4')
        // Subtítulo
        .from('.welcome-subtitle', {
            opacity: 0,
            y: 20,
            duration: 0.6
        }, '-=0.3')
        // Mensagem
        .from('.welcome-message p', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.15
        }, '-=0.3')
        // Botão
        .from('.btn-enter', {
            opacity: 0,
            scale: 0.8,
            duration: 0.7,
            ease: 'back.out(2.5)'
        }, '-=0.2')
        // Scroll indicator
        .from('.scroll-indicator', {
            opacity: 0,
            y: 10,
            duration: 0.5
        }, '-=0.1');

        // Animação do header (entrada)
        gsap.from('.welcome-header', {
            opacity: 0,
            y: -20,
            duration: 0.6,
            delay: 0.2
        });

        // Animação do footer
        gsap.from('.welcome-footer', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: 0.4
        });
    }

    // ============================================
    // INICIAR
    // ============================================
    setTimeout(() => {
        hidePreloader();
    }, 800);

    // Fallback
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            hidePreloader();
        }
    }, 1500);

    console.log('✅ UrbanShop B&W - Boas-vindas carregada!');

})();