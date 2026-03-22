/**
 * cassette.js — Cassette graphic on home page: click toggles background music (same as play/pause button).
 */
(function () {
  'use strict';

  function initCassette() {
    var trigger = document.getElementById('cassette-trigger');
    var playPauseBtn = document.getElementById('music-play-pause');
    if (!trigger || !playPauseBtn) return;

    trigger.addEventListener('click', function () {
      playPauseBtn.click();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCassette);
  } else {
    initCassette();
  }
})();
