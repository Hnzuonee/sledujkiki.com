export default {
  async fetch(request) {
    const u = new URL(request.url);
    if (u.pathname === '/go') {
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

function html() {
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
     V Instagramu klepni na <strong>⋮</strong> a zvol
     <em>„Otevřít v prohlížeči“</em>.</p>
</div>
<script>
(() => {
  const TARGET_URL = ${JSON.stringify(TARGET)};
  const isIG = () => /Instagram/i.test(navigator.userAgent);
  const intent = u => {
    if (!/Android/i.test(navigator.userAgent)) return false;
    const { host, pathname } = new URL(u);
    return !!window.open(\`intent://\${host}\${pathname}#Intent;scheme=https;package=com.android.chrome;end\`,
                         '_blank','noopener,noreferrer');
  };
  const kick = u => {
    const w = window.open(u,'_blank','noopener,noreferrer');
    setTimeout(()=>{ if(document.visibilityState==='visible'){ if(!intent(u)) location.href=u; }},100);
    setTimeout(()=>{ if(document.visibilityState==='visible') document.getElementById('info').style.display='block';},1000);
  };
  document.getElementById('goBtn').onclick=e=>{
    e.preventDefault(); isIG()?kick(TARGET_URL):location.replace(TARGET_URL);
  };
})();
</script></body></html>`;
}
