// src/index.js - Finální pokus s "Interaction Priming"

export default {
  async fetch(request) {
    // Server-side redirect logika zůstává stejná
    const url = new URL(request.url);
    if (url.pathname === '/go') {
      const destinationUrl = url.searchParams.get('url');
      if (destinationUrl) {
        try {
          new URL(destinationUrl);
          return Response.redirect(destinationUrl, 302);
        } catch (e) { /* Neplatná URL, vrátí se na hlavní stránku */ }
      }
      return Response.redirect(url.origin, 302);
    }
    return serveLandingPage();
  },
};

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
      :root{--background-color:#000;--text-color:#fff;--container-bg:#111;--link-bg:#222;--link-hover-bg:#333;--button-light-bg:#e0e0e0;--button-action-bg:#007bff}body{background-color:var(--background-color);color:var(--text-color);font-family:'Poppins',sans-serif;display:flex;justify-content:center;align-items:flex-start;min-height:100vh;margin:0;padding:20px 10px;box-sizing:border-box}.wrapper{width:100%;max-width:680px;position:relative;z-index:1}.container{display:flex;flex-direction:column;align-items:center;text-align:center;padding:40px 20px;background-color:var(--container-bg);border-radius:24px;border:1px solid #333}.propic{width:96px;height:96px;border-radius:50%;object-fit:cover;margin-bottom:16px}.title-wrapper{display:flex;align-items:center;gap:8px;margin-bottom:4px}.title{font-size:24px;font-weight:700;margin:0}.paragraph{font-size:16px;color:#b0b0b0;margin:0 0 32px 0}.link-list{width:100%;display:flex;flex-direction:column;gap:16px}.link{display:flex;align-items:center;padding:12px 16px;background-color:var(--link-bg);border-radius:12px;text-decoration:none;color:var(--text-color);transition:background-color .2s,transform .2s;cursor:pointer}.link:hover{background-color:var(--link-hover-bg);transform:scale(1.02)}.link .icon{width:32px;height:32px;margin-right:16px;object-fit:contain}.link .label{flex-grow:1;text-align:left;font-weight:700}.link .arrow{font-family:'Arial'}.popup-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.8);display:flex;justify-content:center;align-items:center;z-index:1000;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}.popup-overlay.visible{opacity:1;visibility:visible}.popup-content{background-color:#2c2c2e;padding:24px;border-radius:16px;text-align:center;max-width:320px;width:calc(100% - 40px);transform:scale(.9);transition:transform .3s}.popup-overlay.visible .popup-content{transform:scale(1)}.popup-title{font-size:20px;font-weight:700;margin:0 0 8px 0}.popup-desc{font-size:14px;color:#b0b0b0;margin:0 0 24px 0}.button-wrapper{display:flex;gap:12px;}.button{flex:1;padding:12px;border:none;border-radius:8px;font-weight:700;font-size:16px;cursor:pointer;transition:background-color .2s;text-decoration:none}.button.light{background-color:var(--button-light-bg);color:#000}.button.light:hover{background-color:#fff}.button.action{background-color:var(--button-action-bg);color:#fff}.button.action:hover{background-color:#0095ff}
    </style>
</head>
<body>
    <div class="wrapper">
      <div class="container">
        <img src="https://i.pravatar.cc/150" class="propic">
        <div class="title-wrapper"><h1 class="title">Testovací Tvůrce</h1></div>
        <p class="paragraph">Testování "Interaction Priming"</p>
        <div class="link-list">
          <a class="link" href="/go?url=https%3A%2F%2Fwww.seznam.cz" data-popup="true">
            <img src="https://logotip.us/wp-content/uploads/2021/01/seznam-cz-logo.png" class="icon">
            <div class="label">Testovací odkaz (Seznam.cz)</div><div class="arrow">›</div>
          </a>
        </div>
      </div>
    </div>

    <div id="popup-warning" class="popup-overlay">
      <div class="popup-content">
        <h1 class="popup-title">Přesměrování</h1>
        <p class="popup-desc">Chcete pokračovat na externí stránku?</p>
        <div class="button-wrapper">
          <a id="popup-continue" class="button action">Ano</a>
          <a id="popup-back" class="button light">Ne</a>
        </div>
      </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const popupOverlay = document.getElementById('popup-warning');
            const btnBack = document.getElementById('popup-back');
            const btnContinue = document.getElementById('popup-continue');
            const allLinks = document.querySelectorAll('.link');

            let newWindow = null; // Zde si uložíme referenci na nové okno
            let targetUrl = '';   // A cílovou URL

            const openPopup = () => popupOverlay.classList.add('visible');
            const closePopup = () => popupOverlay.classList.remove('visible');

            // Připojíme posluchač ke všem odkazům
            allLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    targetUrl = link.href;

                    // --- KROK 1: OKAMŽITÉ OTEVŘENÍ PRÁZDNÉHO OKNA ---
                    // Toto se děje hned po "důvěryhodném" kliknutí uživatele.
                    // Vrací null, pokud se otevření zablokuje.
                    newWindow = window.open('', '_blank');

                    // Pokud se okno nepodařilo otevřít, použijeme server-side redirect jako fallback
                    if (!newWindow) {
                        window.location.href = targetUrl;
                        return;
                    }
                    
                    // --- KROK 2: ZOBRAZENÍ POPUPU ---
                    // Teprve teď se zeptáme uživatele na potvrzení.
                    openPopup();
                });
            });

            // Tlačítko "Ano, pokračovat" v popupu
            btnContinue.addEventListener('click', (event) => {
                event.preventDefault();
                // --- KROK 3: VLOŽENÍ URL DO JIŽ OTEVŘENÉHO OKNA ---
                if (newWindow && targetUrl) {
                    newWindow.location.href = targetUrl;
                }
                closePopup();
            });

            // Tlačítko "Ne, zpět" v popupu
            btnBack.addEventListener('click', (event) => {
                event.preventDefault();
                // --- KROK 4: ZAVŘENÍ PRÁZDNÉHO OKNA ---
                // Pokud uživatel nesouhlasí, musíme to prázdné okno zavřít.
                if (newWindow) {
                    newWindow.close();
                }
                closePopup();
            });
        });
    </script>
</body>
</html>
  `;
  return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } });
}
