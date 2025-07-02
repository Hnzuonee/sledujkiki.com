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
    <img class="propic" src="https://minisoft-cdn.pages.dev/sw/images/eva.webp" alt="">
    <div class="title-wrapper"><h1 class="title">Kiki&nbsp;Booo</h1><img class="badge" src="https://minisoft-cdn.pages.dev/sw/images/badge.svg"></div>
    <p class="paragraph">Modelka <span class="_2nd-paragraph">&amp;</span> digitální tvůrkyně</p>

    <div class="w-layout-grid link-list">
      <!-- ONLYFANS -->
      <div class="link focus" open-popup="true">
        <div class="popup">
          <div class="popup-content">
            <h1 class="popup-title">Citlivý obsah</h1>
            <p class="popup-desc">Tento odkaz může vést k&nbsp;obsahu 18&nbsp;+.</p>
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

      <!-- Přímé odkazy -->
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

<div id="help-msg" style="display:none;text-align:center;padding:1rem;font-size:.9rem;color:#555">
  Pokud stále vidíš tuto stránku, klepni v Instagramu na <strong>⋮</strong> a vyber
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

  /* ---------- universální open helper ---------- */
  function clickAnchor(url){
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
    return document.visibilityState === 'hidden';
  }

  /* ---------- schémata ---------- */
  const intent = (u,pkg)=>
    'intent://'+u.replace(/^https?:\\/\\//,'')+
    '#Intent;scheme=https;package='+pkg+';end';

  const android = {
    chrome:   u=>intent(u,'com.android.chrome'),
    edge:     u=>intent(u,'com.microsoft.emmx'),
    brave:    u=>intent(u,'com.brave.browser'),
    firefox:  u=>intent(u,'org.mozilla.firefox'),
    opera:    u=>intent(u,'com.opera.browser'),
    ddg:      u=>intent(u,'com.duckduckgo.mobile.android')
  };

  const ios = {
    chrome:  u=>'googlechrome://'+u.replace(/^https?:\\/\\//,''),
    edge:    u=>'microsoft-edge-http://'+u.replace(/^https?:\\/\\//,''),
    brave:   u=>'brave://open-url?url='+encodeURIComponent(u),
    firefox: u=>'firefox://open-url?url='+encodeURIComponent(u)
  };

  async function kickOut(url){
    /* 0) anchor trick */
    if (clickAnchor(url)) return;

    /* 1) Android intenty */
    if (isAndroid){
      for (const fn of Object.values(android)) if (clickAnchor(fn(url))) return;
    }

    /* 2) iOS custom schemes */
    if (isiOS){
      for (const fn of Object.values(ios)) if (clickAnchor(fn(url))) return;
    }

    /* 3) share‑sheet as fallback */
    if (navigator.share){
      try { await navigator.share({url}); return; } catch{}
    }

    /* 4) WebView fallback */
    location.href = url;
    document.getElementById('help-msg').style.display='block';
  }

  /* ---------- popup & link handlers ---------- */
  $(document).on('click','[open-popup]',function(){ $(this).find('.popup').fadeIn(180); });
  $(document).on('click','[close-popup]',function(e){ e.preventDefault(); e.stopPropagation(); $(this).closest('.popup').fadeOut(180); });

  $(document).on('click','.continue-btn',function(e){
    e.preventDefault(); e.stopPropagation();
    kickOut(this.dataset.target || '${FALLBACK_URL}');
    $(this).closest('.popup').fadeOut(150);
  });

  $(document).on('click','a.link:not([open-popup])',function(e){
    if (isIG){ e.preventDefault(); kickOut(this.href); }
  });
})();
</script>
</body>
</html>`;
}
