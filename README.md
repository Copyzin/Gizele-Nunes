# Gizele Nunes — Advocacia da Saúde

Landing page estática do **Método SAFE** — proteção jurídica aplicada ao consultório odontológico.

Desenvolvido por [Almeida Escala Digital](https://almeidaescaladigital.com/).

---

## Estrutura de arquivos

```
index.html
assets/
  css/
    styles.css          # todos os estilos customizados
  js/
    main.js             # GSAP, scroll, menu, WhatsApp widget
  images/
    gizele-hero.jpg     # foto principal (hero)
    gizele-sobre.png    # foto da seção Sobre
    logo-icon.png       # monograma GN (usado como favicon e marca d'água)
    og-image.png        # imagem de compartilhamento social (1200×630)
    selo-safe.svg       # selo ornamental Método SAFE
```

---

## Pendências antes de ir ao ar

Procure pelos comentários `<!-- TODO -->` no `index.html`. Os itens são:

| Campo | Onde substituir | Exemplo |
|---|---|---|
| Número do WhatsApp | Todos os links `wa.me/...` | `5511987654321` |
| OAB | Credencial no rodapé da hero | `OAB/SP 123.456` |
| Anos de atuação | Credencial no rodapé da hero | `8 anos` |
| E-mail | Rodapé, link `mailto:` | `contato@gizelenunes.adv.br` |
| Domínio absoluto | Tags `og:url`, `og:image`, `twitter:image` no `<head>` | `https://gizelenunes.adv.br` |

---

## Deploy

### GitHub Pages (gratuito)

1. No repositório do GitHub, vá em **Settings → Pages**
2. Em **Branch**, selecione `main` e pasta `/ (root)`
3. Clique em **Save**
4. O site fica disponível em `https://Copyzin.github.io/Gizele-Nunes/`

> Para usar domínio próprio (ex: `gizelenunes.adv.br`), adicione um arquivo `CNAME` na raiz com o domínio, e configure um registro DNS tipo `A` apontando para os IPs do GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).

### Hospedagem estática (Hostinger, Vercel, Netlify, etc.)

O projeto é 100% estático — sem servidor, sem build. Basta fazer upload da pasta inteira:

**Vercel / Netlify:** conecte este repositório GitHub, framework = "Other" (nenhum), publish directory = `/` (raiz). Deploy automático a cada push.

**Hostinger / cPanel:** compacte todos os arquivos e faça upload via Gerenciador de Arquivos para a pasta `public_html`. Ou use FTP com o FileZilla.

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

Substitua `GTM-XXXXXXX` pelo seu ID real nos dois lugares.

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

O CSS e JS usam parâmetro `?v=N` para bustar cache do browser. Sempre que editar `styles.css` ou `main.js`, incremente o número no `index.html`:

```html
<link rel="stylesheet" href="assets/css/styles.css?v=14">
<script src="assets/js/main.js?v=6" defer></script>
```
