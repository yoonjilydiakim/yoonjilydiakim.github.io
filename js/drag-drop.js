/**
 * drag-drop.js — Desktop icons: drag and drop anywhere on the page (drop-zone--anywhere).
 * Other drop zones: append moved element into the zone (original behavior).
 */

(function () {
  'use strict';

  var draggedElement = null;
  var dragOffsetX = 0;
  var dragOffsetY = 0;

  function initDragDrop() {
    var dropZones = document.querySelectorAll('.drop-zone');
    if (!dropZones.length) return;

    dropZones.forEach(function (zone) {
      var draggables = zone.querySelectorAll('.draggable');
      var isAnywhere = zone.classList.contains('drop-zone--anywhere');

      draggables.forEach(function (el) {
        el.setAttribute('draggable', 'true');
        el.setAttribute('tabindex', '0');
        el.addEventListener('dragstart', function (e) {
          handleDragStart(e, isAnywhere);
        });
        el.addEventListener('dragend', handleDragEnd);
      });

      zone.addEventListener('dragover', handleDragOver);
      zone.addEventListener('drop', function (e) {
        handleDrop(e, isAnywhere);
      });
      zone.addEventListener('dragleave', handleDragLeave);
    });

    // Document-level drop for "anywhere" zones so drop works even over nav/cassette
    document.addEventListener('dragover', function (e) {
      if (draggedElement && draggedElement.closest('.drop-zone--anywhere')) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }
    });
    document.addEventListener('drop', function (e) {
      if (draggedElement && draggedElement.closest('.drop-zone--anywhere')) {
        e.preventDefault();
        var x = e.clientX - dragOffsetX;
        var y = e.clientY - dragOffsetY;
        draggedElement.style.position = 'fixed';
        draggedElement.style.left = x + 'px';
        draggedElement.style.top = y + 'px';
        draggedElement.style.transform = 'none';
        if (e.currentTarget.classList) e.currentTarget.classList.remove('drop-over');
        document.querySelectorAll('.drop-zone.drop-over').forEach(function (el) {
          el.classList.remove('drop-over');
        });
      }
    });

    initDesktopIconPositions();
  }

  function initDesktopIconPositions() {
    var zone = document.getElementById('desktop-drop-zone');
    if (!zone) return;
    var icons = zone.querySelectorAll('.desktop-icon');
    icons.forEach(function (icon) {
      icon.style.position = 'fixed';
      icon.style.left = icon.getAttribute('data-initial-left') || '50%';
      icon.style.top = icon.getAttribute('data-initial-top') || '50%';
      icon.style.transform = 'translate(-50%, -50%)';
    });
  }

  function handleDragStart(e, isAnywhere) {
    draggedElement = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
    e.currentTarget.classList.add('dragging');

    if (isAnywhere) {
      var rect = e.currentTarget.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
    }
  }

  function handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    draggedElement = null;
    document.querySelectorAll('.drop-zone.drop-over').forEach(function (el) {
      el.classList.remove('drop-over');
    });
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    var target = e.currentTarget;
    if (target.classList) target.classList.add('drop-over');
  }

  function handleDragLeave(e) {
    if (e.currentTarget.classList) e.currentTarget.classList.remove('drop-over');
  }

  function handleDrop(e, isAnywhere) {
    e.preventDefault();
    if (e.currentTarget.classList) e.currentTarget.classList.remove('drop-over');
    if (!draggedElement) return;

    if (isAnywhere) {
      var x = e.clientX - dragOffsetX;
      var y = e.clientY - dragOffsetY;
      draggedElement.style.position = 'fixed';
      draggedElement.style.left = x + 'px';
      draggedElement.style.top = y + 'px';
      draggedElement.style.transform = 'none';
    } else {
      e.currentTarget.appendChild(draggedElement);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDragDrop);
  } else {
    initDragDrop();
  }
})();
