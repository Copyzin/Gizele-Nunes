/* Gizele Nunes - Metodo SAFE - article renderer */
/* Builds a pillar article dynamically from window.SAFE_CONTENT into #articleRoot. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.getElementById('articleRoot');
  if (!root) return;

  var pilar = root.getAttribute('data-pilar');
  var DATA = window.SAFE_CONTENT || {};
  var data = DATA[pilar];

  /* small DOM helper */
  function el(tag, className, text) {
    var node = doc.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function dot() { var s = el('span', 'dot'); s.setAttribute('aria-hidden', 'true'); return s; }

  /* graceful fallback when the pillar is unknown */
  if (!data) {
    var miss = el('section', 'article-body');
    var mw = el('div', 'article-wrap');
    mw.appendChild(el('h1', 'article-title', 'Pilar não encontrado'));
    mw.appendChild(el('p', null, 'Não encontramos o conteúdo deste pilar. Volte para conhecer o Método S.A.F.E. completo.'));
    var back = el('a', 'article-cta-btn'); back.href = '../index.html#metodo'; back.textContent = 'Voltar ao Método SAFE';
    mw.appendChild(back);
    miss.appendChild(mw);
    root.appendChild(miss);
    return;
  }

  doc.title = data.navTitle + ' | Pilar ' + data.pilarNum + ' do Método S.A.F.E.';

  /* ---------- HERO ---------- */
  var hero = el('section', 'article-hero');
  var heroWrap = el('div', 'article-wrap');

  var letter = el('span', 'article-hero-letter', data.letter);
  letter.setAttribute('aria-hidden', 'true');

  var eyebrow = el('p', 'article-kicker', data.eyebrow);
  eyebrow.setAttribute('data-anim', 'article-eyebrow');

  var title = el('h1', 'article-title', data.title);
  title.setAttribute('data-anim', 'article-title');

  var meta = el('div', 'article-meta');
  meta.setAttribute('data-anim', 'article-meta');
  meta.appendChild(el('span', null, 'Método S.A.F.E.'));
  meta.appendChild(dot());
  meta.appendChild(el('span', null, data.readingMin + ' min de leitura'));

  var lead = el('p', 'article-lead', data.lead);
  lead.setAttribute('data-anim', 'text-trace');
  lead.setAttribute('data-trace-stagger-ms', '10');
  lead.setAttribute('data-trace-duration-ms', '500');

  heroWrap.appendChild(letter);
  heroWrap.appendChild(eyebrow);
  heroWrap.appendChild(title);
  heroWrap.appendChild(meta);
  heroWrap.appendChild(lead);
  hero.appendChild(heroWrap);

  /* ---------- BODY ---------- */
  var bodySection = el('section', 'article-body');
  var bodyWrap = el('div', 'article-wrap');

  data.body.forEach(function (block) {
    if (block.type === 'section') {
      var s = el('div', 'article-section');
      s.setAttribute('data-anim', 'article-section');
      s.appendChild(el('h2', null, block.heading));
      (block.paragraphs || []).forEach(function (p) { s.appendChild(el('p', null, p)); });
      bodyWrap.appendChild(s);

    } else if (block.type === 'pullquote') {
      var bq = el('blockquote', 'article-pullquote');
      var qp = el('p', null, block.text);
      qp.setAttribute('data-anim', 'text-trace');
      qp.setAttribute('data-trace-end', 'outline');
      qp.setAttribute('data-trace-stagger-ms', '16');
      bq.appendChild(qp);
      if (block.cite) bq.appendChild(el('cite', null, block.cite));
      bodyWrap.appendChild(bq);

    } else if (block.type === 'stat') {
      var st = el('div', 'article-stat');
      st.setAttribute('data-anim', 'article-stat');
      var num = el('span', 'article-stat-num');
      if (block.prefix) num.appendChild(doc.createTextNode(block.prefix));
      var cu = el('span', 'js-countup', '0');
      cu.setAttribute('data-countup', String(block.num));
      cu.style.display = 'inline-block';
      cu.style.minWidth = String(block.num).length + 'ch';
      num.appendChild(cu);
      if (block.suffix) num.appendChild(doc.createTextNode(block.suffix));
      var txt = el('div', 'article-stat-text');
      txt.appendChild(el('span', 'l', block.label));
      txt.appendChild(el('span', 's', block.source));
      st.appendChild(num);
      st.appendChild(txt);
      bodyWrap.appendChild(st);

    } else if (block.type === 'cta') {
      var c = el('div', 'article-cta');
      c.setAttribute('data-anim', 'article-cta');
      c.appendChild(el('p', null, block.text));
      var btn = el('a', 'article-cta-btn');
      btn.href = block.href || '#';
      var ic = el('span', 'material-symbols-outlined', 'school');
      ic.setAttribute('aria-hidden', 'true');
      btn.appendChild(ic);
      btn.appendChild(doc.createTextNode(block.label));
      c.appendChild(btn);
      bodyWrap.appendChild(c);
    }
  });

  /* ---------- PREV / NEXT ---------- */
  function pnLink(side, slug) {
    var a = el('a', side);
    var k = el('span', 'k');
    var icon = el('span', 'material-symbols-outlined');
    icon.setAttribute('aria-hidden', 'true');
    if (slug && DATA[slug]) {
      var d = DATA[slug];
      icon.textContent = side === 'prev' ? 'arrow_back' : 'arrow_forward';
      k.appendChild(icon);
      k.appendChild(doc.createTextNode(side === 'prev' ? 'Pilar anterior' : 'Próximo pilar'));
      a.href = slug + '.html';
      a.appendChild(k);
      a.appendChild(el('span', 't', d.letter + '. ' + d.navTitle));
    } else {
      icon.textContent = 'grid_view';
      k.appendChild(icon);
      k.appendChild(doc.createTextNode('Todos os pilares'));
      a.href = '../index.html#metodo';
      a.appendChild(k);
      a.appendChild(el('span', 't', 'Voltar ao Método SAFE'));
    }
    return a;
  }
  var pn = el('nav', 'article-pn');
  pn.setAttribute('data-anim', 'article-pn');
  pn.setAttribute('aria-label', 'Navegação entre pilares');
  pn.appendChild(pnLink('prev', data.prevNext && data.prevNext.prev));
  pn.appendChild(pnLink('next', data.prevNext && data.prevNext.next));
  bodyWrap.appendChild(pn);

  bodySection.appendChild(bodyWrap);

  root.appendChild(hero);
  root.appendChild(bodySection);

  /* ---------- Text Trace (lead + pullquote), reusing main.js engine ---------- */
  if (typeof window.SAFE_TRACE === 'function') window.SAFE_TRACE(root);

  /* ---------- Entry animations ---------- */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined';
  var hasST = typeof window.ScrollTrigger !== 'undefined';

  if (hasGSAP && hasST && !prefersReduced) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
      .to('[data-anim="article-eyebrow"]', { opacity: 1, y: 0 })
      .to('[data-anim="article-title"]', { opacity: 1, y: 0 }, '-=0.6')
      .to('[data-anim="article-meta"]', { opacity: 1, y: 0 }, '-=0.6');

    gsap.utils.toArray('[data-anim="article-section"], [data-anim="article-stat"], [data-anim="article-cta"], [data-anim="article-pn"]').forEach(function (elm) {
      gsap.to(elm, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: elm, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    ScrollTrigger.refresh();
  }
  /* when GSAP is absent or reduced motion is on, main.js already added */
  /* html.reveal-immediate, so every [data-anim] block is visible by CSS. */

  /* ---------- Count-up numbers ---------- */
  var countEls = root.querySelectorAll('.js-countup');
  if (countEls.length && 'IntersectionObserver' in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var elm = entry.target;
        countIO.unobserve(elm);
        var target = parseInt(elm.dataset.countup, 10) || 0;
        if (prefersReduced) { elm.textContent = String(target); return; }
        var dur = 1400, startTs = null;
        var stepFn = function (ts) {
          if (startTs === null) startTs = ts;
          var p = Math.min((ts - startTs) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          elm.textContent = String(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(stepFn);
          else elm.textContent = String(target);
        };
        requestAnimationFrame(stepFn);
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(countEls, function (elm) { countIO.observe(elm); });
  }

  /* ---------- Scroll progress bar ---------- */
  var bar = el('div', 'scroll-progress');
  bar.setAttribute('aria-hidden', 'true');
  doc.body.appendChild(bar);
  var ticking = false;
  function updateBar() {
    var h = doc.documentElement;
    var max = (h.scrollHeight - h.clientHeight) || 1;
    var y = window.scrollY || h.scrollTop || 0;
    var p = Math.min(Math.max(y / max, 0), 1);
    bar.style.transform = 'scaleX(' + p + ')';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateBar); }
  }, { passive: true });
  window.addEventListener('resize', function () { requestAnimationFrame(updateBar); });
  window.addEventListener('load', updateBar);
  updateBar();

})();
