/**
 * contact-modal.js — Opens contact modal when nav "contact" link is clicked; closes on overlay or close button.
 */
(function () {
  'use strict';

  function initContactModal() {
    var overlay = document.getElementById('contact-modal-overlay');
    var modal = document.getElementById('contact-modal');
    var triggers = document.querySelectorAll('#contact-nav-link, .contact-modal-trigger');

    if (!overlay) return;

    function openModal() {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      triggers.forEach(function (t) { t.setAttribute('aria-expanded', 'true'); });
      if (modal) modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      triggers.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
      if (modal) modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });

    overlay.addEventListener('click', function (e) {
      if (modal && !modal.contains(e.target)) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactModal);
  } else {
    initContactModal();
  }
})();
