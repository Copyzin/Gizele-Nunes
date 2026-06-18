# Contexto de implementação — Acordeão SAFE

## O que foi implementado

Seção `#metodo` do site Gizele Nunes (landing page de curso jurídico para dentistas) foi substituída por um acordeão horizontal estilo Uiverse, com animação em duas fases e exclusividade de painel.

---

## Decisões de design (grilladas e aprovadas)

| Decisão | Resolução |
|---|---|
| Estado inicial | Todos fechados — letra no topo, título rotacionado -90° |
| Exclusividade | Só um painel aberto; abrir B dispara reverse em A |
| Exit suave | Prioridade: `tl.reverse()` a partir do progresso atual, sem corte |
| Cores dos painéis | Fundo `#1F1A47` (navy-deep), borda `rgba(184,154,94,0.22)` |
| Letra | Cinzel bold, `clamp(1.75rem,2.8vw,2.75rem)`, cor `#B89A5E` (accent) |
| Título | Cinzel bold, **mesmo tamanho** da letra, cor `#FFFFFF` |
| Fusão letra→título | A letra ocupa exatamente a posição do primeiro char do título; após o snap, a letra faz fade-out imperceptível e só o título permanece |
| Snap "Lego" | Impacto + vibração lateral ±1.5px em 3 keyframes (0.04s cada) |
| Altura da seção | `100dvh` dinâmico; acordeão preenche o restante via `flex: 1` |
| CTA bar | Dentro do mesmo viewport — `flex: none` no rodapé da coluna |
| Subtítulo itálico | **Removido** (redundante com o conteúdo dos cards) |
| Mobile | Carrossel horizontal `scroll-snap-type: x mandatory`, todos abertos via CSS puro, JS não roda |

---

## Sequência de animação (desktop)

```
t=0.00s  Fase 1 início (simultâneos):
           - painel: flexGrow 1 → 4  (ease: power2.inOut, 0.6s)
           - título: rotation -90° → 0°  (ease: power2.inOut, 0.6s)

t=0.60s  Fase 2 início (simultâneos):
           - título: x,y → 0,0  (move ao topo-esquerdo, ease: power2.out, 0.45s)
           - conteúdo: clip-path inset(0% 0% 100% 0%) → inset(0% 0% 0% 0%)
                       + opacity 0 → 1  (ease: power2.out, 0.45s)

t=0.85s  Letra começa fade-out (duration 0.28s, ease: power1.inOut)

t=1.04s  Snap — vibração lateral:
           x: 0 → +1.5 (0.04s)
           x: +1.5 → -1.5 (0.04s)
           x: -1.5 → 0 (0.04s)

t=1.12s  Timeline completa. Estado final:
           - título em topo-esquerdo, Cinzel branco, sem transform
           - letra: opacity 0 (invisível mas no DOM)
           - conteúdo: totalmente visível

EXIT: tl.reverse() a partir do progresso atual
      Ao reverter a partir do estado completo:
        - letra faz fade-in enquanto título começa a rotar (t=1.12→0.85 reverso)
        - conteúdo some, título volta ao centro, painel colapsa
```

---

## Arquivos e localizações

| Arquivo | O que mudou |
|---|---|
| `index.html` | Seção `#metodo` (linha ~239) substituída; CSS `?v=16`; JS `?v=7` |
| `assets/css/styles.css` | Classes `.safe-*` adicionadas ao final (após linha 480) |
| `assets/js/main.js` | IIFE `SAFE Accordion` adicionada antes do bloco `Count-up` |

---

## Estrutura HTML do acordeão

