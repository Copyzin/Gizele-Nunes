/* Gizele Nunes - Metodo SAFE - main.js */
(function () {
  'use strict';

  var doc = document;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined';
  var hasST = typeof window.ScrollTrigger !== 'undefined';

  var header = doc.getElementById('siteHeader');
  var menu = doc.getElementById('mobileMenu');
  var menuToggle = doc.getElementById('menuToggle');
  var menuClose = doc.getElementById('menuClose');
  var stickyBar = doc.getElementById('mobileStickyBar');
  var fab = doc.getElementById('whatsappFab');
  var heroEl = doc.querySelector('.hero');

  /* ---------- Mobile menu ---------- */
  function openMenu() {
    if (!menu) return;
    menu.classList.add('is-open');
    doc.body.classList.add('menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('is-open');
    doc.body.classList.remove('menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }
  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  if (menu) {
    var menuLinks = menu.querySelectorAll('[data-menu-item], [data-menu-cta]');
    Array.prototype.forEach.call(menuLinks, function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Header (two phase) + sticky bar + FAB ---------- */
  var EXIT_ZONE = 220;
  var UP_REVEAL_THRESHOLD = 60;
  var DOWN_DELTA_THRESHOLD = 6;
  var lastY = window.scrollY || 0;
  var upAccum = 0;
  var headerPhase = '';

  function heroBottom() {
    return heroEl ? heroEl.offsetTop + heroEl.offsetHeight : 600;
  }
  function stickyThreshold() {
    return heroEl ? heroEl.offsetHeight * 0.55 : 420;
  }

  function onScroll() {
    var y = window.scrollY || 0;
    var delta = y - lastY;

    if (header) {
      header.classList.toggle('is-elevated', y > 8);
      var hBottom = heroBottom();
      var exitStart = hBottom - EXIT_ZONE;

      if (y < exitStart) {
        if (headerPhase === 'exit-up') {
          header.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)';
        } else if (headerPhase !== 'top') {
          header.style.transition = 'none';
        }
        headerPhase = 'top';
        header.style.transform = 'translateY(0)';
        upAccum = 0;
      } else if (y < hBottom) {
        if (delta >= 0) {
          if (headerPhase !== 'exit') { header.style.transition = 'none'; headerPhase = 'exit'; }
          var p = (y - exitStart) / EXIT_ZONE;
          header.style.transform = 'translateY(' + (-p * 100) + '%)';
          upAccum = 0;
        } else {
          if (headerPhase !== 'exit-up') { headerPhase = 'exit-up'; }
          upAccum = 0;
        }
      } else {
        if (headerPhase !== 'past') {
          header.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)';
          headerPhase = 'past';
        }
        if (delta > DOWN_DELTA_THRESHOLD) {
          upAccum = 0;
          header.style.transform = 'translateY(-100%)';
        } else if (delta < 0) {
          upAccum += -delta;
          if (upAccum >= UP_REVEAL_THRESHOLD) header.style.transform = 'translateY(0)';
        }
      }
    }

    var show = y > stickyThreshold();
    if (stickyBar) stickyBar.classList.toggle('is-visible', show);
    if (fab) fab.classList.toggle('is-visible', show);

    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Entry animations ---------- */
  if (!hasGSAP || !hasST || prefersReduced) {
    doc.documentElement.classList.add('reveal-immediate');
  } else {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
      .to('[data-anim="hero-eyebrow"]', { opacity: 1, y: 0 })
      .to('[data-anim="hero-title"]', { opacity: 1, y: 0 }, '-=0.6')
      .to('[data-anim="hero-sub"]', { opacity: 1, y: 0 }, '-=0.55')
      .to('[data-anim="hero-cta"]', { opacity: 1, y: 0 }, '-=0.5')
      .to('[data-anim="hero-image"]', { opacity: 1, y: 0 }, '-=0.7');

    function reveal(selector, vars) {
      gsap.utils.toArray(selector).forEach(function (el) {
        var cfg = { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' };
        if (vars) { for (var k in vars) cfg[k] = vars[k]; }
        cfg.scrollTrigger = { trigger: el, start: 'top 85%', toggleActions: 'play none none none' };
        gsap.to(el, cfg);
      });
    }
    function batchReveal(selector) {
      ScrollTrigger.batch(gsap.utils.toArray(selector), {
        start: 'top 88%',
        onEnter: function (els) {
          gsap.to(els, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 });
        }
      });
    }

    reveal('[data-anim="section-title"]');
    reveal('[data-anim="about-image"]');
    reveal('[data-anim="diff-list"]');
    reveal('[data-anim="diff-quote"]');
    reveal('[data-anim="final-cta"]');
    batchReveal('[data-anim="cred-item"]');
    batchReveal('[data-anim="problem-card"]');
    batchReveal('[data-anim="step-card"]');
    batchReveal('[data-anim="faq-item"]');

    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  /* ---------- Text Trace (independent of GSAP) ---------- */
  var traceTargets = doc.querySelectorAll('[data-anim="text-trace"]');
  Array.prototype.forEach.call(traceTargets, function (el) {
    var hasInlineChildren = Array.prototype.some.call(el.childNodes, function (n) { return n.nodeType === 1; });
    if (hasInlineChildren) { return; }

    var traceColor = getComputedStyle(el).color;
    el.style.setProperty('--trace-color', traceColor);

    var rawText = el.textContent;
    el.textContent = '';
    var chars = [];
    rawText.split(/(\s+)/).forEach(function (tok) {
      if (tok.length === 0) return;
      if (/^\s+$/.test(tok)) { el.appendChild(doc.createTextNode(tok)); return; }
      var word = doc.createElement('span');
      word.className = 'trace-word';
      for (var i = 0; i < tok.length; i++) {
        var span = doc.createElement('span');
        span.className = 'trace-char';
        span.textContent = tok[i];
        word.appendChild(span);
        chars.push(span);
      }
      el.appendChild(word);
    });
    if (chars.length === 0) return;

    var staggerMs = parseInt(el.dataset.traceStaggerMs, 10) || 35;
    var durationMs = parseInt(el.dataset.traceDurationMs, 10) || 600;
    if (prefersReduced) return;

    chars.forEach(function (c) { c.style.setProperty('--trace-duration', durationMs + 'ms'); });

    var triggered = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          io.disconnect();
          chars.forEach(function (char, i) {
            char.style.setProperty('--trace-delay', (i * staggerMs) + 'ms');
            char.classList.add('is-animating');
          });
        }
      });
    }, { threshold: 0.1 });
    io.observe(el);
  });

  /* ---------- WhatsApp mini-FAQ chat (desktop: hover on FAB + teaser) ---------- */
  var waWidget = doc.getElementById('waWidget');
  var waFab = doc.getElementById('whatsappFab');
  if (waWidget) {
    var waThread = doc.getElementById('waThread');
    var waQuick = doc.getElementById('waQuick');
    var waScroll = doc.getElementById('waScroll');
    var waMsgs = [waWidget.dataset.msg1, waWidget.dataset.msg2, waWidget.dataset.msg3].filter(Boolean);
    var waWelcome = waMsgs.length ? waMsgs[Math.floor(Math.random() * waMsgs.length)] : 'Ola! Como posso ajudar?';
    var waReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var waFaqs = [];
    Array.prototype.forEach.call(doc.querySelectorAll('#faqList .faq-item'), function (it) {
      var q = it.querySelector('summary span');
      var a = it.querySelector('.faq-a p');
      if (q && a) waFaqs.push({ q: q.textContent.trim(), a: a.textContent.trim(), used: false });
    });
    if (waFaqs.length === 0 && waWidget.dataset.faqs) {
      try {
        JSON.parse(waWidget.dataset.faqs).forEach(function (f) {
          if (f && f.q && f.a) waFaqs.push({ q: String(f.q), a: String(f.a), used: false });
        });
      } catch (e) {}
    }

    function waScrollBottom() { if (waScroll) waScroll.scrollTop = waScroll.scrollHeight; }
    function waScrollToEl(el) {
      if (!waScroll || !el) return;
      var top = el.getBoundingClientRect().top - waScroll.getBoundingClientRect().top + waScroll.scrollTop;
      waScroll.scrollTop = Math.max(0, top - 8);
    }
    function waBubble(side, text) {
      var b = doc.createElement('div');
      b.className = 'wa-bubble wa-bubble--' + side;
      b.textContent = text;
      if (waThread) waThread.appendChild(b);
      waScrollBottom();
      return b;
    }
    function waTypingBubble() {
      var b = doc.createElement('div');
      b.className = 'wa-bubble wa-bubble--in wa-bubble--typing';
      b.innerHTML = '<span class="wa-dots"><span></span><span></span><span></span></span>';
      if (waThread) waThread.appendChild(b);
      waScrollBottom();
      return b;
    }
    function waSay(text, cb) {
      if (waReduced) { waBubble('in', text); if (cb) cb(); return; }
      var t = waTypingBubble();
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); waBubble('in', text); if (cb) cb(); }, 750);
    }
    function waRenderChips() {
      if (!waQuick) return;
      waQuick.innerHTML = '';
      var remaining = 0;
      waFaqs.forEach(function (f) {
        if (f.used) return;
        remaining++;
        var c = doc.createElement('button');
        c.type = 'button';
        c.className = 'wa-chip';
        c.textContent = f.q;
        c.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          waPinned = true;
          f.used = true;
          var qb = waBubble('out', f.q);
          waQuick.innerHTML = '';
          waSay(f.a, function () { waRenderChips(); waScrollToEl(qb); });
        });
        waQuick.appendChild(c);
      });
      if (remaining === 0) {
        var p = doc.createElement('p');
        p.className = 'wa-quick-end';
        p.textContent = waWidget.dataset.end || 'Fale com a gente no WhatsApp.';
        waQuick.appendChild(p);
      }
      waScrollBottom();
    }

    var waBuilt = false;
    function waBuildChat() { if (waBuilt) return; waBuilt = true; waSay(waWelcome, waRenderChips); }

    var waTeaser = doc.getElementById('waTeaser');
    var waTeaserOpen = doc.getElementById('waTeaserOpen');
    var waTeaserClose = doc.getElementById('waTeaserClose');
    var waCanHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var waOverFab = false, waOverPanel = false, waCloseT = null, waDismissed = false, waPinned = false, waReady = false, waTimerStarted = false;
    var WA_TEASER_DELAY = parseInt(waWidget.dataset.teaserDelay, 10) || 10000;

    function waFabVisible() { return !waFab || waFab.classList.contains('is-visible'); }
    function waChatOpen() { return waWidget.classList.contains('is-open'); }
    function waSyncTeaser() {
      if (!waTeaser) return;
      if (waReady && !waDismissed && waFabVisible() && !waChatOpen()) waTeaser.classList.add('is-shown');
      else waTeaser.classList.remove('is-shown');
    }
    function waHideTeaser() { if (waTeaser) waTeaser.classList.remove('is-shown'); }
    function waStartTimer() {
      if (waTimerStarted || waDismissed || !waFabVisible()) return;
      waTimerStarted = true;
      setTimeout(function () { waReady = true; waSyncTeaser(); }, WA_TEASER_DELAY);
    }
    function waOpen() {
      if (waDismissed || !waFabVisible()) return;
      waReady = true;
      waHideTeaser();
      waWidget.classList.add('is-open');
      waBuildChat();
    }
    function waBackToTeaser() {
      waWidget.classList.remove('is-open');
      waPinned = false;
      waSyncTeaser();
    }
    function waDismiss() {
      waDismissed = true; waPinned = false;
      waWidget.classList.remove('is-open');
      waHideTeaser();
    }
    function waScheduleClose() {
      clearTimeout(waCloseT);
      waCloseT = setTimeout(function () {
        if (!waOverFab && !waOverPanel && !waPinned) waBackToTeaser();
      }, 260);
    }

    var waCloseBtn = doc.getElementById('waClose');
    if (waCloseBtn) waCloseBtn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); waDismiss(); });
    if (waTeaserOpen) waTeaserOpen.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); waPinned = true; waOpen(); });
    if (waTeaserClose) waTeaserClose.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); waDismiss(); });

    if (waCanHover) {
      var waReopenT = null;
      if (waFab) {
        waFab.addEventListener('pointerenter', function () {
          waOverFab = true;
          clearTimeout(waCloseT);
          if (waDismissed) {
            clearTimeout(waReopenT);
            waReopenT = setTimeout(function () {
              if (waOverFab) { waDismissed = false; waOpen(); }
            }, 600);
          } else {
            waOpen();
          }
        });
        waFab.addEventListener('pointerleave', function () {
          waOverFab = false;
          clearTimeout(waReopenT);
          waScheduleClose();
        });
      }
      waWidget.addEventListener('pointerenter', function () { waOverPanel = true; clearTimeout(waCloseT); });
      waWidget.addEventListener('pointerleave', function () { waOverPanel = false; waScheduleClose(); });
      doc.addEventListener('click', function (e) {
        if (!waChatOpen()) return;
        if (waWidget.contains(e.target) || (waFab && waFab.contains(e.target)) || (waTeaser && waTeaser.contains(e.target))) return;
        waBackToTeaser();
      });
    }

    window.addEventListener('scroll', function () { waStartTimer(); waSyncTeaser(); }, { passive: true });
    waStartTimer();
    waSyncTeaser();
  }

  /* ---------- Count-up numbers (on view) ---------- */
  var countEls = doc.querySelectorAll('.js-countup');
  if (countEls.length && 'IntersectionObserver' in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        countIO.unobserve(el);
        var target = parseInt(el.dataset.countup, 10) || 0;
        if (prefersReduced) { el.textContent = String(target); return; }
        var dur = 1400, startTs = null;
        el.textContent = '0';
        var step = function (ts) {
          if (startTs === null) startTs = ts;
          var p = Math.min((ts - startTs) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = String(target);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    countEls.forEach(function (el) { countIO.observe(el); });
  }

})();
