(function() {
    'use strict';

    // ============================================
    // REGISTRAR SCROLLTRIGGER
    // ============================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // MENU MOBILE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');

    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMobile.classList.toggle('open');
        });

        navMobile.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navMobile.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            if (header && !header.contains(e.target)) {
                navMobile.classList.remove('open');
            }
        });
    }

    // ============================================
    // ANIMAÇÕES GSAP - HERO
    // ============================================
    if (typeof gsap !== 'undefined') {
        // Hero - entrada
        gsap.from('.hero-text .tag', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });

        gsap.from('.hero-text h1', {
            opacity: 0,
            y: 40,
            duration: 1,
            delay: 0.4,
            ease: 'power3.out'
        });

        gsap.from('.hero-text p', {
            opacity: 0,
            y: 30,
            duration: 0.9,
            delay: 0.6,
            ease: 'power3.out'
        });

        gsap.from('.hero-buttons .btn', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });

        gsap.from('.hero-image', {
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            delay: 0.3,
            ease: 'power3.out'
        });

        // ============================================
        // ANIMAÇÕES GSAP - PRODUTOS (ScrollTrigger)
        // ============================================
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 60,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                delay: i * 0.1
            });
        });

        // ============================================
        // ANIMAÇÕES GSAP - CARROSSEL
        // ============================================
        const track = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (track && prevBtn && nextBtn) {
            const slidesData = [
                { name: 'Air Max Pulse', price: 'R$ 999', color: '#f5e6d3' },
                { name: 'Dunk Low Retro', price: 'R$ 849', color: '#cfe1f0' },
                { name: 'Vaporfly 3', price: 'R$ 1.499', color: '#f0e6d8' },
                { name: 'Air Zoom Tempo', price: 'R$ 1.199', color: '#e0d5c0' },
                { name: 'Court Vision', price: 'R$ 599', color: '#d4c9b8' },
                { name: 'Air Max 90', price: 'R$ 729', color: '#d4e0e8' }
            ];

            let currentIndex = 0;
            let slidesPerView = 3;

            function renderSlides() {
                track.innerHTML = '';
                slidesData.forEach((item) => {
                    const slide = document.createElement('div');
                    slide.className = 'carousel-slide';
                    slide.innerHTML = `
                        <svg viewBox="0 0 120 80" fill="none">
                            <rect x="10" y="10" width="100" height="60" rx="10" fill="${item.color}" />
                            <circle cx="60" cy="40" r="22" fill="#333" />
                            <path d="M45 40 L70 28 L80 38 L60 52 L45 40Z" fill="#fff" />
                        </svg>
                        <h4>${item.name}</h4>
                        <span class="price">${item.price}</span>
                    `;
                    track.appendChild(slide);
                });
            }
            renderSlides();

            function updateSlidesPerView() {
                const width = window.innerWidth;
                if (width < 520) slidesPerView = 1;
                else if (width < 820) slidesPerView = 2;
                else slidesPerView = 3;
            }

            function getSlideWidth() {
                const gap = 24;
                const totalWidth = track.parentElement.clientWidth - 48;
                return (totalWidth - (slidesPerView - 1) * gap) / slidesPerView;
            }

            function moveCarousel(instant = false) {
                const slideWidth = getSlideWidth();
                const maxIndex = Math.max(0, slidesData.length - slidesPerView);
                if (currentIndex > maxIndex) currentIndex = maxIndex;
                const offset = currentIndex * (slideWidth + 24);

                if (instant) {
                    gsap.set(track, { x: -offset });
                } else {
                    gsap.to(track, {
                        x: -offset,
                        duration: 0.6,
                        ease: 'power3.inOut'
                    });
                }
            }

            function nextSlide() {
                const maxIndex = Math.max(0, slidesData.length - slidesPerView);
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                moveCarousel();
            }

            function prevSlide() {
                const maxIndex = Math.max(0, slidesData.length - slidesPerView);
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = maxIndex;
                }
                moveCarousel();
            }

            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);

            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    updateSlidesPerView();
                    moveCarousel(true);
                }, 200);
            });

            setTimeout(() => {
                updateSlidesPerView();
                moveCarousel(true);
            }, 100);

            // Animação do carrossel (entrada)
            gsap.from('.carousel-wrapper', {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.carousel-wrapper',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // ============================================
        // ANIMAÇÕES GSAP - SEÇÃO "SOBRE"
        // ============================================
        const aboutCards = document.querySelectorAll('.about-card');
        aboutCards.forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                delay: i * 0.15
            });
        });

        // ============================================
        // ANIMAÇÃO DOS BOTÕES "ADICIONAR" (hover)
        // ============================================
        document.addEventListener('mouseover', function(e) {
            const btn = e.target.closest('.btn-add-cart');
            if (btn) {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }
        });

        document.addEventListener('mouseout', function(e) {
            const btn = e.target.closest('.btn-add-cart');
            if (btn) {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }
        });

        // ============================================
        // ANIMAÇÃO DE PARALLAX NO HERO (opcional)
        // ============================================
        const hero = document.querySelector('.hero');
        if (hero) {
            gsap.to(hero, {
                backgroundPosition: '50% 30%',
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // ============================================
        // ANIMAÇÃO DO FOOTER (entrada)
        // ============================================
        const footer = document.querySelector('.footer');
        if (footer) {
            gsap.from(footer, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // ============================================
        // ANIMAÇÃO DO BADGE DO CARRINHO (quando atualiza)
        // ============================================
        // Esta animação será acionada pelo cart.js quando o badge mudar
        window.animateCartBadge = function() {
            const badge = document.getElementById('cartBadge');
            if (badge && typeof gsap !== 'undefined') {
                gsap.from(badge, {
                    scale: 2,
                    duration: 0.4,
                    ease: 'back.out(2)',
                });
            }
        };

        // ============================================
        // ANIMAÇÃO DE SUCESSO AO ADICIONAR PRODUTO
        // ============================================
        window.animateProductAdd = function(card) {
            if (card && typeof gsap !== 'undefined') {
                gsap.from(card, {
                    boxShadow: '0 0 0 3px #0a0a0a',
                    duration: 0.4,
                    ease: 'power2.out',
                    onComplete: () => {
                        gsap.to(card, {
                            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                            duration: 0.6,
                            delay: 0.3
                        });
                    }
                });

                // Efeito de "pulse" no card
                gsap.to(card, {
                    scale: 1.02,
                    duration: 0.15,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.out'
                });
            }
        };

        // ============================================
        // ANIMAÇÃO DE ABERTURA DO CARRINHO
        // ============================================
        window.animateCartOpen = function(panel) {
            if (panel && typeof gsap !== 'undefined') {
                const content = panel.querySelector('.cart-content');
                const overlay = panel.querySelector('.cart-overlay');

                gsap.fromTo(content, {
                    x: '110%',
                    opacity: 0
                }, {
                    x: '0%',
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power3.out'
                });

                gsap.fromTo(overlay, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        };

        // ============================================
        // ANIMAÇÃO DE FECHAMENTO DO CARRINHO
        // ============================================
        window.animateCartClose = function(panel, callback) {
            if (panel && typeof gsap !== 'undefined') {
                const content = panel.querySelector('.cart-content');
                const overlay = panel.querySelector('.cart-overlay');

                gsap.to(content, {
                    x: '110%',
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power3.in',
                    onComplete: callback
                });

                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else if (callback) {
                callback();
            }
        };

        // ============================================
        // ANIMAÇÃO DE REMOÇÃO DE ITEM DO CARRINHO
        // ============================================
        window.animateCartItemRemove = function(item, callback) {
            if (item && typeof gsap !== 'undefined') {
                gsap.to(item, {
                    x: 60,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: callback
                });
            } else if (callback) {
                callback();
            }
        };

        // ============================================
        // ANIMAÇÃO DE QUANTIDADE (feedback)
        // ============================================
        window.animateQtyChange = function(item) {
            if (item && typeof gsap !== 'undefined') {
                gsap.from(item, {
                    scale: 0.97,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }
        };

        // ============================================
        // ANIMAÇÃO DO CHECKOUT
        // ============================================
        window.animateCheckout = function(btn, callback) {
            if (btn && typeof gsap !== 'undefined') {
                gsap.from(btn, {
                    scale: 0.9,
                    duration: 0.3,
                    ease: 'back.out(2)',
                    onComplete: callback
                });
            } else if (callback) {
                callback();
            }
        };

        // ============================================
        // ANIMAÇÃO DO TOAST (notificação)
        // ============================================
        window.animateToast = function(toast) {
            if (toast && typeof gsap !== 'undefined') {
                gsap.fromTo(toast, {
                    y: 80,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'back.out(2)'
                });
            }
        };

        // ============================================
        // ANIMAÇÃO DE ENTRADA DOS SLIDES DO CARROSSEL
        // ============================================
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach((slide, i) => {
            gsap.from(slide, {
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                delay: i * 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: slide,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // ============================================
        // ANIMAÇÃO CONTÍNUA DO HERO (background)
        // ============================================
        const heroImage = document.querySelector('.hero-image svg');
        if (heroImage) {
            gsap.to(heroImage, {
                y: -8,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }

        console.log('✅ GSAP animações carregadas com sucesso!');
    } else {
        console.warn('⚠️ GSAP não encontrado. Animações não estarão disponíveis.');
    }

})();