```html
<section id="metodo" class="safe-section scroll-mt-24" style="background: radial-gradient(...)">
  <div class="safe-inner mx-auto max-w-6xl px-5 sm:px-8">

    <div class="safe-headings">
      <!-- eyebrow pill + h2 (sem subtítulo itálico) -->
    </div>

    <div class="safe-accordion" id="safeAccordion">
      <div class="safe-panel" data-idx="0" tabindex="0">
        <span class="safe-letter">S</span>          <!-- gold, z-index 2, absolute top-left -->
        <span class="safe-title">Segurança</span>   <!-- white, z-index 3, GSAP posiciona -->
        <div class="safe-content">                  <!-- hidden → clipPath reveal -->
          <p>...</p>
          <p class="safe-quote">...</p>             <!-- só no card S -->
        </div>
      </div>
      <!-- idem para A, F, E (sem safe-quote) -->
    </div>

    <div class="safe-cta-bar">
      <p>Tudo isso em um único módulo...</p>
      <a href="#" class="safe-cta-btn">...</a>
    </div>

  </div>
</section>
```

---

## Classes CSS principais

```css
.safe-section   /* height: 100dvh, flex-col */
.safe-inner     /* flex:1, flex-col, padding-top: calc(68px + 1.75rem) */
.safe-headings  /* flex: none */
.safe-accordion /* flex:1, min-height:0, display:flex, gap:5px */
.safe-panel     /* position:relative, flex:1, overflow:hidden, border-radius:10px */
.safe-letter    /* position:absolute, top/left:1.25rem, Cinzel bold, #B89A5E */
.safe-title     /* position:absolute, top/left:1.25rem, Cinzel bold, #FFFFFF, GSAP controla */
.safe-content   /* position:absolute, top: setado por JS, left/right:1.25rem, bottom:1.5rem */
.safe-quote     /* Cormorant Garamond italic, rgba(184,154,94,0.88) */
.safe-cta-bar   /* flex:none, flex-row, justify-between, fundo rgba(255,255,255,0.04) */
.safe-cta-btn   /* pill dourada #B89A5E, cor #1F1A47 */
```

---

## Lógica JS (GSAP)

```javascript
// Variáveis de controle
var FLEX_MAX = 4, FLEX_MIN = 1, GAP_PX = 5, PAD = 20, GAP_BEL = 14;
var activeIdx = -1;
var tls = [];  // uma GSAP timeline por painel

// build(): chamado no evento 'load'
// - mede offsetWidth/Height de cada painel e título
// - calcula offsetX/Y para centrar título rotacionado na largura mínima esperada
// - gsap.set() posiciona título e esconde conteúdo
// - constrói timeline de cada painel (paused: true)

// openPanel(idx): play tl[idx]; se havia outro ativo, reverse nele
// closePanel(idx): reverse tl[idx] se era o ativo

// mouseenter → openPanel, mouseleave → closePanel
// keydown Enter/Space → toggle
```

---

## Cálculo de posicionamento do título (fechado)

```
minPW = (accW - GAP_PX*(n-1)) / (FLEX_MIN*(n-1) + FLEX_MAX) * FLEX_MIN
         ≈ 1/7 da largura do acordeão (quando um painel está expandido)

offsetX = minPW/2 - PAD - titleWidth/2
offsetY = panelHeight/2 - PAD - titleHeight/2
```

O `transformOrigin: 'center center'` garante que a rotação ocorre em volta do centro do elemento. Ao reverter `x: 0, y: 0`, o título vai para `top: 1.25rem; left: 1.25rem` — exatamente sobre a letra.

---

## Conteúdo de cada pilar

| Pilar | Título | Texto | Extra |
|---|---|---|---|
| S | Segurança | Contrato revisado por especialistas em Direito do Trabalho e da Saúde... | `.safe-quote`: "Sem contrato validado, nenhum dos outros pilares sustenta." |
| A | Aplicação | Aulas práticas de advertências, suspensões e demissões... | — |
| F | Formalização | Aulas bônus com professores convidados + LGPD... | — |
| E | Estratégia | Duas reuniões de implantação + canal de suporte jurídico contínuo. | — |

---

## Pendências / próximos ajustes

- Ajustes visuais a definir pelo usuário após testar no browser
- Link do curso (Hotmart/Kiwify) ainda é `href="#"` — TODO no HTML
