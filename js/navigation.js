/**
 * navigation.js — Highlights the current page in the nav and optional page transition.
 */

(function () {
  'use strict';

  // Highlight current page link based on current URL
  function highlightCurrentPage() {
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';
    if (page === '') page = 'index.html';

    var links = document.querySelectorAll('.main-nav .nav-link');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === page || (page === 'index.html' && (href === 'index.html' || href === '/'))) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightCurrentPage);
  } else {
    highlightCurrentPage();
  }
})();
