/**
 * Theme - Sabit Koyu Mod (Dark Mode Only)
 * Light mode devre dışı bırakıldı.
 */
(function () {
  // Her zaman dark mod uygula, localStorage'daki eski tercihi sil
  localStorage.removeItem('zeydan-theme');
  document.documentElement.setAttribute('data-theme', 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    // Tema değiştirme butonunu gizle
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.style.display = 'none';
  });
})();
