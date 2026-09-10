(function() {
    'use strict';

    // ============================================
    // CONFIGURAÇÃO
    // ============================================
    const searchInput = document.querySelector('.cir-search__field');
    const searchResults = document.getElementById('searchResults');
    const searchResultsList = document.getElementById('searchResultsList');
    const searchCount = document.getElementById('searchCount');
    const searchClose = document.getElementById('searchClose');
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.id = 'searchOverlay';
    document.body.appendChild(searchOverlay);

    // ============================================
    // DADOS DOS PRODUTOS (ATUALIZADO)
    // ============================================
    const products = [
        { id: 1, name: 'Urban Signature', category: 'Premium', price: 349, image: 'https://i.postimg.cc/fT7vDXWg/Gemini-Generated-Image-tiheq4tiheq4tihe.jpg' },
        { id: 2, name: 'Metro Runner', category: 'Corrida', price: 399, image: 'https://i.postimg.cc/d0NBgYQY/Gemini-Generated-Image-sxbvzzsxbvzzsxbv.jpg' },
        { id: 3, name: 'Urban Classic', category: 'Masculino', price: 199, image: 'https://i.postimg.cc/jdRRLQcj/images.jpg' },
        { id: 4, name: 'Street Style', category: 'Feminino', price: 179, image: 'https://i.postimg.cc/k5Ln40Y3/images-(2).jpg' },
        { id: 5, name: 'Urban Youth', category: 'Infantil', price: 149, image: 'https://i.postimg.cc/vm4YGYzc/images-(3).jpg' },
        { id: 6, name: 'Premium Edition', category: 'Premium', price: 299, image: 'https://i.postimg.cc/VkGsyrjL/images-(4).jpg' },
        { id: 7, name: 'Air Max Pulse', category: 'Masculino', price: 999, image: 'https://i.postimg.cc/HksWP484/images-(5).jpg' },
        { id: 8, name: 'Dunk Low Retro', category: 'Feminino', price: 849, image: 'https://i.postimg.cc/59LtHtMs/images-(6).jpg' },
        { id: 9, name: 'Vaporfly 3', category: 'Corrida', price: 1499, image: 'https://i.postimg.cc/cJzJ3gHY/images-(7).jpg' },
        { id: 10, name: 'Urban Street', category: 'Masculino', price: 159, image: 'https://i.postimg.cc/76bxYxn7/images-(8).jpg' },
        { id: 11, name: 'Court Vision', category: 'Feminino', price: 599, image: 'https://i.postimg.cc/0jM2Z8zV/images-(9).jpg' },
    ];

    // ============================================
    // FUNÇÕES
    // ============================================
    function searchProducts(query) {
        if (!query || query.trim() === '') return [];
        const term = query.toLowerCase().trim();
        return products.filter(p => 
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            p.price.toString().includes(term)
        );
    }

    function formatPrice(value) {
        return 'R$ ' + value.toFixed(2).replace('.', ',');
    }

    function highlightMatch(text, query) {
        if (!query || query.trim() === '') return text;
        const regex = new RegExp(`(${query.trim()})`, 'gi');
        return text.replace(regex, '<mark style="background:#000;color:#fff;padding:0 4px;border-radius:4px;">$1</mark>');
    }

    function renderResults(results) {
        searchResultsList.innerHTML = '';

        if (results.length === 0) {
            searchResultsList.innerHTML = `
                <div class="search-result-empty">
                    <i class="fas fa-search"></i>
                    <p>Nenhum produto encontrado</p>
                    <span class="hint">Tente buscar por nome, categoria ou preço</span>
                </div>
            `;
            searchCount.textContent = '0 resultados';
            return;
        }

        searchCount.textContent = `${results.length} resultado${results.length > 1 ? 's' : ''}`;

        results.forEach((product, index) => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            if (index === 0) item.classList.add('highlight');
            
            item.innerHTML = `
                <div class="search-result-thumb">
                    <img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" />
                </div>
                <div class="search-result-info">
                    <h4>${highlightMatch(product.name, searchInput.value)}</h4>
                    <span class="search-result-category">${product.category}</span>
                </div>
                <span class="search-result-price">${formatPrice(product.price)}</span>
            `;

            item.addEventListener('click', function() {
                const card = document.querySelector(`.product-card[data-id="${product.id}"]`);
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.boxShadow = '0 0 0 3px #000';
                    setTimeout(() => { card.style.boxShadow = ''; }, 2000);
                }
                closeSearch();
            });

            searchResultsList.appendChild(item);
        });

        const firstItem = searchResultsList.querySelector('.search-result-item');
        if (firstItem) firstItem.classList.add('highlight');
    }

    function openSearch() {
        searchResults.classList.add('active');
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
        searchResults.classList.remove('active');
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.blur();
        selectedIndex = -1;
    }

    // ============================================
    // EVENTOS
    // ============================================
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value;
        searchTimeout = setTimeout(() => {
            if (query.trim() === '') { closeSearch(); return; }
            const results = searchProducts(query);
            renderResults(results);
            openSearch();
        }, 250);
    });

    searchClose.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', closeSearch);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeSearch();
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
    });

    // ============================================
    // NAVEGAÇÃO POR TECLADO
    // ============================================
    let selectedIndex = -1;

    document.addEventListener('keydown', function(e) {
        if (!searchResults.classList.contains('active')) return;
        const items = searchResultsList.querySelectorAll('.search-result-item');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateHighlight(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, 0);
            updateHighlight(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const selected = searchResultsList.querySelector('.search-result-item.highlight');
            if (selected) selected.click();
        }
    });

    function updateHighlight(items) {
        items.forEach((item, i) => item.classList.toggle('highlight', i === selectedIndex));
        const selected = searchResultsList.querySelector('.search-result-item.highlight');
        if (selected) selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    console.log('✅ UrbanShop - Busca carregada!');

})();