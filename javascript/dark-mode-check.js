function checkColorsForExtensions() {
    let bodyStyle = window.getComputedStyle(document.body);
    let headerStyle = window.getComputedStyle(document.querySelector('header'));

    let backgroundColor = bodyStyle.backgroundColor;
    let headerBackgroundColor = headerStyle.backgroundColor;

    // Culori așteptate în light mode
    const expectedBackgroundColor = 'rgb(255, 255, 255)'; // echivalent #ffffff pentru background
    const expectedHeaderColor = 'rgb(255, 255, 255)'; // echivalent #ffffff pentru header

    // Culoarea corpului paginii și a header-ului este foarte închisă (semn al unui mod întunecat aplicat de extensie)
    const darkBackgroundThreshold = 100; // Valoare arbitrară pentru RGB, sub care considerăm că e foarte întunecat

    let bgRgb = bodyStyle.backgroundColor.match(/\d+/g).map(Number);
    let headerRgb = headerStyle.backgroundColor.match(/\d+/g).map(Number);

    // Dacă fundalul și headerul sunt mult mai închise decât culorile așteptate
    if ((bgRgb[0] < darkBackgroundThreshold && bgRgb[1] < darkBackgroundThreshold && bgRgb[2] < darkBackgroundThreshold) ||
        (headerRgb[0] < darkBackgroundThreshold && headerRgb[1] < darkBackgroundThreshold && headerRgb[2] < darkBackgroundThreshold)) {

        // Verificăm dacă alerta a fost deja afișată în sesiune
        if (!sessionStorage.getItem('alertShown')) {
            alert("Se pare că folosești o extensie care forțează modul dark. Culorile paginii ar putea să nu fie afișate corect.");
            sessionStorage.setItem('alertShown', 'true');
        }
    }
}

document.addEventListener('DOMContentLoaded', checkColorsForExtensions);
