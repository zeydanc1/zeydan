const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.main-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menu.classList.toggle('active');

  // Erişilebilirlik için aria-expanded değişimi
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !expanded);
});
