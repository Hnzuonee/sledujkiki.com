<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>18+ potvrzení</title>
<style>
  body{font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0}
  #info{display:none;text-align:center;padding:1rem}
  button{padding:.8rem 1.6rem;font-size:1.1rem;border-radius:6px;border:none;background:#0066ff;color:#fff;cursor:pointer}
</style>
</head>
<body>

<h1>Pokračovat na externí stránku 18+</h1>
<button id="goBtn">Potvrzuji věk 18+</button>

<div id="info">
    <p>Nepodařilo se otevřít externí prohlížeč.&nbsp;<br>
    V Instagramu klepni na <strong>⋮</strong> vpravo nahoře a zvol <em>„Open in Browser / Otevřít v prohlížeči“</em>.</p>
</div>

<script>
(() => {

  const TARGET_URL = "https://onlyfans.com/___TVŮRCE___";  // ← sem tvou cílovou URL

  const isInstagram = () => /Instagram/i.test(navigator.userAgent);

  const openFallbackIntent = url => {
    // Android intent do Chrome
    if (!/Android/i.test(navigator.userAgent)) return false;
    const host = new URL(url);
    const intentURL = `intent://${host.host}${host.pathname}#Intent;scheme=https;package=com.android.chrome;end`;
    return !!window.open(intentURL, '_blank', 'noopener,noreferrer');
  };

  const attemptOpen = url => {
    let success = false;

    // 1) primární pokus
    const newWin = window.open(url, '_blank', 'noopener,noreferrer');
    success = !!newWin;

    // 2) fallback – přepsat location po krátkém delay
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        // 3) Android intent fallback
        const ok = openFallbackIntent(url);
        if (!ok) {
          window.location.href = url;  // může zůstat uvnitř IG, ale je to další šance
        }
      }
    }, 100);

    // 4) poslední kontrola – po 1 s ještě viditelná => ukaž instrukce
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        document.getElementById('info').style.display = 'block';
      }
    }, 1000);
  };

  document.getElementById('goBtn').addEventListener('click', e => {
    e.preventDefault();
    if (isInstagram()) {
      attemptOpen(TARGET_URL);
    } else {
      // mimo IG stačí normální redirect
      window.location.href = TARGET_URL;
    }
  });

})();
</script>
</body>
</html>
