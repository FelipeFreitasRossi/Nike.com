(function() {
    'use strict';

    // ============================================
    // DADOS DOS PRODUTOS (com descrições completas)
    // ============================================
    const PRODUTOS = {
        1: {
            name: 'Urban Signature',
            category: 'Premium',
            price: 349,
            oldPrice: 449,
            image: 'https://i.postimg.cc/fT7vDXWg/Gemini-Generated-Image-tiheq4tiheq4tihe.jpg',
            badge: 'Lançamento',
            description: 'O Urban Signature é a expressão máxima do estilo urbano premium. Com acabamento em couro legítimo, solado de alta performance e design exclusivo inspirado nas grandes metrópoles, este tênis é perfeito para quem busca conforto e sofisticação no dia a dia. Tecnologia de amortecimento adaptativo para todas as pisadas.'
        },
        2: {
            name: 'Metro Runner',
            category: 'Corrida',
            price: 399,
            oldPrice: 499,
            image: 'https://i.postimg.cc/d0NBgYQY/Gemini-Generated-Image-sxbvzzsxbvzzsxbv.jpg',
            badge: 'Oferta',
            description: 'Desenvolvido para corredores exigentes, o Metro Runner combina leveza e resposta rápida. Amortecimento em espuma de alto retorno, cabedal em mesh respirável e solado antiderrapante. Ideal para corridas de rua e treinos intensos. Reduz o impacto em até 30% comparado a tênis convencionais.'
        },
        3: {
            name: 'Urban Classic',
            category: 'Masculino',
            price: 199,
            oldPrice: 249,
            image: 'https://i.postimg.cc/jdRRLQcj/images.jpg',
            badge: 'Oferta',
            description: 'O clássico que nunca sai de moda. Design atemporal com cabedal em couro sintético de alta qualidade, solado de borracha durável e palmilha confortável. Perfeito para compor looks casuais e urbanos com muito estilo. Versátil, combina com qualquer ocasião.'
        },
        4: {
            name: 'Street Style',
            category: 'Feminino',
            price: 179,
            oldPrice: 199,
            image: 'https://i.postimg.cc/k5Ln40Y3/images-(2).jpg',
            badge: 'Novo',
            description: 'Feito para mulheres que ditam tendências. O Street Style traz design moderno com detalhes únicos, cabedal em material premium e solado que garante conforto o dia todo. Combina perfeitamente com jeans, vestidos e produções urbanas. Disponível em cores exclusivas.'
        },
        5: {
            name: 'Urban Youth',
            category: 'Infantil',
            price: 149,
            oldPrice: 179,
            image: 'https://i.postimg.cc/vm4YGYzc/images-(3).jpg',
            badge: 'Novo',
            description: 'Conforto e estilo para os pequenos. O Urban Youth foi desenvolvido com materiais leves e flexíveis, perfeitos para acompanhar a energia das crianças. Fácil de calçar, com sistema de velcro e palmilha macia. Resistente e durável para todas as aventuras.'
        },
        6: {
            name: 'Premium Edition',
            category: 'Premium',
            price: 299,
            oldPrice: null,
            image: 'https://i.postimg.cc/VkGsyrjL/images-(4).jpg',
            badge: 'Lançamento',
            description: 'Edição limitada premium com acabamento artesanal. Cada par é único, com detalhes costurados à mão e materiais selecionados. Solado em borracha importada, cabedal em couro legítimo e forro em tecido respirável. Uma peça de coleção para quem valoriza exclusividade.'
        },
        7: {
            name: 'Air Max Pulse',
            category: 'Masculino',
            price: 999,
            oldPrice: 1199,
            image: 'https://i.postimg.cc/HksWP484/images-(5).jpg',
            badge: 'Oferta',
            description: 'Tecnologia de amortecimento a ar visível para máximo conforto e impacto reduzido. Cabedal em mesh de engenharia com suporte estrutural, entressola em espuma responsiva e solado de borracha waffle. O tênis definitivo para quem busca performance e estilo.'
        },
        8: {
            name: 'Dunk Low Retro',
            category: 'Feminino',
            price: 849,
            oldPrice: 949,
            image: 'https://i.postimg.cc/59LtHtMs/images-(6).jpg',
            badge: 'Novo',
            description: 'Inspirado no basquete clássico dos anos 80, o Dunk Low Retro volta com design icônico e materiais premium. Cabedal em couro, painéis sobrepostos e solado de borracha com padrão de aderência. Um clássico reinventado para o estilo urbano moderno.'
        },
        9: {
            name: 'Vaporfly 3',
            category: 'Corrida',
            price: 1499,
            oldPrice: null,
            image: 'https://i.postimg.cc/cJzJ3gHY/images-(7).jpg',
            badge: 'Lançamento',
            description: 'O tênis de corrida mais rápido da UrbanShop. Placa de carbono integrada, espuma ZoomX responsiva e design aerodinâmico. Projetado para quebrar recordes pessoais, oferece retorno de energia excepcional e leveza incomparável. Usado por atletas profissionais.'
        },
        10: {
            name: 'Urban Street',
            category: 'Masculino',
            price: 159,
            oldPrice: 189,
            image: 'https://i.postimg.cc/76bxYxn7/images-(8).jpg',
            badge: 'Oferta',
            description: 'Estilo de rua com conforto de sobra. O Urban Street tem design casual e despojado, perfeito para o dia a dia na cidade. Cabedal em lona resistente, solado de borracha vulcanizada e palmilha acolchoada. A escolha certa para quem busca praticidade sem abrir mão do estilo.'
        },
        11: {
            name: 'Court Vision',
            category: 'Feminino',
            price: 599,
            oldPrice: 699,
            image: 'https://i.postimg.cc/0jM2Z8zV/images-(9).jpg',
            badge: 'Oferta',
            description: 'Inspirado nas quadras de basquete, o Court Vision combina estilo retrô com conforto moderno. Cabedal em couro sintético, perfurações para ventilação e solado de borracha com padrão clássico. Um tênis versátil que vai do treino ao look casual com elegância.'
        }
    };

    // ============================================
    // ELEMENTOS DO MODAL
    // ============================================
    const overlay = document.getElementById('productModalOverlay');
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('productModalClose');
    const modalImage = document.getElementById('productModalImage');
    const modalBadge = document.getElementById('productModalBadge');
    const modalCategory = document.getElementById('productModalCategory');
    const modalTitle = document.getElementById('productModalTitle');
    const modalPrice = document.getElementById('productModalPrice');
    const modalOldPrice = document.getElementById('productModalOldPrice');
    const modalDescription = document.getElementById('productModalDescription');
    const modalAddCart = document.getElementById('productModalAddCart');
    const modalBuyNow = document.getElementById('productModalBuyNow');
    const sizesGrid = document.getElementById('sizesGrid');

    let currentProduct = null;
    let selectedSize = '40';

    // ============================================
    // FORMATAR PREÇO
    // ============================================
    function formatPrice(value) {
        return 'R$ ' + Number(value).toFixed(2).replace('.', ',');
    }

    // ============================================
    // ABRIR MODAL
    // ============================================
    function openProductModal(productId) {
        const product = PRODUTOS[productId];
        if (!product) return;

        currentProduct = { id: productId, ...product };
        selectedSize = '40';

        if (modalImage) {
            modalImage.src = product.image;
            modalImage.alt = product.name;
        }
        if (modalBadge) {
            modalBadge.textContent = product.badge || 'Novo';
        }
        if (modalCategory) modalCategory.textContent = product.category;
        if (modalTitle) modalTitle.textContent = product.name;
        if (modalPrice) modalPrice.textContent = formatPrice(product.price);
        if (modalOldPrice) {
            if (product.oldPrice) {
                modalOldPrice.textContent = formatPrice(product.oldPrice);
                modalOldPrice.style.display = 'inline';
            } else {
                modalOldPrice.style.display = 'none';
            }
        }
        if (modalDescription) modalDescription.textContent = product.description;

        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.size === selectedSize);
        });

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.product-modal-image',
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.5, delay: 0.1, ease: 'power3.out' }
            );
            gsap.fromTo('.product-modal-category',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: 'power3.out' }
            );
            gsap.fromTo('.product-modal-title',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.25, ease: 'power3.out' }
            );
            gsap.fromTo('.product-modal-price',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.3, ease: 'power3.out' }
            );
            gsap.fromTo('.product-modal-description',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.35, ease: 'power3.out' }
            );
            gsap.fromTo('.product-modal-sizes',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.4, ease: 'power3.out' }
            );
            gsap.fromTo('.product-modal-actions',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.45, ease: 'power3.out' }
            );
        }
    }

    // ============================================
    // FECHAR MODAL
    // ============================================
    function closeProductModal() {
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ============================================
    // EVENTOS DE FECHAR
    // ============================================
    if (modalClose) modalClose.addEventListener('click', closeProductModal);
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeProductModal();
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
            closeProductModal();
        }
    });

    // ============================================
    // SELEÇÃO DE TAMANHO
    // ============================================
    if (sizesGrid) {
        sizesGrid.addEventListener('click', function(e) {
            const btn = e.target.closest('.size-btn');
            if (!btn) return;

            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSize = btn.dataset.size;

            if (typeof gsap !== 'undefined') {
                gsap.from(btn, {
                    scale: 0.85,
                    duration: 0.2,
                    ease: 'back.out(2)'
                });
            }
        });
    }

    // ============================================
    // ADICIONAR AO CARRINHO
    // ============================================
    if (modalAddCart) {
        modalAddCart.addEventListener('click', function() {
            if (!currentProduct) return;

            const CART_KEY = 'urban_cart';
            let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

            const existing = cart.find(item => item.id === currentProduct.id && item.size === selectedSize);
            if (existing) {
                existing.qty++;
            } else {
                cart.push({
                    id: currentProduct.id,
                    name: currentProduct.name,
                    price: currentProduct.price,
                    qty: 1,
                    image: currentProduct.image,
                    category: currentProduct.category,
                    size: selectedSize
                });
            }

            localStorage.setItem(CART_KEY, JSON.stringify(cart));

            const cartBadge = document.getElementById('cartBadge');
            if (cartBadge) {
                const total = cart.reduce((sum, item) => sum + item.qty, 0);
                cartBadge.textContent = total;
                if (typeof gsap !== 'undefined') {
                    gsap.from(cartBadge, { scale: 2, duration: 0.4, ease: 'back.out(2)' });
                }
            }

            closeProductModal();

            if (typeof showToast === 'function') {
                showToast(`${currentProduct.name} (Tam ${selectedSize}) adicionado!`, 'fa-check-circle');
            } else {
                alert(`${currentProduct.name} adicionado ao carrinho!`);
            }
        });
    }

 // ============================================
