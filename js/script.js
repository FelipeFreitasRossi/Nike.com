        (function() {
            'use strict';

            // ----- MENU MOBILE -----
            const menuToggle = document.getElementById('menuToggle');
            const navMobile = document.getElementById('navMobile');

            menuToggle.addEventListener('click', function() {
                navMobile.classList.toggle('open');
            });

            // Fechar menu ao clicar em um link (opcional)
            navMobile.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    navMobile.classList.remove('open');
                });
            });

            // ----- CARROSSEL DE LANÇAMENTOS -----
            const track = document.getElementById('carouselTrack');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            // Dados dos slides
            const slidesData = [{
                name: 'Air Max Pulse',
                price: 'R$ 999',
                color: '#f5e6d3'
            }, {
                name: 'Dunk Low Retro',
                price: 'R$ 849',
                color: '#cfe1f0'
            }, {
                name: 'Vaporfly 3',
                price: 'R$ 1.499',
                color: '#f0e6d8'
            }, {
                name: 'Air Zoom Tempo',
                price: 'R$ 1.199',
                color: '#e0d5c0'
            }, {
                name: 'Court Vision',
                price: 'R$ 599',
                color: '#d4c9b8'
            }];

            // Renderizar slides
            function renderSlides() {
                track.innerHTML = '';
                slidesData.forEach(function(item) {
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

            // Lógica de rotação
            let currentIndex = 0;
            const totalSlides = slidesData.length;
            let slidesPerView = 3;

            function updateSlidesPerView() {
                if (window.innerWidth < 480) slidesPerView = 1;
                else if (window.innerWidth < 768) slidesPerView = 2;
                else slidesPerView = 3;
            }
            updateSlidesPerView();

            function getSlideWidth() {
                const trackStyle = window.getComputedStyle(track);
                const gap = 20; // mesmo valor do gap no CSS
                const totalWidth = track.parentElement.clientWidth;
                return (totalWidth - (slidesPerView - 1) * gap) / slidesPerView;
            }

            function moveCarousel() {
                const slideWidth = getSlideWidth();
                const offset = currentIndex * (slideWidth + 20);
                track.style.transform = `translateX(-${offset}px)`;
            }

            function nextSlide() {
                const maxIndex = totalSlides - slidesPerView;
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                moveCarousel();
            }

            function prevSlide() {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = totalSlides - slidesPerView;
                }
                moveCarousel();
            }

            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);

            // Ajustar ao redimensionar
            let resizeTimeout;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                    updateSlidesPerView();
                    moveCarousel();
                }, 200);
            });

            // Inicializar carrossel
            setTimeout(moveCarousel, 50);

            // ----- (Opcional) Efeito de destaque nos cards -----
            const cards = document.querySelectorAll('.product-card');
            cards.forEach(function(card) {
                card.addEventListener('mouseenter', function() {
                    this.style.transition = 'transform 0.25s, box-shadow 0.25s';
                });
            });

        })();
