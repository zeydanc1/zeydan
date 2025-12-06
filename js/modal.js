// modal.js
(() => {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const gallery = document.getElementById('gallery');
  const images = Array.from(gallery.querySelectorAll('img'));
  let currentIndex = 0;
  let lastFocused = null;
  let trapActive = false;

  // Initialize: tıklama ile modal açma
  images.forEach((img, idx) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openModal(idx));
  });

  // Modal açma
  function openModal(index) {
    currentIndex = index;
    updateModalImage();

    modal.hidden = false;          // erişilebilirlik için
    modal.classList.add("show");   // modal görünür olur

    lastFocused = document.activeElement;
    trapFocus();
    modal.focus();
  }

  // Modal kapama
  function closeModal() {
    modal.hidden = true;             // erişilebilirlik
    modal.classList.remove("show");  // görünürlüğü kapat

    removeTrap();
    if (lastFocused) lastFocused.focus();
  }

  // Görüntüyü güncelle
  function updateModalImage() {
    const img = images[currentIndex];
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  }

  // Sağ/sol ok ile geçiş
  window.changeImage = (dir) => {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    updateModalImage();
  };

  // Tıklama dışı kapatma
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Escape ile kapatma
  document.addEventListener('keydown', (e) => {
    if (!modal.hidden && e.key === 'Escape') {
      closeModal();
    }
  });

  // Focus trap
  function trapFocus() {
    if (trapActive) return;
    trapActive = true;
    lastFocused = lastFocused || document.activeElement;
    const focusable = modal.querySelectorAll(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKey(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    modal.addEventListener('keydown', handleKey);
    modal._trapHandler = handleKey;
  }

  function removeTrap() {
    if (!trapActive) return;
    trapActive = false;
    if (modal._trapHandler) {
      modal.removeEventListener('keydown', modal._trapHandler);
      modal._trapHandler = null;
    }
  }

  // Scroll engelleme / aktifleştirme
  function disableScroll() {
    document.body.style.overflow = 'hidden';
  }
  function enableScroll() {
    document.body.style.overflow = '';
  }

  // Hidden değişince scroll kontrolü
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      if (m.attributeName === 'hidden') {
        const hidden = modal.hidden;
        if (!hidden) disableScroll();
        else enableScroll();
      }
    });
  });
  observer.observe(modal, { attributes: true });

  // Expose closeModal globally 
  window.closeModal = closeModal;
})();
