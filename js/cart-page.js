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
    const cartItemsList = document.getElementById('cartItemsList');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryTotal = document.getElementById('summaryTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
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
        }, 3000);
    }

    // ============================================
    // FUNÇÕES DO CARRINHO
    // ============================================
    function formatPrice(value) {
        return 'R$ ' + value.toFixed(2).replace('.', ',');
    }

    function getTotal() {
        return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    }

    function updateBadge() {
        const total = cart.reduce((sum, item) => sum + item.qty, 0);
        if (cartBadge) {
            cartBadge.textContent = total;
        }
    }

    function saveCart() {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="cart-empty-state">
                    <i class="fas fa-shopping-bag"></i>
                    <h2>Seu carrinho está vazio</h2>
                    <p>Que tal dar uma olhada nos nossos produtos?</p>
                    <a href="../index.html#products" class="btn btn-primary">
                        <i class="fas fa-arrow-left"></i> Voltar às compras
                    </a>
                </div>
            `;
            summarySubtotal.textContent = 'R$ 0,00';
            summaryTotal.textContent = 'R$ 0,00';
            return;
        }

        let html = '';
        cart.forEach((item, index) => {
            html += `
                <div class="cart-item-card" data-index="${index}">
                    <div class="cart-item-card-image">
                        <svg viewBox="0 0 120 80" fill="none">
                            <rect x="10" y="10" width="100" height="60" rx="10" fill="${item.color || '#e8e8e8'}" />
                            <circle cx="60" cy="40" r="22" fill="${item.darkColor || '#0a0a0a'}" />
                            <path d="M45 40 L70 28 L80 38 L60 52 L45 40Z" fill="#fff" />
                        </svg>
                    </div>
                    <div class="cart-item-card-info">
                        <h3>${item.name}</h3>
                        <span class="cart-item-card-category">${item.category || 'Tênis'}</span>
                        <div class="cart-item-card-price">${formatPrice(item.price)}</div>
                    </div>
                    <div class="cart-item-card-actions">
                        <div class="cart-item-qty">
                            <button class="qty-dec" data-index="${index}">−</button>
                            <span>${item.qty}</span>
                            <button class="qty-inc" data-index="${index}">+</button>
                        </div>
                        <button class="cart-item-remove-btn" data-index="${index}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        cartItemsList.innerHTML = html;
        updateSummary();

        // Eventos dos botões
        document.querySelectorAll('.qty-inc').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.dataset.index);
                cart[idx].qty++;
                saveCart();
                renderCartItems();
                updateBadge();
                
                if (typeof gsap !== 'undefined') {
                    gsap.from(this.closest('.cart-item-card'), {
                        scale: 0.97,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                }
            });
        });

        document.querySelectorAll('.qty-dec').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.dataset.index);
                if (cart[idx].qty > 1) {
                    cart[idx].qty--;
                } else {
                    cart.splice(idx, 1);
                }
                saveCart();
                renderCartItems();
                updateBadge();
                
                if (typeof gsap !== 'undefined') {
                    gsap.from(this.closest('.cart-item-card'), {
                        scale: 0.97,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                }
            });
        });

        document.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.dataset.index);
                const itemEl = this.closest('.cart-item-card');
                
                if (typeof gsap !== 'undefined') {
                    gsap.to(itemEl, {
                        x: 60,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            cart.splice(idx, 1);
                            saveCart();
                            renderCartItems();
                            updateBadge();
                            showToast('Item removido', 'fa-trash-alt');
                        }
                    });
                } else {
                    cart.splice(idx, 1);
                    saveCart();
                    renderCartItems();
                    updateBadge();
                    showToast('Item removido', 'fa-trash-alt');
                }
            });
        });
    }

    function updateSummary() {
        const total = getTotal();
        summarySubtotal.textContent = formatPrice(total);
        summaryTotal.textContent = formatPrice(total);
    }

    // ============================================
    // CHECKOUT
    // ============================================
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showToast('Seu carrinho está vazio!', 'fa-exclamation-circle');
            return;
        }

        const total = getTotal();
        showToast(`Pedido finalizado! Total: ${formatPrice(total)}`, 'fa-check-circle');

        if (typeof gsap !== 'undefined') {
            gsap.from(this, {
                scale: 0.9,
                duration: 0.3,
                ease: 'back.out(2)',
                onComplete: () => {
                    cart = [];
                    saveCart();
                    renderCartItems();
                    updateBadge();
                }
            });
        } else {
            cart = [];
            saveCart();
            renderCartItems();
            updateBadge();
        }
    });

    // ============================================
    // MENU MOBILE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');

    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMobile.classList.toggle('open');
        });

        document.addEventListener('click', function(e) {
            const header = document.getElementById('header');
            if (header && !header.contains(e.target)) {
                navMobile.classList.remove('open');
            }
        });
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    renderCartItems();
    updateBadge();

    console.log('✅ Página do carrinho carregada!');

})();