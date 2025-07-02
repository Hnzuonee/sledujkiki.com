/**
 * Cloudflare Worker – rozcestník s popupem a „kick‑out z Instagramu“
 * ---------------------------------------------------------------
 *   • obsluhuje kořen /  i cestu /go
 *   • HTML je přímo v funkci html()
 *   • URL adresy měň pouze v atributech  data‑target="..."  nebo  href="..."
 */

export default {
  async fetch(req) {
    const path = new URL(req.url).pathname;
    if (path === '/' || path === '/go') {
      return new Response(html(), {
        headers: {
          'content-type': 'text/html;charset=utf-8',
          'cache-control': 'public, max-age=0, must-revalidate'
        }
      });
    }
    return new Response('Not found', { status: 404 });
  }
};

function html () {
  /* ▼ Defaultní URL pro test; reálně se používají data‑target dole v HTML ▼ */
  const TARGET = 'https://example.com';

  /* - - -  Začátek HTML - - - */
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="utf-8" />
  <title>Eva Menta</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />

  <!-- Vzhled (ponecháno z originálu) -->
  <link rel="stylesheet" href="https://minisoft-cdn.pages.dev/sw/css/normalize.css">
  <link rel="stylesheet" href="https://minisoft-cdn.pages.dev/sw/css/custom.css">
  <link rel="stylesheet" href="https://minisoft-cdn.pages.dev/sw/css/components.css">
  <link rel="stylesheet" href="https://minisoft-cdn.pages.dev/sw/css/swsites.css">
  <link rel="icon" href="https://minisoft-cdn.pages.dev/sw/images/favicon.png" type="image/png">

  <style>
    /* drobná lokální úprava fallback‑hlášky (není v externím CSS) */
    #help-msg{display:none;text-align:center;padding:1rem;font-size:.9rem;color:#555}
  </style>
</head>

<body>
<main class="wrapper">
  <div class="pattern"></div>
  <div class="container">
    <img class="propic" src="https://minisoft-cdn.pages.dev/sw/images/eva.webp" alt="Profilová fotka">
    <div class="title-wrapper">
      <h1 class="title">Eva&nbsp;Menta</h1>
      <img class="badge" src="https://minisoft-cdn.pages.dev/sw/images/badge.svg" alt="">
    </div>
    <p class="paragraph">Modelka <span class="_2nd-paragraph">&amp;</span> digitální tvůrkyně</p>

    <!-- GRID odkazů -->
    <div class="w-layout-grid link-list">

      <!-- ONLYFANS (popup) -->
      <div class="link focus" open-popup="true">
        <div class="popup">
          <div class="popup-content">
            <h1 class="popup-title">Citlivý obsah</h1>
            <p class="popup-desc">Tento odkaz může vést k obsahu, který není vhodný pro všechny uživatele.</p>
            <div class="button-wrapper">
              <a href="#" class="button light w-button" close-popup="true">Zpět</a>
              <a href="#" class="button w-button continue-btn"
                 data-target="https://onlyfans.com/jentvojekiks">Pokračovat</a>
            </div>
          </div>
        </div>
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/onlyfans.webp" alt="">
        <div class="label">Exkluzivní obsah</div>
        <div class="arrow focus"></div>
      </div>

      <!-- TELEGRAM (popup) -->
      <div class="link" open-popup="true">
        <div class="popup">
          <div class="popup-content">
            <h1 class="popup-title">Citlivý obsah</h1>
            <p class="popup-desc">Tento odkaz může vést k obsahu, který není vhodný pro všechny uživatele.</p>
            <div class="button-wrapper">
              <a href="#" class="button light w-button" close-popup="true">Zpět</a>
              <a href="#" class="button w-button continue-btn"
                 data-target="YOUR_TELEGRAM_URL_HERE">Pokračovat</a>
            </div>
          </div>
        </div>
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/telegram.webp" alt="">
        <div class="label">Telegram</div>
        <div class="arrow"></div>
      </div>

      <!-- TIKTOK (bez popupu) -->
      <a class="link w-inline-block" href="YOUR_TIKTOK_URL_HERE">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/tiktok.webp" alt="">
        <div class="label">TikTok</div>
        <div class="arrow"></div>
      </a>

      <!-- TWITTER (popup) -->
      <div class="link" open-popup="true">
        <div class="popup">
          <div class="popup-content">
            <h1 class="popup-title">Citlivý obsah</h1>
            <p class="popup-desc">Tento odkaz může vést k obsahu, který není vhodný pro všechny uživatele.</p>
            <div class="button-wrapper">
              <a href="#" class="button light w-button" close-popup="true">Zpět</a>
              <a href="#" class="button w-button continue-btn"
                 data-target="YOUR_TWITTER_URL_HERE">Pokračovat</a>
            </div>
          </div>
        </div>
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/twitter.webp" alt="">
        <div class="label">Twitter</div>
        <div class="arrow"></div>
      </div>

      <!-- FACEBOOK (bez popupu) -->
      <a class="link w-inline-block" href="YOUR_FACEBOOK_URL_HERE">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/facebook.svg" alt="">
        <div class="label">Facebook</div>
        <div class="arrow"></div>
      </a>

    </div>
  </div>
</main>

<!-- fallback návod -->
<div id="help-msg">
  Pokud stále vidíš tuto stránku, klepni v Instagramu na <strong>⋮</strong> a zvol
  <em>„Otevřít v prohlížeči / Open in Browser“</em>.
</div>

<!-- jQuery + původní skripty (pro animace) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script src="https://minisoft-cdn.pages.dev/sw/js/swsites.js"></script>
<script src="https://minisoft-cdn.pages.dev/sw/js/scripts.js"></script>

<!-- Kick‑out logika -->
<script>
(() => {
  const UA        = navigator.userAgent || '';
  const isiOS     = /iP(hone|od|ad)/i.test(UA);
  const isAndroid = /Android/i.test(UA);
  const isIG      = /Instagram/i.test(UA);

  const tryOpen = (url, build) => !!window.open(build(url), '_blank', 'noopener,noreferrer');

  const kickOut = async url => {
    if (tryOpen(url, u => u)) return;                                                     // standard
    if (isAndroid && tryOpen(url, u => \`intent://\${new URL(u).host}\${new URL(u).pathname}#Intent;scheme=https;package=com.android.chrome;end\`)) return;
    if (tryOpen(url, u => isiOS ? 'googlechrome://' + u.replace(/^https?:\\/\\//,'') : u.replace(/^https?:\\/\\//,'googlechrome://'))) return;
    if (tryOpen(url, u => isiOS ? 'firefox://open-url?url=' + encodeURIComponent(u) : 'intent://' + u.replace(/^https?:\\/\\//,'') + '#Intent;scheme=https;package=org.mozilla.firefox;end')) return;
    if (navigator.share) { try { await navigator.share({url}); return; } catch(e){} }

    // poslední fallback – zůstaneme v IG
    location.href = url;
    document.getElementById('help-msg').style.display = 'block';
  };

  // popup show/hide
  $(document).on('click','[open-popup]',function(){ $(this).find('.popup').fadeIn(200); });
  $(document).on('click','[close-popup]',function(e){ e.preventDefault(); $(this).closest('.popup').fadeOut(200); });

  // tlačítko „Pokračovat“
  $(document).on('click','.continue-btn',function(e){
    e.preventDefault();
    const url = $(this).data('target') || '${TARGET}';
    $(this).closest('.popup').fadeOut(150);
    isIG ? kickOut(url) : location.href = url;
  });
})();
</script>
</body>
</html>`;
  /* - - -  Konec HTML - - - */
}
