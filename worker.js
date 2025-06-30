export default {
  async fetch (request, env, ctx) {
    // 1) jediná route: /go
    if (new URL(request.url).pathname === '/go') {
      const html = `
<!DOCTYPE html><html lang="cs">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>18+ potvrzení</title>
<style>body{font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0}#info{display:none;text-align:center;padding:1rem}button{padding:.8rem 1.6rem;font-size:1.1rem;border-radius:6px;border:none;background:#0066ff;color:#fff;cursor:pointer}</style>
</head>
<body>
<h1>Pokračovat na externí stránku 18+</h1>
<button id="goBtn">Potvrzuji věk 18+</button>
<div id="info">
  <p>Nepodařilo se otevřít externí prohlížeč.<br>
  V Instagramu klepni na <strong>⋮</strong> a zvol <em>„Otevřít v prohlížeči“</em>.</p>
</div>
<script>
// --- JS LOGIKA ---
(() => {
  const TARGET_URL = "https://onlyfans.com/TVURCE";               //  ← změň!
  const isIG = () => /Instagram/i.test(navigator.userAgent);

  const openIntent = url => {
    if (!/Android/i.test(navigator.userAgent)) return false;
    const u = new URL(url);
    return !!window.open(\`intent://\${u.host}\${u.pathname}#Intent;scheme=https;package=com.android.chrome;end\`,
                         '_blank','noopener,noreferrer');
  };

  const kickOut = url => {
    const win = window.open(url,'_blank','noopener,noreferrer');
    setTimeout(() => {
      if (document.visibilityState==='visible') {
        if (!openIntent(url)) window.location.href = url;
      }
    },100);
    setTimeout(()=>{if(document.visibilityState==='visible') document.getElementById('info').style.display='block';},1000);
  };

  document.getElementById('goBtn').onclick=e=>{
    e.preventDefault();
    isIG()?kickOut(TARGET_URL):location.assign(TARGET_URL);
  };
})();
</script></body></html>`;
      return new Response(html, {
        headers: { 'content-type': 'text/html;charset=utf-8' }
      });
    }

    // fallback 404
    return new Response('Not found', { status: 404 });
  }
}
