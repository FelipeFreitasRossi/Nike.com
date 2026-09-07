(function() {
    'use strict';

    // ============================================
    // CATÁLOGO (usado pela busca em todas as páginas)
    // ============================================
    const PRODUCTS = [
        { id: 1, name: 'Air Max 270', category: 'Masculino', price: 899, oldPrice: 1099, color: '#e8e8e8', dark: '#0a0a0a' },
        { id: 2, name: 'Air Force 1', category: 'Feminino', price: 749, oldPrice: 849, color: '#f5e6d3', dark: '#d4a373' },
        { id: 3, name: 'Court Legacy', category: 'Infantil', price: 499, oldPrice: 599, color: '#cfe1f0', dark: '#2a6f97' },
        { id: 4, name: 'ZoomX Vaporfly', category: 'Masculino', price: 1299, oldPrice: null, color: '#f0e6d8', dark: '#b08968' },
        { id: 5, name: 'Air Max Pulse', category: 'Lançamento', price: 999, oldPrice: null, color: '#f5e6d3', dark: '#333' },
        { id: 6, name: 'Dunk Low Retro', category: 'Feminino', price: 849, oldPrice: null, color: '#cfe1f0', dark: '#333' },
        { id: 7, name: 'Vaporfly 3', category: 'Masculino', price: 1499, oldPrice: null, color: '#f0e6d8', dark: '#333' },
        { id: 8, name: 'Air Zoom Tempo', category: 'Masculino', price: 1199, oldPrice: null, color: '#e0d5c0', dark: '#333' },
        { id: 9, name: 'Court Vision', category: 'Infantil', price: 599, oldPrice: null, color: '#d4c9b8', dark: '#333' },
        { id: 10, name: 'Air Max 90', category: 'Ofertas', price: 729, oldPrice: 899, color: '#d4e0e8', dark: '#333' }
    ];

    window.NIKE_PRODUCTS = PRODUCTS;

    function formatPrice(value) {
        return 'R$ ' + value.toFixed(2).replace('.', ',').replace(/\,00$/, '');
    }

    // ============================================
    // DETECTA A PROFUNDIDADE DA PÁGINA ATUAL
    // ============================================
    function dashboardPath() {
        return window.location.pathname.includes('/html/') ? '../dashboard.html' : 'dashboard.html';
    }

    // ============================================
    // INJETA O OVERLAY DE BUSCA NO DOM
    // ============================================
    function buildOverlay() {
        if (document.getElementById('searchOverlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'search-overlay';
        overlay.id = 'searchOverlay';
        overlay.innerHTML = `
            <div class="search-panel">
                <div class="search-field">
                    <i class="fas fa-search"></i>
                    <input type="text" id="searchInput" placeholder="Buscar tênis, categorias..." autocomplete="off" />
                    <button class="search-close" id="searchClose" aria-label="Fechar busca"><i class="fas fa-times"></i></button>
                </div>
                <div class="search-quick-tags" id="searchQuickTags"></div>
                <div class="search-body" id="searchBody"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        const tags = ['Masculino', 'Feminino', 'Infantil', 'Lançamento', 'Ofertas'];
        const tagsWrap = overlay.querySelector('#searchQuickTags');
        tags.forEach(tag => {
            const btn = document.createElement('button');
            btn.textContent = tag;
            btn.addEventListener('click', () => {
                document.getElementById('searchInput').value = tag;
                renderResults(tag);
            });
            tagsWrap.appendChild(btn);
        });

        return overlay;
    }

    function renderResults(query) {
        const body = document.getElementById('searchBody');
        if (!body) return;
        const term = query.trim().toLowerCase();

        if (!term) {
            body.innerHTML = `<div class="search-hint">Sugestões</div>`;
            const frag = document.createElement('div');
            PRODUCTS.slice(0, 4).forEach(p => frag.appendChild(resultRow(p)));
            body.appendChild(frag);
            return;
        }

        const matches = PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
        );

        if (matches.length === 0) {
            body.innerHTML = `
                <div class="search-empty">
                    <i class="fas fa-search"></i>
                    Nenhum produto encontrado para "<strong>${query}</strong>"
                </div>
            `;
            return;
        }

        body.innerHTML = `<div class="search-hint">${matches.length} resultado${matches.length > 1 ? 's' : ''}</div>`;
        matches.forEach(p => body.appendChild(resultRow(p)));
    }

    function resultRow(p) {
        const row = document.createElement('div');
        row.className = 'search-result-item';
        row.innerHTML = `
            <div class="search-result-thumb">
                <svg viewBox="0 0 120 80" fill="none">
                    <rect x="10" y="10" width="100" height="60" rx="10" fill="${p.color}" />
                    <circle cx="60" cy="40" r="22" fill="${p.dark}" />
                    <path d="M45 40 L70 28 L80 38 L60 52 L45 40Z" fill="#fff" />
                </svg>
            </div>
            <div class="search-result-info">
                <h4>${p.name}</h4>
                <span>${p.category}</span>
            </div>
            <div class="search-result-price">${formatPrice(p.price)}</div>
        `;
        row.addEventListener('click', () => {
            window.location.href = `${dashboardPath()}?destaque=${p.id}#products`;
        });
        return row;
    }

    function openSearch() {
        const overlay = document.getElementById('searchOverlay') || buildOverlay();
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        renderResults('');
        setTimeout(() => document.getElementById('searchInput').focus(), 150);

        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.search-panel', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
        }
    }

    function closeSearch() {
        const overlay = document.getElementById('searchOverlay');
        if (!overlay) return;
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    document.addEventListener('DOMContentLoaded', () => {
        buildOverlay();

        document.querySelectorAll('.icon-btn[aria-label="Buscar"]').forEach(btn => {
            btn.addEventListener('click', openSearch);
        });

        document.body.addEventListener('click', (e) => {
            if (e.target.id === 'searchClose' || e.target.closest('#searchClose')) closeSearch();
            if (e.target.id === 'searchOverlay') closeSearch();
        });

        document.body.addEventListener('input', (e) => {
            if (e.target.id === 'searchInput') renderResults(e.target.value);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSearch();
            if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                openSearch();
            }
        });

        // Destaca o produto vindo da busca (?destaque=ID)
        const params = new URLSearchParams(window.location.search);
        const highlightId = params.get('destaque');
        if (highlightId) {
            const card = document.querySelector(`.product-card[data-id="${highlightId}"]`);
            if (card) {
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.classList.add('is-highlighted');
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(card, { boxShadow: '0 0 0 0px rgba(255,59,48,0.5)' }, {
                            boxShadow: '0 0 0 4px rgba(255,59,48,0.35)',
                            duration: 0.6,
                            yoyo: true,
                            repeat: 3,
                            ease: 'power1.inOut'
                        });
                    }
                }, 500);
            }
        }
    });
})();