// COMPRAR AGORA (WhatsApp)
// ============================================
if (modalBuyNow) {
    modalBuyNow.addEventListener('click', function() {
        if (!currentProduct) return;

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
👟 *PRODUTO SELECIONADO*
━━━━━━━━━━━━━━━━━━━━━━

📌 *Nome:* ${currentProduct.name}
🏷️ *Categoria:* ${currentProduct.category}
📏 *Tamanho:* ${selectedSize}
💰 *Valor:* ${formatPrice(currentProduct.price)}

━━━━━━━━━━━━━━━━━━━━━━
✅ *RESUMO DO PEDIDO*
━━━━━━━━━━━━━━━━━━━━━━

🛒 1x ${currentProduct.name} (Tam ${selectedSize})
💵 Total: *${formatPrice(currentProduct.price)}*

━━━━━━━━━━━━━━━━━━━━━━

💬 *Olá! Gostaria de finalizar este pedido.*

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
            gsap.to(this, {
                scale: 0.95,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out'
            });
        }

        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 200);
    });

}

    // ============================================
    // CLICAR NO CARD DO PRODUTO → ABRIR MODAL
    // ============================================
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.product-card');
        if (!card) return;

        if (e.target.closest('.btn-add-cart')) return;

        const id = parseInt(card.dataset.id);
        if (id) openProductModal(id);
    });

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    console.log('✅ UrbanShop - Modal de produto carregado!');
    console.log(`📦 ${Object.keys(PRODUTOS).length} produtos cadastrados`);

})();