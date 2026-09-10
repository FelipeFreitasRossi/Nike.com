(function() {
    'use strict';

    // ============================================
    // CONFIGURAÇÃO
    // ============================================
    const CART_KEY = 'urban_cart';
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
        let toast = document.getElementById('globalToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            toast.id = 'globalToast';
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
            if (typeof gsap !== 'undefined') {
                gsap.from(cartBadge, {
                    scale: 2,
                    duration: 0.4,
                    ease: 'back.out(2)'
                });
            }
        }
    }

    function saveCart() {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    // ============================================
    // RENDERIZAR ITENS DO CARRINHO
    // ============================================
    function renderCartItems() {
        if (!cartItemsList) return;

        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="cart-empty-state">
                    <i class="fas fa-shopping-bag"></i>
                    <h2>Seu carrinho está vazio</h2>
                    <p>Que tal dar uma olhada nos nossos produtos?</p>
                    <a href="../dashboard.html#products" class="btn btn-primary">
                        <i class="fas fa-arrow-left"></i> Voltar às compras
                    </a>
                </div>
            `;
            if (summarySubtotal) summarySubtotal.textContent = 'R$ 0,00';
            if (summaryTotal) summaryTotal.textContent = 'R$ 0,00';
            return;
        }

        let html = '';
        cart.forEach((item, index) => {
            html += `
                <div class="cart-item-card" data-index="${index}">
                    <div class="cart-item-card-image">
                        <img src="${item.image || ''}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;" />
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
        if (summarySubtotal) summarySubtotal.textContent = formatPrice(total);
        if (summaryTotal) summaryTotal.textContent = formatPrice(total);
    }

// ============================================
// CHECKOUT (WhatsApp)
// ============================================
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showToast('Seu carrinho está vazio!', 'fa-exclamation-circle');
            return;
        }

        // ============================================
        // CONFIGURAÇÃO DO WHATSAPP
        // ============================================
        const WHATSAPP_NUMBER = '5516996419475';

        // ============================================
        // DATA E HORA DO PEDIDO
        // ============================================
        const agora = new Date();
        const dataHora = agora.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // ============================================
        // ID ÚNICO DO PEDIDO
        // ============================================
        const pedidoId = 'US-' + Date.now().toString().slice(-6);

        // ============================================
        // MONTAR LISTA DE PRODUTOS
        // ============================================
        let listaProdutos = '';
        let total = 0;
        let totalItens = 0;

        cart.forEach((item, index) => {
            const subtotal = item.price * item.qty;
            total += subtotal;
            totalItens += item.qty;
            
            listaProdutos += `\n┌─────────────────────────┐\n`;
            listaProdutos += `│ ${index + 1}. *${item.name}*\n`;
            if (item.size) listaProdutos += `│ 📏 Tamanho: ${item.size}\n`;
            listaProdutos += `│ 🏷️ Categoria: ${item.category || 'Tênis'}\n`;
            listaProdutos += `│ 🛒 Quantidade: ${item.qty}\n`;
            listaProdutos += `│ 💵 Unitário: ${formatPrice(item.price)}\n`;
            listaProdutos += `│ 💰 Subtotal: *${formatPrice(subtotal)}*\n`;
            listaProdutos += `└─────────────────────────┘\n`;
        });

        // ============================================
        // MENSAGEM PROFISSIONAL
        // ============================================
        const mensagem = 
`╔══════════════════════════╗
   🛍️  *URBANSHOP*  🛍️
╚══════════════════════════╝

✨ *NOVO PEDIDO RECEBIDO* ✨

📋 *Pedido:* #${pedidoId}
📅 *Data:* ${dataHora}

━━━━━━━━━━━━━━━━━━━━━━
📦 *ITENS DO PEDIDO (${totalItens})*
━━━━━━━━━━━━━━━━━━━━━━
${listaProdutos}
━━━━━━━━━━━━━━━━━━━━━━
💰 *RESUMO FINANCEIRO*
━━━━━━━━━━━━━━━━━━━━━━

📊 Itens: ${totalItens} produto${totalItens > 1 ? 's' : ''}
🚚 Frete: *A combinar*
💵 Total: *${formatPrice(total)}*

━━━━━━━━━━━━━━━━━━━━━━

💬 *Olá! Gostaria de finalizar meu pedido.*

📦 Por favor, me informe:
   • Formas de pagamento disponíveis
   • Prazo de entrega para minha região
   • Valor do frete (se houver)

🙏 Fico no aguardo do retorno!`;

        // ============================================
        // ABRIR WHATSAPP
        // ============================================
        const mensagemCodificada = encodeURIComponent(mensagem);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemCodificada}`;

        // Animação no botão
        if (typeof gsap !== 'undefined') {
            gsap.from(this, {
                scale: 0.95,
                duration: 0.3,
                ease: 'back.out(2)'
            });
        }

        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            showToast('Redirecionando para o WhatsApp...', 'fa-whatsapp');
        }, 200);

        // ============================================
        // LIMPAR CARRINHO (após 3s)
        // ============================================
        setTimeout(() => {
            cart = [];
            saveCart();
            renderCartItems();
            updateBadge();
        }, 3000);
    });
}

    // ============================================
    // POP-UP
    // ============================================
    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');
    const popupContinue = document.getElementById('popupContinue');
    const popupProductImage = document.getElementById('popupProductImage');
    const popupProductName = document.getElementById('popupProductName');
    const popupProductPrice = document.getElementById('popupProductPrice');

    function openPopup(product) {
        if (!popupOverlay) return;

        if (popupProductImage) {
            popupProductImage.src = product.image || '';
            popupProductImage.alt = product.name || '';
        }
        if (popupProductName) popupProductName.textContent = product.name || 'Produto';
        if (popupProductPrice) popupProductPrice.textContent = formatPrice(product.price || 0);

        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.popup-icon',
                { scale: 0, rotate: -180 },
                { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2.5)', delay: 0.1 }
            );
            gsap.fromTo('.popup-title',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: 'power3.out' }
            );
            gsap.fromTo('.popup-message',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.3, ease: 'power3.out' }
            );
            gsap.fromTo('.popup-product',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.4, ease: 'power3.out' }
            );
            gsap.fromTo('.popup-btn',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.5, stagger: 0.1, ease: 'power3.out' }
            );
        }
    }

    function closePopup() {
        if (!popupOverlay) return;
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (popupClose) popupClose.addEventListener('click', closePopup);
    if (popupContinue) popupContinue.addEventListener('click', closePopup);
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) closePopup();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });

    // ============================================
    // ADICIONAR PRODUTOS (COM POP-UP)
    // ============================================
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn-add-cart');
        if (!btn) return;

        const card = btn.closest('.product-card');
        if (!card) return;

        const id = parseInt(card.dataset.id);
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        const category = card.querySelector('.product-category')?.textContent || 'Tênis';
        
        const imgElement = card.querySelector('.product-img');
        const image = imgElement ? imgElement.src : '';

        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({ 
                id, 
                name, 
                price, 
                qty: 1, 
                image,
                category
            });
        }

        saveCart();
        updateBadge();

        if (typeof gsap !== 'undefined') {
            gsap.from(card, {
                boxShadow: '0 0 0 3px #000000',
                duration: 0.4,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.to(card, {
                        boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                        duration: 0.6,
                        delay: 0.3
                    });
                }
            });
            gsap.to(card, {
                scale: 1.02,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out'
            });
        }

        openPopup({ name, price, image });
    });

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    renderCartItems();
    updateBadge();

    console.log('✅ UrbanShop - Carrinho carregado!');

})();