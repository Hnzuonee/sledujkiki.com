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
    <div class="title-wrapper"><h1 class="title">Kiki Booo</h1><img class="badge" src="https://minisoft-cdn.pages.dev/sw/images/badge.svg"></div>
    <p class="paragraph">Modelka <span class="_2nd-paragraph">&</span> digitální tvůrkyně</p>

    <div class="w-layout-grid link-list">
      <!-- ONLYFANS -->
      <div class="link focus" open-popup="true">
        <div class="popup">
          <div class="popup-content">
            <h1 class="popup-title">Citlivý obsah</h1>
            <p class="popup-desc">Tento odkaz může vést k obsahu 18 +.</p>
            <div class="button-wrapper">
              <a href="#" class="button light w-button" close-popup="true">Zpět</a>
              <!-- URL měň jen v href -->
              <a class="button w-button continue-link" target="_blank"
                 href="https://onlyfans.com/test">Pokračovat</a>
            </div>
          </div>
        </div>
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/onlyfans.webp">
        <div class="label">Exkluzivní obsah</div><div class="arrow focus"></div>
      </div>

      <!-- Další odkazy – zůstávají standardní -->
      <a class="link w-inline-block" href="https://t.me/+E-WSR-s-L1EyOTNk" target="_blank">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/telegram.webp"><div class="label">Telegram</div><div class="arrow"></div>
      </a>
      <a class="link w-inline-block" href="https://vm.tiktok.com/ZM8fMyYuU/" target="_blank">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/tiktok.webp"><div class="label">TikTok</div><div class="arrow"></div>
      </a>
      <a class="link w-inline-block" href="https://twitter.com/evamenta1" target="_blank">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/twitter.webp"><div class="label">Twitter</div><div class="arrow"></div>
      </a>
      <a class="link w-inline-block" href="https://facebook.com/EvaMentaa" target="_blank">
        <img class="icon" src="https://minisoft-cdn.pages.dev/sw/images/facebook.svg"><div class="label">Facebook</div><div class="arrow"></div>
      </a>
    </div>
  </div>
</main>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script src="https://minisoft-cdn.pages.dev/sw/js/swsites.js"></script>
<script src="https://minisoft-cdn.pages.dev/sw/js/scripts.js"></script>

<script>
(() => {
  const UA        = navigator.userAgent || '';
  const isAndroid = /Android/i.test(UA);
  const isIOS     = /iPad|iPhone|iPod/.test(UA) && !window.MSStream;
  const isIG      = /Instagram/i.test(UA);

  /* cílený kick‑out jen pro Android‑IG */
  const kickOutAndroid = url => {
    const intent = 'intent://' + url.replace(/^https?:\/\//,'')
                 + '#Intent;scheme=https;package=com.android.chrome;end';
    window.location.href = intent;
  };

  /* kick-out pro iOS-IG do Chrome, pokud nainstalován */
  const kickOutIOSChrome = url => {
    const chromeScheme = (url.startsWith('https') ? 'googlechromes' : 'googlechrome') 
                       + '://' + url.replace(/^https?:\/\//, '');
    window.location.href = chromeScheme;
  };

  /* fallback pro Safari na iOS (explicitní scheme) */
  const kickOutIOSSafari = url => {
    window.location.href = 'x-safari-https://' + url.replace(/^https?:\/\//, '');
  };

  /* nový fallback: dummy download pro vykopnutí do externího browseru */
  const kickOutDummyDownload = url => {
    // Vytvoř dummy link s downloadem (in-app browser často nemůže handleovat downloads)
    const link = document.createElement('a');
    link.href = 'data:application/octet-stream;base64,QUJDREVGRw==';  // Dummy base64 data
    link.download = 'redirect.dummy';  // Atribut download
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();  // Simuluj klik
    document.body.removeChild(link);
    
    // Po download pokusu redirect na cílovou URL (pro případ, že download selže)
    setTimeout(() => {
      window.location.href = url;
    }, 500);  // Krátký delay
  };

  /* popup show/hide pomocí původních dat‑atributů */
  $(document).on('click','[open-popup]',function(){ $(this).find('.popup').fadeIn(200); });
  $(document).on('click','[close-popup]',function(e){ e.preventDefault(); e.stopPropagation(); $(this).closest('.popup').fadeOut(200); });

  /* klik na "Pokračovat" */
  $(document).on('click','.continue-link',function(e){
    const targetUrl = this.href;
    if (isAndroid && isIG){
      e.preventDefault(); e.stopPropagation();
      kickOutAndroid(targetUrl);
      $(this).closest('.popup').fadeOut(150);
    } else if (isIOS && isIG) {
      e.preventDefault(); e.stopPropagation();
      // Nejdřív Chrome scheme
      kickOutIOSChrome(targetUrl);
      // Pak Safari scheme
      setTimeout(() => {
        kickOutIOSSafari(targetUrl);
      }, 800);
      // Ultimate fallback: dummy download + redirect
      setTimeout(() => {
        kickOutDummyDownload(targetUrl);
      }, 1600);
      $(this).closest('.popup').fadeOut(150);
    }
    /* Ostatní: normálně otevřít v _blank */
  });
})();
</script>
</body>
</html>`;
}
