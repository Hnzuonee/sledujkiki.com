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
  const FALLBACK_URL = 'https://instagram.com';

return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="utf-8" />
  <title>Kiki</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />

  <!-- Původní CSS -->
  <link rel="stylesheet" href="https://minisoft-cdn.pages.dev/sw/css/normalize.css">
  <link rel="stylesheet" href="https://minisoft-cdn.pages.dev/sw/css/custom.css">
  <link rel="stylesheet" href="https://minisoft-cdn.pages.dev/sw/css/components.css">
  <link rel="stylesheet" href="https://minisoft-cdn.pages.dev/sw/css/swsites.css">
  <link rel="icon" href="https://minisoft-cdn.pages.dev/sw/images/favicon.png" type="image/png">
</head>

<body>
<main class="wrapper">
  <div class="pattern"></div>
  <div class="container">
    <!-- ↓ profilovku nahraď vlastní URL nebo data‑URI -->
    <img class="propic" src="https://minisoft-cdn.pages.dev/sw/images/eva.webp" alt="Profilová fotka">
    <div class="title-wrapper">
      <h1 class="title">Kiki&nbsp;Booo</h1>
      <img class="badge" src="https://minisoft-cdn.pages.dev/sw/images/badge.svg" alt="">
    </div>
    <p class="paragraph">Modelka <span class="_2nd-paragraph">&amp;</span> digitální tvůrkyně</p>

    <div class="w-layout-grid link-list">

      <!-- ONLYFANS (s age‑gate) -->
      <div class="link focus" open-popup="true">
        <div class="popup">
          <div class="popup-content">
            <h1 class="popup-title">Citlivý obsah</h1>
            <p class="popup-desc">Tento odkaz může vést k&nbsp;obsahu 18&nbsp;+.</p>
            <div class="button-wrapper">
              <a href="#" class="button light w-button" close-popup="true">Zpět</a>
              <a href="#" class="button w-button continue-btn"
                 data-target="https://onlyfans.com/jentvojekiks">Pokračovat</a>
            </div>
          </div>
        </div>
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/onlyfans.webp" alt="">
        <div class="label">Exkluzivní&nbsp;obsah</div>
        <div class="arrow focus"></div>
      </div>

      <!-- Ostatní odkazy (bez popupu) -->
      <a class="link w-inline-block" href="https://t.me/+E-WSR-s-L1EyOTNk">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/telegram.webp" alt="">
        <div class="label">Telegram</div><div class="arrow"></div>
      </a>

      <a class="link w-inline-block" href="https://vm.tiktok.com/ZM8fMyYuU/">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/tiktok.webp" alt="">
        <div class="label">TikTok</div><div class="arrow"></div>
      </a>

      <a class="link w-inline-block" href="https://twitter.com/evamenta1">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/twitter.webp" alt="">
        <div class="label">Twitter</div><div class="arrow"></div>
      </a>

      <a class="link w-inline-block" href="https://facebook.com/EvaMentaa">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/facebook.svg" alt="">
        <div class="label">Facebook</div><div class="arrow"></div>
      </a>
    </div>
  </div>
</main>

<!-- Fallback instrukce -->
<div id="help-msg" style="display:none;text-align:center;padding:1rem;font-size:.9rem;color:#555">
  Pokud stále vidíš tuto stránku, klepni v&nbsp;Instagramu na <strong>⋮</strong> a&nbsp;vyber
  <em>„Otevřít v&nbsp;prohlížeči“</em>.
</div>

<!-- jQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<!-- Skripty z původní šablony – zviditelní grid -->
<script src="https://minisoft-cdn.pages.dev/sw/js/swsites.js"></script>
<script src="https://minisoft-cdn.pages.dev/sw/js/scripts.js"></script>

<!-- Kick‑out & popup logika -->
<script>
(() => {
  const UA        = navigator.userAgent || '';
  const isiOS     = /iP(hone|od|ad)/i.test(UA);
  const isAndroid = /Android/i.test(UA);
  const isIG      = /Instagram/i.test(UA);

  const tryOpen = (url, fn) => !!window.open(fn(url), '_blank', 'noopener,noreferrer');

  async function kickOut(url){
    if (tryOpen(url,u=>u)) return;
    if (isAndroid && tryOpen(url,u=>\`intent://\${new URL(u).host}\${new URL(u).pathname}#Intent;scheme=https;package=com.android.chrome;end\`)) return;
    if (tryOpen(url,u=>isiOS ? 'googlechrome://'+u.replace(/^https?:\\/\\//,'') : u.replace(/^https?:\\/\\//,'googlechrome://'))) return;
    if (tryOpen(url,u=>isiOS ? 'firefox://open-url?url='+encodeURIComponent(u) : 'intent://'+u.replace(/^https?:\\/\\//,'')+'#Intent;scheme=https;package=org.mozilla.firefox;end')) return;
    if (navigator.share){ try{ await navigator.share({url}); return; }catch(e){} }
    location.href = url;
    document.getElementById('help-msg').style.display='block';
  }

  /* Popup show/hide */
  $(document).on('click','[open-popup]',function(){ $(this).find('.popup').fadeIn(180); });
  $(document).on('click','[close-popup]',function(e){ e.preventDefault(); $(this).closest('.popup').fadeOut(180); });

  /* Age‑gate pokračovat */
  $(document).on('click','.continue-btn',function(e){
    e.preventDefault();
    const url = this.dataset.target || this.getAttribute('href') || '${FALLBACK_URL}';
    $(this).closest('.popup').fadeOut(150);
    isIG ? kickOut(url) : location.href = url;
  });

  /* Přímé odkazy bez popupu */
  $(document).on('click','a.link:not([open-popup])',function(e){
    if (isIG){
      e.preventDefault();
      kickOut(this.href);
    }
  });
})();
</script>
</body>
</html>`;
}
