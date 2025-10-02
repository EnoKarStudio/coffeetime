// Плавное появление секций при прокрутке и плавный скролл по якорям + онлайн заказ

document.addEventListener('DOMContentLoaded', () => {
    // Анимация появления секций
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeEls.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Плавный скролл по якорям
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Онлайн заказ
    const orderBtn = document.getElementById('order-btn');
    const orderModal = document.getElementById('order-modal');
    const orderClose = document.getElementById('order-modal-close');
    const orderForm = document.getElementById('order-form');
    const orderSuccess = document.getElementById('order-success');

    if (orderBtn && orderModal && orderClose && orderForm && orderSuccess) {
        orderBtn.addEventListener('click', () => {
            orderModal.classList.add('active');
            orderForm.style.display = '';
            orderSuccess.style.display = 'none';
        });

        orderClose.addEventListener('click', () => {
            orderModal.classList.remove('active');
        });

        orderModal.addEventListener('click', (e) => {
            if (e.target === orderModal) {
                orderModal.classList.remove('active');
            }
        });

        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            orderForm.style.display = 'none';
            orderSuccess.style.display = '';
        });
    }
});