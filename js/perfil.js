(function() {
    'use strict';

    // ============================================
    // TOAST LOCAL (reaproveita o estilo global)
    // ============================================
    function showProfileToast(message, icon = 'fa-check-circle') {
        let toast = document.getElementById('profileToast');
        if (!toast) return;
        toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
        toast.classList.add('show');

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(toast, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' });
        }

        clearTimeout(showProfileToast._timer);
        showProfileToast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // ============================================
    // NAVEGAÇÃO ENTRE ABAS DO PERFIL
    // ============================================
    const navButtons = document.querySelectorAll('.profile-nav button[data-panel]');
    const panels = document.querySelectorAll('.profile-panel');

    function switchPanel(name) {
        panels.forEach(panel => {
            const isTarget = panel.dataset.panel === name;
            if (isTarget) {
                panel.classList.add('active');
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(panel, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
                }
            } else {
                panel.classList.remove('active');
            }
        });

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.panel === name);
        });
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => switchPanel(btn.dataset.panel));
    });

    // ============================================
    // FORMULÁRIO DE DADOS PESSOAIS
    // ============================================
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showProfileToast('Dados atualizados com sucesso!');
            if (typeof gsap !== 'undefined') {
                gsap.fromTo('.btn-save', { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1 });
            }
        });
    }

    // ============================================
    // AVATAR — INICIAIS DINÂMICAS
    // ============================================
    const nomeInput = document.getElementById('nomeInput');
    const avatar = document.getElementById('profileAvatar');
    if (nomeInput && avatar) {
        nomeInput.addEventListener('input', () => {
            const parts = nomeInput.value.trim().split(' ').filter(Boolean);
            const initials = parts.length >= 2
                ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
                : (parts[0] ? parts[0].slice(0, 2).toUpperCase() : 'MC');
            avatar.textContent = initials;
        });
    }

    const avatarEditBtn = document.getElementById('avatarEditBtn');
    if (avatarEditBtn) {
        avatarEditBtn.addEventListener('click', () => {
            showProfileToast('Escolha uma nova foto pelo seu dispositivo', 'fa-camera');
            if (typeof gsap !== 'undefined') {
                gsap.fromTo('.profile-avatar', { scale: 1 }, { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.inOut' });
            }
        });
    }

    // ============================================
    // NOVO ENDEREÇO (placeholder)
    // ============================================
    const addAddressBtn = document.getElementById('addAddressBtn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => {
            showProfileToast('Formulário de novo endereço em breve', 'fa-map-marker-alt');
        });
    }

    // ============================================
    // LOGOUT (placeholder)
    // ============================================
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            showProfileToast('Sessão encerrada. Até logo!', 'fa-sign-out-alt');
            setTimeout(() => { window.location.href = '../index.html'; }, 1200);
        });
    }

    // ============================================
    // ENTRADA ANIMADA DO CARD LATERAL
    // ============================================
    if (typeof gsap !== 'undefined') {
        gsap.from('.profile-card', { opacity: 0, x: -24, duration: 0.7, ease: 'power3.out', delay: 0.15 });
        gsap.from('.profile-panel.active', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', delay: 0.25 });
    }

    console.log('✅ Perfil carregado!');
})();
