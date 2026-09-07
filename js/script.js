(function() {
    'use strict';

    // ============================================
    // REGISTRAR SCROLLTRIGGER
    // ============================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ============================================
    // PRELOADER SIMPLES (páginas internas: carrinho, perfil)
    // Só atua quando existe .preloader-content (o preloader
    // completo da tela de boas-vindas é controlado por welcome.js)
    // ============================================
    const simplePreloader = document.getElementById('preloader');
    if (simplePreloader && simplePreloader.querySelector('.preloader-content')) {
        const finishLoading = () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(simplePreloader, {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    delay: 0.3,
                    onComplete: () => {
                        simplePreloader.classList.add('hidden');
                        document.body.style.overflow = '';
                    }
                });
            } else {
                simplePreloader.classList.add('hidden');
                document.body.style.overflow = '';
            }
        };
        document.body.style.overflow = 'hidden';
        if (document.readyState === 'complete') {
            finishLoading();
        } else {
            window.addEventListener('load', finishLoading);
        }
        setTimeout(finishLoading, 2200);
    }

    // ============================================
    // BARRA DE PROGRESSO DE SCROLL
    // ============================================
    let progressBarEl = document.querySelector('.scroll-progress');
    if (!progressBarEl) {
        progressBarEl = document.createElement('div');
        progressBarEl.className = 'scroll-progress';
        document.body.appendChild(progressBarEl);
    }

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBarEl.style.width = percent + '%';
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // ============================================
    // BOTÃO VOLTAR AO TOPO
    // ============================================
    let backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopBtn);
    }
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('visible', window.pageYOffset > 500);
    }, { passive: true });

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.pageYOffset > 20);
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
    // ANIMAÇÕES GSAP - DASHBOARD
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

        // Paralaxe suave da imagem do hero ao rolar
        const heroSection = document.querySelector('.hero');
        const heroImageWrap = document.querySelector('.hero-image');
        if (heroSection && heroImageWrap && typeof ScrollTrigger !== 'undefined') {
            gsap.to(heroImageWrap, {
                y: 60,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroSection,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // Título de seções - revelação com leve zoom
        document.querySelectorAll('.section-header').forEach((el) => {
            gsap.from(el.children, {
                opacity: 0,
                y: 36,
                duration: 0.8,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Produtos (ScrollTrigger com stagger real por linha)
        const productGrid = document.getElementById('productGrid');
        if (productGrid) {
            gsap.from(productGrid.children, {
                opacity: 0,
                y: 60,
                scale: 0.96,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: productGrid,
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // Carrossel
        const track = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (track && prevBtn && nextBtn) {
            const slidesData = (window.NIKE_PRODUCTS || []).slice(4).map(p => ({
                name: p.name,
                price: 'R$ ' + p.price.toFixed(2).replace('.', ',').replace(/,00$/, ''),
                color: p.color
            }));

            const fallbackSlides = [
                { name: 'Air Max Pulse', price: 'R$ 999', color: '#f5e6d3' },
                { name: 'Dunk Low Retro', price: 'R$ 849', color: '#cfe1f0' },
                { name: 'Vaporfly 3', price: 'R$ 1.499', color: '#f0e6d8' },
                { name: 'Air Zoom Tempo', price: 'R$ 1.199', color: '#e0d5c0' },
                { name: 'Court Vision', price: 'R$ 599', color: '#d4c9b8' },
                { name: 'Air Max 90', price: 'R$ 729', color: '#d4e0e8' }
            ];

            const finalSlides = slidesData.length ? slidesData : fallbackSlides;

            let currentIndex = 0;
            let slidesPerView = 3;

            function renderSlides() {
                track.innerHTML = '';
                finalSlides.forEach((item) => {
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
                const maxIndex = Math.max(0, finalSlides.length - slidesPerView);
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
                const maxIndex = Math.max(0, finalSlides.length - slidesPerView);
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                moveCarousel();
            }

            function prevSlide() {
                const maxIndex = Math.max(0, finalSlides.length - slidesPerView);
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

            // Auto-play discreto do carrossel
            let autoplayTimer = setInterval(nextSlide, 5000);
            const carouselSection = document.getElementById('carouselSection');
            if (carouselSection) {
                carouselSection.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
                carouselSection.addEventListener('mouseleave', () => {
                    autoplayTimer = setInterval(nextSlide, 5000);
                });
            }
        }

        // Sobre
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

        // Newsletter (se existir na página)
        const newsletter = document.querySelector('.newsletter-inner');
        if (newsletter) {
            gsap.from(newsletter.children, {
                opacity: 0,
                y: 30,
                duration: 0.9,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: newsletter,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // Footer
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

        // SVG flutuante
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

        // Revelação genérica para qualquer elemento com .reveal-up
        document.querySelectorAll('.reveal-up').forEach((el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // Revelação da hero de páginas internas (carrinho, perfil)
        const pageHero = document.querySelector('.page-hero');
        if (pageHero) {
            gsap.from(pageHero.children[0].children, {
                opacity: 0,
                y: 24,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }

        console.log('✅ GSAP animações carregadas!');
    }

    // ============================================
    // NEWSLETTER
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(this.querySelector('.btn'), { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1 });
            }
            const toast = document.getElementById('globalToast');
            if (toast) {
                toast.innerHTML = `<i class="fas fa-check-circle"></i> Inscrição confirmada! Fique de olho no seu e-mail.`;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3000);
            }
            input.value = '';
        });
    }

})();
