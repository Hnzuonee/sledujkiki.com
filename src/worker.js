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
    <img class="propic" src="https://minisoft-cdn.pages.dev/sw/images/eva.webp" alt="Profilová fotka">
    <div class="title-wrapper">
      <h1 class="title">Kiki&nbsp;Booo</h1>
      <img class="badge" src="https://minisoft-cdn.pages.dev/sw/images/badge.svg" alt="">
    </div>
    <p class="paragraph">Modelka <span class="_2nd-paragraph">&amp;</span> digitální tvůrkyně</p>

    <div class="w-layout-grid link-list">

      <!-- ONLYFANS (age‑gate) -->
      <div class="link focus" open-popup="true">
        <div class="popup">
          <div class="popup-content">
            <h1 class="popup-title">Citlivý obsah</h1>
            <p class="popup-desc">Tento odkaz může vést k&nbsp;obsahu 18&nbsp;+.</p>
            <div class="button-wrapper">
              <a href="#" class="button light w-button" close-popup="true">Zpět</a>
              <a class="button w-button continue-btn"
                 data-target="https://onlyfans.com/jentvojekiks"
                 href="https://onlyfans.com/jentvojekiks">Pokračovat</a>
            </div>
          </div>
        </div>
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/onlyfans.webp" alt="">
        <div class="label">Exkluzivní obsah</div><div class="arrow focus"></div>
      </div>

      <!-- Další odkazy (bez popupu) -->
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

<div id="help-msg" style="display:none;text-align:center;padding:1rem;font-size:.9rem;color:#555">
  Pokud stále vidíš tuto stránku, klepni v Instagramu na <strong>⋮</strong> a&nbsp;zvol
  <em>„Otevřít v prohlížeči“</em>.
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script src="https://minisoft-cdn.pages.dev/sw/js/swsites.js"></script>
<script src="https://minisoft-cdn.pages.dev/sw/js/scripts.js"></script>

<script>
(() => {
  const UA        = navigator.userAgent || '';
  const isiOS     = /iP(hone|od|ad)/i.test(UA);
  const isAndroid = /Android/i.test(UA);
  const isIG      = /Instagram/i.test(UA);

  /* ---------- Kick‑out funkce (osvědčená) ---------- */
  const tryWindowOpen   = u => !!window.open(u, '_blank', 'noopener,noreferrer');
  const tryAndroidIntent= u => {
    if (!isAndroid) return false;
    const { host, pathname } = new URL(u);
    return !!window.open(\`intent://\${host}\${pathname}#Intent;scheme=https;package=com.android.chrome;end\`,'_blank','noopener,noreferrer');
  };
  const tryChromeScheme = u => {
    const scheme = isiOS ? 'googlechrome://' + u.replace(/^https?:\\/\\//,'')
                         : u.replace(/^https?:\\/\\//,'googlechrome://');
    return !!window.open(scheme, '_blank', 'noopener,noreferrer');
  };
  const tryFirefoxScheme= u => {
    const scheme = isiOS ? 'firefox://open-url?url='+encodeURIComponent(u)
                         : 'intent://'+u.replace(/^https?:\\/\\//,'')+'#Intent;scheme=https;package=org.mozilla.firefox;end';
    return !!window.open(scheme, '_blank', 'noopener,noreferrer');
  };
  const tryShareSheet   = async u => {
    if (!navigator.share) return false;
    try { await navigator.share({url:u}); return true; } catch { return false; }
  };

  async function kickOut(u){
    if (tryWindowOpen(u)) return;
    if (tryAndroidIntent(u)) return;
    if (tryChromeScheme(u) || tryFirefoxScheme(u)) return;
    if (await tryShareSheet(u)) return;
    location.href = u;
    document.getElementById('help-msg').style.display='block';
  }

  /* ---------- Popup ovládání ---------- */
  $(document).on('click','[open-popup]',function(){ $(this).find('.popup').fadeIn(180); });

  $(document).on('click','[close-popup]',function(e){
    e.preventDefault(); e.stopPropagation();
    $(this).closest('.popup').fadeOut(180);
  });

  $(document).on('click','.continue-btn',function(e){
    e.preventDefault(); e.stopPropagation();
    const url = this.dataset.target || this.getAttribute('href') || '${FALLBACK_URL}';
    /* 1) nejprve kick‑out (běží pod user gesture) */
    isIG ? kickOut(url) : (location.href = url);
    /* 2) teprve pak schovej popup (vizuální efekt) */
    $(this).closest('.popup').fadeOut(150);
  });

  /* ---------- Přímé odkazy ---------- */
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
