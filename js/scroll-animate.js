/**
 * Scroll Reveal - IntersectionObserver
 * Adds scroll-reveal class to sections then triggers .revealed on viewport entry
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // Elements to animate
        const targets = document.querySelectorAll(
            'section, .sertifika-karti, .etkinlik-karti, .basari-listesi, #iletisim ul li, .social-contact-grid .social-btn, .scroll-animate'
        );

        targets.forEach(function (el, i) {
            el.classList.add('scroll-reveal');
            // Stagger delay based on position within parent
            el.style.transitionDelay = (i % 6) * 0.07 + 's';
        });

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Yeni modern elementler için
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // only animate once
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        targets.forEach(function (el) {
            observer.observe(el);
        });

        // Header scroll state
        var header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', function () {
                header.classList.toggle('scrolled', window.scrollY > 50);
            }, { passive: true });
        }
    });
})();
