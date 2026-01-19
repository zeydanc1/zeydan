// Redirection for Privacy Policy
function translatePage(lang) {
  if (lang === 'tr') {
    window.location.href = 'gizlilikpolitikasi.html';
  } else if (lang === 'en') {
    window.location.href = 'gizlilikpolitikasien.html';
  }
}

// Set active state on load
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isEnglish = path.includes('gizlilikpolitikasien.html');

  const btns = document.querySelectorAll('.language-switcher button');
  if (btns.length >= 2) {
    if (isEnglish) {
      btns.forEach(btn => {
        if (btn.innerText.trim() === 'EN') btn.classList.add('active');
        else btn.classList.remove('active');
      });
    } else {
      // Default to Turkish for gizlilikpolitikasi.html
      btns.forEach(btn => {
        if (btn.innerText.trim() === 'TR') btn.classList.add('active');
        else btn.classList.remove('active');
      });
    }
  }
});