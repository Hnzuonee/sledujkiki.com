// src/index.js - Hlavní kód Workeru

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const html = `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="utf-8" />
    <title>Jméno Tvůrce</title>
    <meta content="Jméno Tvůrce" property="og:title" />
    <meta content="Jméno Tvůrce" property="twitter:title" />
    <meta content="Model & Digital Creator" name="description" />
    <meta content="Model & Digital Creator" property="og:description" />
    <meta content="Model & Digital Creator" property="twitter:description" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    
    <style>
      /* --- CSS STYLY PRO VZHLED (napodobení originálu) --- */
      :root {
        --background-color: #000;
        --text-color: #fff;
        --container-bg: #111;
        --link-bg: #222;
        --link-hover-bg: #333;
        --button-light-bg: #e0e0e0;
        --button-dark-bg: #4a4a4a;
      }
      body {
        background-color: var(--background-color);
        color: var(--text-color);
        font-family: 'Poppins', sans-serif;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        margin: 0;
        padding: 20px 10px;
        box-sizing: border-box;
      }
      .wrapper {
        width: 100%;
        max-width: 680px;
        position: relative;
        z-index: 1;
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 40px 20px;
        background-color: var(--container-bg);
        border-radius: 24px;
        border: 1px solid #333;
      }
      .propic {
        width: 96px;
        height: 96px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 16px;
      }
      .title-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
      }
      .title {
        font-size: 24px;
        font-weight: 700;
        margin: 0;
      }
      .badge {
        width: 20px;
        height: 20px;
      }
      .paragraph {
        font-size: 16px;
        color: #b0b0b0;
        margin: 0 0 32px 0;
      }
      .link-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .link {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        background-color: var(--link-bg);
        border-radius: 12px;
        text-decoration: none;
        color: var(--text-color);
        transition: background-color 0.2s, transform 0.2s;
        cursor: pointer;
      }
      .link:hover {
        background-color: var(--link-hover-bg);
        transform: scale(1.02);
      }
      .link .icon {
        width: 32px;
        height: 32px;
        margin-right: 16px;
        object-fit: contain;
      }
      .link .label {
        flex-grow: 1;
        text-align: left;
        font-weight: 700;
      }
      .link .arrow {
        font-family: 'Arial'; /* Placeholder for arrow icon */
      }

      /* --- Styly pro Popup --- */
      .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
      }
      .popup-overlay.visible {
        opacity: 1;
        visibility: visible;
      }
      .popup-content {
        background-color: #2c2c2e;
        padding: 24px;
        border-radius: 16px;
        text-align: center;
        max-width: 320px;
        width: calc(100% - 40px);
        transform: scale(0.9);
        transition: transform 0.3s;
      }
      .popup-overlay.visible .popup-content {
         transform: scale(1);
      }
      .popup-title {
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 8px 0;
      }
      .popup-desc {
        font-size: 14px;
        color: #b0b0b0;
        margin: 0 0 24px 0;
      }
      .button-wrapper {
        display: flex;
        gap: 12px;
      }
      .button {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 8px;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.2s;
        text-decoration: none;
      }
      .button.light {
        background-color: var(--button-light-bg);
        color: #000;
      }
       .button.light:hover {
        background-color: #fff;
      }
      .button.dark {
        background-color: var(--button-dark-bg);
        color: #fff;
      }
       .button.dark:hover {
        background-color: #5a5a5a;
      }
    </style>
</head>
<body>

    <div class="wrapper">
      <div class="container">
        <img src="https://minisoft-cdn.pages.dev/sw/images/eva.webp" class="propic">
        <div class="title-wrapper">
          <h1 class="title">Jméno Tvůrce</h1>
          <img src="https://minisoft-cdn.pages.dev/sw/images/badge.svg" class="badge">
        </div>
        <p class="paragraph">Model &amp; Digital creator</p>
        <div class="link-list">
          <div class="link" data-popup="true" data-url="https://onlyfans.com/USERNAME">
            <img src="https://minisoft-cdn.pages.dev/sw/images/onlyfans.webp" class="icon">
            <div class="label">Exclusive Content</div>
            <div class="arrow">›</div>
          </div>

          <div class="link" data-popup="true" data-url="https://t.me/USERNAME">
            <img src="https://minisoft-cdn.pages.dev/sw/images/telegram.webp" class="icon">
            <div class="label">Telegram</div>
            <div class="arrow">›</div>
          </div>
          
          <a class="link" href="https://tiktok.com/@USERNAME">
            <img src="https://minisoft-cdn.pages.dev/sw/images/tiktok.webp" class="icon">
            <div class="label">TikTok</div>
            <div class="arrow">›</div>
          </a>

          <div class="link" data-popup="true" data-url="https://twitter.com/USERNAME">
            <img src="https://minisoft-cdn.pages.dev/sw/images/twitter.webp" class="icon">
            <div class="label">Twitter</div>
            <div class="arrow">›</div>
          </div>

          <a class="link" href="https://facebook.com/USERNAME">
            <img src="https://minisoft-cdn.pages.dev/sw/images/facebook.svg" class="icon">
            <div class="label">Facebook</div>
            <div class="arrow">›</div>
          </a>
          </div>
      </div>
    </div>

    <div id="popup-warning" class="popup-overlay">
      <div class="popup-content">
        <h1 class="popup-title">Citlivý obsah</h1>
        <p class="popup-desc">Tento odkaz může vést na obsah, který nemusí být vhodný pro všechny.</p>
        <div class="button-wrapper">
          <a id="popup-back" href="#" class="button light">Zpět</a>
          <a id="popup-continue" href="#" class="button dark">Pokračovat</a>
        </div>
      </div>
    </div>

    <script>
        // --- JAVASCRIPT LOGIKA PRO FUNKČNOST STRÁNKY ---
        document.addEventListener('DOMContentLoaded', () => {
            const popupOverlay = document.getElementById('popup-warning');
            const btnBack = document.getElementById('popup-back');
            const btnContinue = document.getElementById('popup-continue');
            const linksWithPopup = document.querySelectorAll('[data-popup="true"]');

            let targetUrl = ''; // Proměnná pro uložení cílové URL

            const openPopup = (url) => {
                targetUrl = url;
                popupOverlay.classList.add('visible');
            };

            const closePopup = () => {
                popupOverlay.classList.remove('visible');
                targetUrl = '';
            };

            linksWithPopup.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault(); 
                    const url = link.dataset.url;
                    if (url) {
                        openPopup(url);
                    }
                });
            });

            btnBack.addEventListener('click', (event) => {
                event.preventDefault();
                closePopup();
            });
            
            popupOverlay.addEventListener('click', (event) => {
              if (event.target === popupOverlay) {
                closePopup();
              }
            });

            btnContinue.addEventListener('click', (event) => {
                event.preventDefault();
                if (targetUrl) {
                    window.open(targetUrl, '_blank');
                }
                closePopup();
            });
        });
    </script>
</body>
</html>
  `;

  return new Response(html, {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  })
}
