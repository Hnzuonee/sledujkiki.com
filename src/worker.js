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
  const FALLBACK_URL = 'https://instagram.com';   // nouzová záloha

return `<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="utf-8">
<title>Kiki</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<link rel="stylesheet" href="https://minisoft-cdn.pages.dev/sw/css/normalize.css">
<link rel="stylesheet" href="https://minisoft-cdn.pages.dev/sw/css/custom.css">
<link rel="stylesheet" href="https://minisoft-cdn.pages.dev/sw/css/components.css">
<link rel="stylesheet" href="https://minisoft-cdn.pages.dev/sw/css/swsites.css">
</head>
<body>
<main class="wrapper">
  <div class="pattern"></div>
  <div class="container">
    <img class="propic" src="https://minisoft-cdn.pages.dev/sw/images/eva.webp" alt="Profilová fotka">
    <div class="title-wrapper"><h1 class="title">Kiki Booo</h1><img class="badge" src="https://minisoft-cdn.pages.dev/sw/images/badge.svg"></div>
    <p class="paragraph">Modelka <span class="_2nd-paragraph">&amp;</span> digitální tvůrkyně</p>

    <div class="w-layout-grid link-list">
      <!-- ONLYFANS (jediný odkaz s age‑gate + kick‑out) -->
      <div class="link focus" open-popup="true">
        <div class="popup">
          <div class="popup-content">
            <h1 class="popup-title">Citlivý obsah</h1>
            <p class="popup-desc">Tento odkaz může vést k&nbsp;obsahu&nbsp;18&nbsp;+.</p>
            <div class="button-wrapper">
              <a href="#" class="button light w-button" close-popup="true">Zpět</a>
              <button type="button" class="button w-button continue-btn"
                      data-target="https://onlyfans.com/jentvojekiks">Pokračovat</button>
            </div>
          </div>
        </div>
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/onlyfans.webp">
        <div class="label">Exkluzivní obsah</div><div class="arrow focus"></div>
      </div>

      <!-- Ostatní odkazy (bez popupu, bez kick‑outu) -->
      <a class="link w-inline-block" href="https://t.me/+E-WSR-s-L1EyOTNk">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/telegram.webp">
        <div class="label">Telegram</div><div class="arrow"></div>
      </a>
      <a class="link w-inline-block" href="https://vm.tiktok.com/ZM8fMyYuU/">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/tiktok.webp">
        <div class="label">TikTok</div><div class="arrow"></div>
      </a>
      <a class="link w-inline-block" href="https://twitter.com/evamenta1">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/twitter.webp">
        <div class="label">Twitter</div><div class="arrow"></div>
      </a>
      <a class="link w-inline-block" href="https://facebook.com/EvaMentaa">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/facebook.svg">
        <div class="label">Facebook</div><div class="arrow"></div>
      </a>
    </div>
  </div>
</main>

<!-- fallback návod -->
<div id="help-msg" style="display:none;text-align:center;padding:1rem;font-size:.9rem;color:#555">
  Pokud stále vidíš tuto stránku, klepni v&nbsp;Instagramu na <strong>⋮</strong> a&nbsp;vyber
  <em>„Otevřít v&nbsp;prohlížeči“</em>.
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script src="https://minisoft-cdn.pages.dev/sw/js/swsites.js"></script>
<script src="https://minisoft-cdn.pages.dev/sw/js/scripts.js"></script>

<script>
(() => {
  /* ---------- detekce ---------- */
  const UA = navigator.userAgent || '';
  const isiOS = /iP(hone|od|ad)/i.test(UA);
  const isAndroid = /Android/i.test(UA);
  const isIG = /Instagram/i.test(UA);

  /* ---------- helpery ---------- */
  const tryOpen = (url, opts='') => !!window.open(url, '_blank', 'noopener,noreferrer,'+opts);

  const tryIntent = (url,pkg) =>
    tryOpen('intent://'+url.replace(/^https?:\\/\\//,'')+
            '#Intent;scheme=https;package='+pkg+';end');

  const tryScheme = (url,scheme) => tryOpen(scheme);

  const tryShare = async url => {
    if (!navigator.share) return false;
    try{ await navigator.share({url}); return true; }catch{ return false; }
  };

  async function kickOut(url){
    /* 1) standard */
    if (tryOpen(url)) return;

    /* 2) Android intent (Chrome) */
    if (isAndroid && tryIntent(url,'com.android.chrome')) return;

    /* 3) explicit schemes */
    if (isiOS && tryScheme(url,'googlechrome://'+url.replace(/^https?:\\/\\//,''))) return;
    if (tryIntent(url,'org.mozilla.firefox') ||
        tryIntent(url,'com.microsoft.emmx')  ||
        tryIntent(url,'com.brave.browser')) return;

    /* 4) share‑sheet */
    if (await tryShare(url)) return;

    /* 5) fallback inside WebView */
    location.href = url;
    document.getElementById('help-msg').style.display='block';
  }

  /* ---------- popup logika ---------- */
  document.querySelectorAll('[open-popup]').forEach(el=>{
    el.addEventListener('click',()=> el.querySelector('.popup').style.display='block');
  });
  document.querySelectorAll('[close-popup]').forEach(el=>{
    el.addEventListener('click',e=>{
      e.preventDefault(); e.stopPropagation();
      el.closest('.popup').style.display='none';
    });
  });

  /* ---------- tlačítko Pokračovat (ONLYFANS) ---------- */
  document.querySelector('.continue-btn').addEventListener('click',e=>{
    e.preventDefault(); e.stopPropagation();
    const url = e.currentTarget.dataset.target || '${FALLBACK_URL}';
    isIG ? kickOut(url) : window.open(url,'_blank','noopener,noreferrer');
    e.currentTarget.closest('.popup').style.display='none';
  });
})();
</script>
</body>
</html>`;
}
