(function() {
    'use strict';

    // ============================================
    // CONFIGURAÇÃO
    // ============================================
    const CART_KEY = 'nike_cart';
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    // ============================================
    // DOM ELEMENTOS
    // ============================================
    const cartBadge = document.getElementById('cartBadge');

    // ============================================
    // TOAST
    // ============================================
    let toastTimer;

    function showToast(message, icon = 'fa-check-circle') {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
        toast.classList.add('show');

        if (typeof gsap !== 'undefined') {
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

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // ============================================
    // FUNÇÕES DO CARRINHO
    // ============================================
    function saveCart() {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function updateBadge() {
        const total = cart.reduce((sum, item) => sum + item.qty, 0);
        if (cartBadge) {
            cartBadge.textContent = total;
            
            // Animação do badge
            if (total > 0 && typeof gsap !== 'undefined') {
                gsap.from(cartBadge, {
                    scale: 2,
                    duration: 0.4,
                    ease: 'back.out(2)',
                });
            }
        }
    }

    function formatPrice(value) {
        return 'R$ ' + value.toFixed(2).replace('.', ',');
    }

    // ============================================
    // ADICIONAR PRODUTO
    // ============================================
    window.addToCart = function(product, cardElement) {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.qty++;
            showToast(`+1 ${product.name} no carrinho`, 'fa-plus-circle');
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                qty: 1,
                category: product.category || 'Tênis',
                color: product.color || '#e8e8e8',
                darkColor: product.darkColor || '#0a0a0a'
            });
            showToast(`${product.name} adicionado!`, 'fa-check-circle');
        }
        saveCart();
        updateBadge();

        // Animação do card
        if (cardElement && typeof gsap !== 'undefined') {
            gsap.from(cardElement, {
                boxShadow: '0 0 0 3px var(--color-accent)',
                duration: 0.4,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.to(cardElement, {
                        boxShadow: 'var(--shadow-sm)',
                        duration: 0.6,
                        delay: 0.3
                    });
                }
            });

            gsap.to(cardElement, {
                scale: 1.02,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out'
            });
        }
    };

    // ============================================
    // INTEGRAÇÃO COM PRODUTOS
    // ============================================
    function setupProductCards() {
        const cards = document.querySelectorAll('.product-card');
        const productData = [
            { id: 1, name: 'Air Max 270', price: 899, category: 'Masculino', color: '#e8e8e8', darkColor: '#0a0a0a' },
            { id: 2, name: 'Air Force 1', price: 749, category: 'Feminino', color: '#f5e6d3', darkColor: '#d4a373' },
            { id: 3, name: 'Court Legacy', price: 499, category: 'Infantil', color: '#cfe1f0', darkColor: '#2a6f97' },
            { id: 4, name: 'ZoomX Vaporfly', price: 1299, category: 'Masculino', color: '#f0e6d8', darkColor: '#b08968' },
        ];

        cards.forEach((card, index) => {
            // Verifica se já tem o botão
            if (card.querySelector('.btn-add-cart')) return;

            const btn = document.createElement('button');
            btn.className = 'btn-add-cart';
            btn.innerHTML = '<i class="fas fa-plus"></i> Adicionar';

            // Estilos inline para o botão
            btn.style.cssText = `
                margin-top: 12px;
                padding: 10px 16px;
                font-size: 0.75rem;
                border-radius: 60px;
                background: var(--color-black);
                color: var(--color-white);
                border: none;
                cursor: pointer;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                transition: all var(--transition);
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            `;

            btn.addEventListener('mouseenter', function() {
                this.style.background = 'var(--color-gray-900)';
                this.style.transform = 'scale(1.02)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.background = 'var(--color-black)';
                this.style.transform = 'scale(1)';
            });

            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const data = productData[index] || productData[0];
                window.addToCart(data, card);
            });

            const info = card.querySelector('.product-info');
            if (info) info.appendChild(btn);
        });
    }

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    updateBadge();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupProductCards);
    } else {
        setupProductCards();
    }

    console.log('✅ Carrinho carregado com sucesso!');

})();