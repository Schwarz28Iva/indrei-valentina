// Functie care verifica daca este Samsung Browser
function isSamsungBrowser() {
    return navigator.userAgent.match(/SamsungBrowser/i) !== null;
}

// Functie care verifica daca dark mode este activ in browser
function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Functia pentru a verifica si afisa alerta o singura data in sesiunea curenta
function checkBrowserAndDarkMode() {
    // Verifica daca alerta a fost deja afisata in sesiunea curenta
    if (sessionStorage.getItem('alertShown') !== 'true') {
        // Verifica daca este Samsung Browser sau dark mode este activat
        if (isSamsungBrowser() || isDarkMode()) {
            alert("Te rog să dezactivezi dark mode pentru a avea o experiență optimă pe această pagină.");
            // Salveaza in sessionStorage ca alerta a fost afisata
            sessionStorage.setItem('alertShown', 'true');
        }
    }
}

// Apeleaza functia la incarcarea paginii
document.addEventListener('DOMContentLoaded', checkBrowserAndDarkMode);
