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
  const TARGET = 'https://www.seznam.cz';

  return `<!DOCTYPE html><html lang="cs">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Externí odkaz</title>
<meta name="robots" content="noindex,nofollow">
<style>
 body{font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0}
 #info{display:none;text-align:center;padding:1rem}
 button{padding:.8rem 1.6rem;font-size:1.1rem;border-radius:6px;border:none;background:#0066ff;color:#fff;cursor:pointer}
</style>
</head><body>
<h1>Pokračovat na externí stránku</h1>
<button id="goBtn">Potvrzuji věk 18+</button>
<div id="info">
  <p>Nepodařilo se otevřít externí prohlížeč.<br>
     V Instagramu klepni na <strong>⋮</strong> a zvol
     <em>„Otevřít v prohlížeči“</em>.</p>
</div>
<script>
(() => {
  const URL_TARGET   = ${JSON.stringify(TARGET)};
  const UA           = navigator.userAgent || '';
  const isiOS        = /iP(hone|od|ad)/i.test(UA);
  const isAndroid    = /Android/i.test(UA);
  const isInstagram  = /Instagram/i.test(UA);

  /* --- Fallbacky --- */
  const tryGoogleChromeScheme = url => {
    if (!isiOS && !isAndroid) return false;
    const schemeUrl = isiOS
      ? 'googlechrome://' + url.replace(/^https?:\\/\\//,'')
      : url.replace(/^https?:\\/\\/,'googlechrome://');
    return !!window.open(schemeUrl, '_blank', 'noopener,noreferrer');
  };

  const tryFirefoxScheme = url => {
    if (!isiOS && !isAndroid) return false;
    const schemeUrl = isiOS
      ? 'firefox://open-url?url=' + encodeURIComponent(url)
      : 'intent://' + url.replace(/^https?:\\/\\//,'') + '#Intent;scheme=https;package=org.mozilla.firefox;end';
    return !!window.open(schemeUrl, '_blank', 'noopener,noreferrer');
  };

  const tryShareSheet = async url => {
    if (!navigator.share) return false;
    try { await navigator.share({ url }); return true; }
    catch { return false; }
  };

  const kickOut = async url => {
    /* 1) standard */
    const w = window.open(url, '_blank', 'noopener,noreferrer');
    if (w) return;

    /* 2) Android intent (již podporováno Safari‑grade) */
    if (isAndroid) {
      const { host, pathname } = new URL(url);
      if (window.open(\`intent://\${host}\${pathname}#Intent;scheme=https;package=com.android.chrome;end\`,
                      '_blank','noopener,noreferrer')) return;
    }

    /* 3) explicit schemes */
    if (tryGoogleChromeScheme(url) || tryFirefoxScheme(url)) return;

    /* 4) Share sheet */
    if (await tryShareSheet(url)) return;

    /* 5) fallback uvnitř WebView */
    document.getElementById('info').style.display = 'block';
  };

  document.getElementById('goBtn').addEventListener('click', e => {
    e.preventDefault();
    isInstagram ? kickOut(URL_TARGET) : (location.href = URL_TARGET);
  });
})();
</script>
</body></html>`;
}
