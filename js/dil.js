// Basic redirection
function translatePage(lang) {
  if (lang === 'tr') {
    window.location.href = 'index.html';
  } else if (lang === 'en') {
    window.location.href = 'indexen.html';
  }
}

// Set active state on load
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isEnglish = path.includes('indexen.html');

  // Get buttons
  const btns = document.querySelectorAll('.language-switcher button');
  if (btns.length >= 2) {
    if (isEnglish) {
      btns[0].classList.remove('active');
      btns.forEach(btn => {
        if (btn.textContent.trim() === 'EN') btn.classList.add('active');
        else btn.classList.remove('active');
      });
    } else {
      // Default to Turkish
      btns.forEach(btn => {
        if (btn.textContent.trim() === 'TR') btn.classList.add('active');
        else btn.classList.remove('active');
      });
    }
  }
});


