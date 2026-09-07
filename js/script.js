(function() {
    'use strict';

    // ===== REGISTRAR SCROLLTRIGGER =====
    gsap.registerPlugin(ScrollTrigger);

    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== MENU MOBILE =====
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');

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
        if (!header.contains(e.target)) {
            navMobile.classList.remove('open');
        }
    });

    // ===== ANIMAÇÕES GSAP =====

    // Hero
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

    // ===== CARDS DE PRODUTOS (ScrollTrigger) =====
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

    // ===== CARROSSEL (com GSAP para transição suave) =====
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

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

    // Inicializar
    setTimeout(() => {
        updateSlidesPerView();
        moveCarousel(true);
    }, 100);

    // ===== ANIMAÇÃO DA SEÇÃO "SOBRE" =====
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

    // ===== ANIMAÇÃO DO CARROSSEL (entrada) =====
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

})();