/**
 * music-player.js — Background music: play/pause and volume.
 * Only inits if an <audio> element with id "bg-audio" has a source.
 * Does not autoplay; user must click play (respects user preference).
 */

(function () {
  'use strict';

  function initMusicPlayer() {
    var audio = document.getElementById('bg-audio');
    var playPauseBtn = document.getElementById('music-play-pause');
    var volumeControl = document.getElementById('music-volume');
    var container = document.getElementById('music-player-container');

    if (!audio || !playPauseBtn || !volumeControl || !container) return;

    // Only show and init if there is at least one source
    var hasSource = audio.querySelector('source') && audio.querySelector('source').getAttribute('src');
    if (!hasSource) {
      container.style.display = 'none';
      return;
    }

    function updateButtonLabel() {
      playPauseBtn.setAttribute('aria-label', audio.paused ? 'Play background music' : 'Pause background music');
      playPauseBtn.textContent = audio.paused ? 'Play' : 'Pause';
    }

    playPauseBtn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play().catch(function () { /* e.g. autoplay blocked */ });
      } else {
        audio.pause();
      }
      updateButtonLabel();
    });

    volumeControl.addEventListener('input', function () {
      audio.volume = parseFloat(volumeControl.value, 10);
    });

    audio.addEventListener('play', updateButtonLabel);
    audio.addEventListener('pause', updateButtonLabel);

    // Set initial volume from range
    audio.volume = parseFloat(volumeControl.value, 10);
    updateButtonLabel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusicPlayer);
  } else {
    initMusicPlayer();
  }
})();
