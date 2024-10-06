function checkColors() {
    // Folosim getComputedStyle pentru a obține culorile calculate
    let bodyStyle = window.getComputedStyle(document.body);
    let headerStyle = window.getComputedStyle(document.querySelector('header'));

    let backgroundColor = bodyStyle.backgroundColor;
    let headerBackgroundColor = headerStyle.backgroundColor;

    // Culorile constante așteptate
    const expectedGradient = 'linear-gradient(-30deg, rgb(157, 218, 237), rgb(159, 140, 230))';
    const expectedHeaderColor = 'rgb(255, 255, 255)'; // echivalent #ffffff

    // Verificăm dacă fundalul sau headerul au fost schimbate drastic
    if (backgroundColor !== expectedGradient || headerBackgroundColor !== expectedHeaderColor) {
        // Verificăm dacă alerta a fost afișată deja în această sesiune
        if (!sessionStorage.getItem('alertShown')) {
            alert("Se pare că dark mode-ul browserului tău afectează culorile site-ului. Te rog să dezactivezi dark mode pentru o experiență mai bună.");
            // Marcăm alerta ca afișată în această sesiune
            sessionStorage.setItem('alertShown', 'true');
        }
    }
}

// Asigurăm că alerta se afișează doar dacă e pe dark mode și nu s-a afișat deja
function checkDarkModeAndColors() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        checkColors();
    }
}

document.addEventListener('DOMContentLoaded', checkDarkModeAndColors);
