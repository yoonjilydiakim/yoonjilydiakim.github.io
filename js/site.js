/* yoonji.me — tiny vanilla js for every page */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var palette = ['#ff3bcb', '#ff8a1f', '#33d1f2', '#c8f031', '#b49cff', '#2fb344', '#ff2d2d', '#2f7bef', '#ffe14d'];

  /* ---- live nyc clock in the nav ---- */
  var clock = document.querySelector('[data-clock]');
  if (clock) {
    var dateFmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', month: 'short', day: 'numeric' });
    var timeFmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', second: '2-digit' });
    var tick = function () {
      var now = new Date();
      clock.innerHTML = 'nyc ' + timeFmt.format(now) + '<span>' + dateFmt.format(now) + '</span>';
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---- mobile menu ---- */
  var menu = document.getElementById('menu');
  var toggle = document.querySelector('.nav-toggle');
  if (menu && toggle) {
    var setMenu = function (open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', function () { setMenu(true); });
    menu.querySelector('.menu-close').addEventListener('click', function () { setMenu(false); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---- split hero name into letters ---- */
  document.querySelectorAll('[data-split]').forEach(function (el) {
    var text = el.textContent;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    Array.prototype.forEach.call(text, function (c, i) {
      var s = document.createElement('span');
      s.className = 'ch';
      s.setAttribute('aria-hidden', 'true');
      s.style.setProperty('--i', i);
      s.textContent = c === ' ' ? ' ' : c;
      el.appendChild(s);
    });
  });

  /* ---- fit text to its container width ---- */
  var fitEls = document.querySelectorAll('[data-fit]');
  var fit = function () {
    fitEls.forEach(function (el) {
      el.style.fontSize = '100px';
      var w = el.parentElement.clientWidth - parseFloat(getComputedStyle(el.parentElement).paddingLeft) - parseFloat(getComputedStyle(el.parentElement).paddingRight);
      el.style.fontSize = (100 * w / el.scrollWidth) + 'px';
    });
  };
  if (fitEls.length) {
    fit();
    window.addEventListener('resize', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  }

  /* ---- scroll reveals ---- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-pop, .reveal-line, [data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- draggable doodle stickers (click still follows the link) ---- */
  document.querySelectorAll('.sticker').forEach(function (el) {
    var startX, startY, baseX, baseY, moved = false, dragging = false;
    el.addEventListener('dragstart', function (e) { e.preventDefault(); });
    el.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      dragging = true; moved = false;
      startX = e.clientX; startY = e.clientY;
      var m = /translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec(el.style.transform || '');
      baseX = m ? parseFloat(m[1]) : 0; baseY = m ? parseFloat(m[2]) : 0;
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      if (!moved && Math.hypot(dx, dy) > 5) { moved = true; el.classList.add('is-dragging'); el.style.zIndex = 20; }
      if (moved) el.style.transform = 'translate(' + (baseX + dx) + 'px, ' + (baseY + dy) + 'px)';
    });
    var end = function () { dragging = false; el.classList.remove('is-dragging'); };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } });
  });

  /* ---- image peek that follows the cursor over index rows ---- */
  var peek = document.querySelector('.cursor-peek');
  if (peek && window.matchMedia('(hover: hover)').matches) {
    var peekImg = peek.querySelector('img');
    var px = 0, py = 0, tx = 0, ty = 0, raf = null;
    var follow = function () {
      px += (tx - px) * 0.18; py += (ty - py) * 0.18;
      peek.style.left = px + 'px'; peek.style.top = py + 'px';
      raf = Math.abs(tx - px) + Math.abs(ty - py) > 0.5 ? requestAnimationFrame(follow) : null;
    };
    document.querySelectorAll('[data-peek]').forEach(function (row) {
      row.addEventListener('mouseenter', function (e) {
        peekImg.src = row.getAttribute('data-peek');
        px = tx = e.clientX; py = ty = e.clientY;
        peek.classList.add('is-on');
      });
      row.addEventListener('mousemove', function (e) {
        tx = e.clientX; ty = e.clientY;
        if (!raf) raf = requestAnimationFrame(follow);
      });
      row.addEventListener('mouseleave', function () { peek.classList.remove('is-on'); });
    });
  }

  /* ---- parallax for collage photos ---- */
  var para = document.querySelectorAll('[data-speed]');
  if (para.length && !reduceMotion && window.matchMedia('(min-width: 821px)').matches) {
    var ticking = false;
    var update = function () {
      var vh = window.innerHeight;
      para.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        var progress = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.translate = '0 ' + (progress * parseFloat(el.dataset.speed) * -120).toFixed(1) + 'px';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---- click anywhere (not on a control) for a burst of stars ---- */
  if (!reduceMotion) {
    var glyphs = ['✶', '★', '✦', '✷', '♥'];
    document.addEventListener('click', function (e) {
      if (e.target.closest('a, button, input, .lightbox, .menu')) return;
      for (var i = 0; i < 9; i++) {
        var s = document.createElement('span');
        s.className = 'pop-star';
        s.textContent = glyphs[i % glyphs.length];
        s.style.color = palette[Math.floor(Math.random() * palette.length)];
        s.style.left = e.clientX - 11 + 'px';
        s.style.top = e.clientY - 11 + 'px';
        document.body.appendChild(s);
        var ang = (Math.PI * 2 * i) / 9 + Math.random() * 0.5;
        var dist = 50 + Math.random() * 70;
        s.animate([
          { transform: 'translate(0,0) scale(.4) rotate(0deg)', opacity: 1 },
          { transform: 'translate(' + Math.cos(ang) * dist + 'px,' + (Math.sin(ang) * dist - 20) + 'px) scale(1.2) rotate(' + (Math.random() * 360 - 180) + 'deg)', opacity: 1, offset: 0.6 },
          { transform: 'translate(' + Math.cos(ang) * dist * 1.2 + 'px,' + (Math.sin(ang) * dist + 40) + 'px) scale(.8) rotate(200deg)', opacity: 0 }
        ], { duration: 900 + Math.random() * 300, easing: 'cubic-bezier(.16,1,.3,1)' }).onfinish = (function (node) { return function () { node.remove(); }; })(s);
      }
    });
  }

  /* ---- cassette music ---- */
  var tape = document.querySelector('.tape');
  if (tape) {
    var audio = new Audio(tape.getAttribute('data-src'));
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'none';
    var label = tape.querySelector('.tape-state');
    tape.addEventListener('click', function () {
      if (audio.paused) {
        audio.play().then(function () {
          tape.classList.add('is-playing');
          tape.setAttribute('aria-pressed', 'true');
          if (label) label.textContent = 'now playing';
        }).catch(function () {});
      } else {
        audio.pause();
        tape.classList.remove('is-playing');
        tape.setAttribute('aria-pressed', 'false');
        if (label) label.textContent = 'press play';
      }
    });
  }

  /* ---- lightbox for the modeling grid ---- */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-full]'));
    var lbImg = lb.querySelector('img');
    var lbCount = lb.querySelector('.lightbox-count');
    var idx = 0, lastFocus = null;
    var show = function (i) {
      idx = (i + items.length) % items.length;
      lbImg.src = items[idx].getAttribute('data-full');
      lbImg.alt = items[idx].querySelector('img').alt;
      lbCount.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lightbox-close').focus();
    };
    var close = function () {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    items.forEach(function (b, i) { b.addEventListener('click', function () { open(i); }); });
    lb.querySelector('.lightbox-close').addEventListener('click', close);
    lb.querySelector('.lightbox-prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lightbox-next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---- footer year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
