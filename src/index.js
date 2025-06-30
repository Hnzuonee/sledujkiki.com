// src/index.js - Finální verze se server-side redirectem

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // ROUTER: Rozhodne, co se má stát podle cesty v URL
    // Pokud je cesta "/go", spustí přesměrování
    if (url.pathname === '/go') {
      return handleRedirect(url);
    }
    
    // Pro všechny ostatní cesty (včetně hlavní stránky "/") zobrazí rozcestník
    return serveLandingPage();
  },
};

/**
 * Zpracuje požadavek na přesměrování.
 * Vezme cílovou URL z parametru a vrátí HTTP 302 Redirect.
 */
function handleRedirect(url) {
  const destinationUrl = url.searchParams.get('url');

  // Bezpečnostní kontrola: pokud URL chybí nebo je neplatná, přesměrujeme na hlavní stránku
  if (!destinationUrl) {
    return Response.redirect(url.origin, 302);
  }
  
  try {
    // Ověříme, že je URL validní
    new URL(destinationUrl);
  } catch (e) {
    console.error("Neplatná URL pro přesměrování:", destinationUrl);
    return Response.redirect(url.origin, 302);
  }

  // Toto je to "kouzlo". Vrátíme autoritativní přesměrování ze serveru.
  return Response.redirect(destinationUrl, 302);
}

/**
 * Zobrazí hlavní stránku (rozcestník).
 */
function serveLandingPage() {
  const html = `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="utf-8" />
    <title>Jméno Tvůrce</title>
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    <style>
      :root{--background-color:#000;--text-color:#fff;--container-bg:#111;--link-bg:#222;--link-hover-bg:#333;--button-light-bg:#e0e0e0;--button-action-bg:#007bff}body{background-color:var(--background-color);color:var(--text-color);font-family:'Poppins',sans-serif;display:flex;justify-content:center;align-items:flex-start;min-height:100vh;margin:0;padding:20px 10px;box-sizing:border-box}.wrapper{width:100%;max-width:680px;position:relative;z-index:1}.container{display:flex;flex-direction:column;align-items:center;text-align:center;padding:40px 20px;background-color:var(--container-bg);border-radius:24px;border:1px solid #333}.propic{width:96px;height:96px;border-radius:50%;object-fit:cover;margin-bottom:16px}.title-wrapper{display:flex;align-items:center;gap:8px;margin-bottom:4px}.title{font-size:24px;font-weight:700;margin:0}.paragraph{font-size:16px;color:#b0b0b0;margin:0 0 32px 0}.link-list{width:100%;display:flex;flex-direction:column;gap:16px}.link{display:flex;align-items:center;padding:12px 16px;background-color:var(--link-bg);border-radius:12px;text-decoration:none;color:var(--text-color);transition:background-color .2s,transform .2s;cursor:pointer}.link:hover{background-color:var(--link-hover-bg);transform:scale(1.02)}.link .icon{width:32px;height:32px;margin-right:16px;object-fit:contain}.link .label{flex-grow:1;text-align:left;font-weight:700}.link .arrow{font-family:'Arial'}
    </style>
</head>
<body>
    <div class="wrapper">
      <div class="container">
        <img src="https://i.pravatar.cc/150" class="propic">
        <div class="title-wrapper"><h1 class="title">Testovací Tvůrce</h1></div>
        <p class="paragraph">Testování server-side redirectu</p>
        <div class="link-list">
          
          <a class="link" href="/go?url=https%3A%2F%2Fwww.seznam.cz">
            <img src="https://logotip.us/wp-content/uploads/2021/01/seznam-cz-logo.png" class="icon">
            <div class="label">Testovací odkaz (Seznam.cz)</div><div class="arrow">›</div>
          </a>
          
          <a class="link" href="/go?url=https%3A%2F%2Fwww.google.com">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" class="icon">
            <div class="label">Druhý test (Google.com)</div><div class="arrow">›</div>
          </a>
          
          </div>
      </div>
    </div>
</body>
</html>
  `;
  return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } });
}
