/**
 * main.js — Runs on every page.
 * Initializes shared behavior: footer year, smooth scroll, and optional feature inits.
 */

(function () {
  'use strict';

  // Set footer year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Optional: init other global behavior here (e.g. smooth scroll is already via CSS)
})();
