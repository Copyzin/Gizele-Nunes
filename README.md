# Gizele Nunes — Advocacia da Saúde

Landing page estática do **Curso S.A.F.E. (Módulo 01)** — segurança jurídica aplicada ao consultório odontológico. O método se organiza em 4 pilares: **S**egurança, **A**plicação, **F**ormalização e **E**stratégia, cada um com uma página de artigo dedicada.

Desenvolvido por [Almeida Escala Digital](https://almeidaescaladigital.com/).

Stack: HTML5 estático + Tailwind (CDN, config inline) + Vanilla JS + GSAP/ScrollTrigger (CDN). Sem `package.json`, sem build.

---

## Estrutura de arquivos

```
index.html              # landing principal
404.html                # pagina de erro 404 (mesma identidade visual)
.htaccess               # config Apache: rotas, 404, HTTPS, cache, seguranca
favicon.jpg             # favicon do site

metodo/                 # paginas de artigo por pilar (linkadas pela landing e pelo menu)
  seguranca.html
  aplicacao.html
  formalizacao.html
  estrategia.html

assets/
  css/
    styles.css          # todos os estilos (landing + paginas de artigo)
  js/
    main.js             # GSAP, scroll, header 2 fases, menu, sticky bar, WhatsApp widget
    article.js          # render e scripts das paginas de artigo
    safe-content.js     # conteudo (texto) dos artigos dos 4 pilares
  images/
    gizele-hero.jpg     # foto principal (hero)
    gizele-sobre.png    # foto da secao Sobre
    logo-icon.png       # monograma GN (recolorido via CSS mask; marca d'agua)
    og-image.png        # imagem de compartilhamento social (1200x630)
    selo-safe.svg       # selo ornamental do Metodo SAFE
```

> Arquivos internos de trabalho (`*.md`, `*.txt`, `INDENTIDADE VISUAL/`, `infos.txt`) **não** fazem parte do site — não precisam ir para o servidor. O `.htaccess` já bloqueia o acesso público a `.md`.

---

## Pendências antes de ir ao ar

Procure pelos comentários `<!-- TODO -->` no `index.html` (e nas páginas de `metodo/`). Os itens são:

| Campo | Onde substituir | Exemplo |
|---|---|---|
| Link do curso | Botões "Quero me inscrever" (hero, seção Método e sticky bar mobile) — hoje `href="#"` | `https://pay.hotmart.com/...` |
| Número do WhatsApp | Todos os links `wa.me/...` | `5511987654321` |
| OAB | Credencial no rodapé da hero | `OAB/SP 123.456` |
| Anos de atuação | Credencial no rodapé da hero | `8 anos` |
| E-mail | Rodapé, link `mailto:` | `contato@gizelenunes.adv.br` |
| Domínio absoluto | Tags `og:url`, `og:image`, `twitter:image` no `<head>` | `https://gizelenunes.adv.br` |

---

## Deploy

O projeto é 100% estático — sem servidor, sem build. Basta subir a pasta inteira (exceto os arquivos internos de trabalho citados acima).

### Hospedagem Apache (Hostinger, cPanel, etc.) — recomendado

O `.htaccess` na raiz só funciona em servidores **Apache**. Faça upload de todos os arquivos para `public_html` (Gerenciador de Arquivos ou FTP/FileZilla). O `.htaccess` cuida de:

- **Página 404** → serve `404.html` com status 404 correto (`ErrorDocument`).
- **HTTPS forçado** → redireciona `http` para `https` (**exige certificado SSL ativo** no domínio; sem SSL, comente o bloco "Forca HTTPS" para evitar loop).
- **Canonical `www` → sem `www`** (coerente com `og:url`).
- **Cache**: assets (CSS/JS/imagens) com cache longo + `immutable`; HTML sempre revalidado.
- **Performance/segurança**: gzip, sem listagem de diretórios, bloqueio de `.md`/dotfiles, cabeçalhos `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.

### Netlify / Vercel / GitHub Pages

Nessas plataformas o `.htaccess` é **ignorado** (não são Apache), mas tudo o que importa já é tratado nativamente:

- **HTTPS** é automático.
- A página **`404.html`** é servida automaticamente em rotas inexistentes.
- **Netlify / Vercel:** conecte o repositório GitHub, framework = "Other" (nenhum), publish directory = `/` (raiz). Deploy automático a cada push.
- **GitHub Pages:** **Settings → Pages → Branch** `main`, pasta `/ (root)`, **Save**. Sai em `https://Copyzin.github.io/Gizele-Nunes/`. Para domínio próprio, adicione um arquivo `CNAME` na raiz com o domínio e configure DNS tipo `A` para os IPs do GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).

---

## Adicionando Google Tag Manager (GTM)

O GTM é o método recomendado — permite adicionar qualquer tag (Analytics, Meta Pixel, etc.) sem mexer no código depois.

### 1. Obtenha seu ID de contêiner

No [tagmanager.google.com](https://tagmanager.google.com), crie uma conta e um contêiner. O ID tem o formato `GTM-XXXXXXX`.

### 2. Cole os snippets no `index.html`

**Snippet 1 — no `<head>`, imediatamente após `<meta charset="utf-8">`:**

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

**Snippet 2 — logo após a tag `<body>`:**

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

Substitua `GTM-XXXXXXX` pelo seu ID real nos dois lugares. Para rastrear também as páginas de artigo, repita os dois snippets em cada arquivo de `metodo/`.

---

## Adicionando Google Analytics 4 (GA4) diretamente — sem GTM

Caso prefira GA4 direto (sem GTM):

1. No [analytics.google.com](https://analytics.google.com), crie uma propriedade GA4 e obtenha o ID de medição (formato `G-XXXXXXXXXX`).
2. Cole no `<head>` do `index.html`, antes do fechamento `</head>`:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
<!-- End Google Analytics 4 -->
```

Substitua `G-XXXXXXXXXX` pelo seu ID real.

---

## Bump de versão dos assets

O CSS e JS usam parâmetro `?v=N` para bustar cache do browser. **Sempre que editar `styles.css`, `main.js`, `article.js` ou `safe-content.js`, incremente o número** nos arquivos que os referenciam.

No `index.html`:

```html
<link rel="stylesheet" href="assets/css/styles.css?v=27">
<script src="assets/js/main.js?v=13" defer></script>
```

Nas páginas de `metodo/` (caminhos relativos `../`):

```html
<link rel="stylesheet" href="../assets/css/styles.css?v=27">
<script src="../assets/js/main.js?v=13" defer></script>
<script src="../assets/js/article.js?v=3" defer></script>
```

> Como `styles.css` e `main.js` são compartilhados entre a landing e os artigos, mantenha o mesmo `?v=N` em todos os lugares ao editá-los.
