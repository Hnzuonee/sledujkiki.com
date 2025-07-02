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
  <p>Pokud stále vidíš tuto zprávu, klepni v Instagramu na <strong>⋮</strong> vpravo nahoře<br>
     a zvol <em>„Otevřít v prohlížeči / Open in Browser“</em>.</p>
</div>

<script>
(() => {
  const URL_TARGET = ${JSON.stringify(TARGET)};
  const UA        = navigator.userAgent || '';
  const isiOS     = /iP(hone|od|ad)/i.test(UA);
  const isAndroid = /Android/i.test(UA);
  const isIG      = /Instagram/i.test(UA);

  /* ---------- Fallbacky ---------- */
  const tryWindowOpen = u => !!window.open(u, '_blank', 'noopener,noreferrer');

  const tryAndroidIntent = u => {
    if (!isAndroid) return false;
    const { host, pathname } = new URL(u);
    return !!window.open(\`intent://\${host}\${pathname}#Intent;scheme=https;package=com.android.chrome;end\`,
                         '_blank','noopener,noreferrer');
  };

  const tryChromeScheme = u => {
    const schemeUrl = isiOS
      ? 'googlechrome://' + u.replace(/^https?:\\/\\//,'')
      : u.replace(/^https?:\\/\\//,'googlechrome://');
    return !!window.open(schemeUrl, '_blank', 'noopener,noreferrer');
  };

  const tryFirefoxScheme = u => {
    const schemeUrl = isiOS
      ? 'firefox://open-url?url=' + encodeURIComponent(u)
      : 'intent://' + u.replace(/^https?:\\/\\//,'') + '#Intent;scheme=https;package=org.mozilla.firefox;end';
    return !!window.open(schemeUrl, '_blank', 'noopener,noreferrer');
  };

  const tryShareSheet = async u => {
    if (!navigator.share) return false;
    try { await navigator.share({ url: u }); return true; }
    catch { return false; }
  };

  const showHelp = () => document.getElementById('info').style.display = 'block';

  const kickOut = async u => {
    /* 1) standard */
    if (tryWindowOpen(u)) return;

    /* 2) Android intent */
    if (tryAndroidIntent(u)) return;

    /* 3) explicit browser schemes */
    if (tryChromeScheme(u) || tryFirefoxScheme(u)) return;

    /* 4) Share‑sheet */
    if (await tryShareSheet(u)) return;

    /* 5) poslední možnost – otevřeme URL přímo ve WebView + zobrazíme návod */
    location.href = u;
    showHelp();
  };

  document.getElementById('goBtn').addEventListener('click', e => {
    e.preventDefault();
    isIG ? kickOut(URL_TARGET) : (location.href = URL_TARGET);
  });
})();
</script>
</body></html>`;
}
