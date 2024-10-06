function isColorDark(color) {
    let rgb = color.match(/\d+/g).map(Number);
    // Formula standard pentru luminozitate în RGB: 0.2126 * R + 0.7152 * G + 0.0722 * B
    let luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    // Dacă luminozitatea este mai mică decât 100, considerăm că este o culoare foarte întunecată
    return luminance < 100;
}

function checkForDarkModeByExtensions() {
    // Verificăm stilul elementelor cheie
    let bodyStyle = window.getComputedStyle(document.body);
    let headerStyle = window.getComputedStyle(document.querySelector('header'));

    // Culori așteptate în light mode
    const expectedBackground = 'rgb(157, 218, 237)'; // #9ddaed
    const expectedHeader = 'rgb(255, 255, 255)'; // #ffffff

    // Verificăm dacă fundalul sau headerul au devenit foarte închise
    if (isColorDark(bodyStyle.backgroundColor) || isColorDark(headerStyle.backgroundColor)) {
        // Verificăm dacă alerta a fost deja afișată în sesiune
        if (!sessionStorage.getItem('alertShown')) {
            alert("Dark Mode Test: nr. 5");
            sessionStorage.setItem('alertShown', 'true');
        }
    }
}

// Verificăm la încărcarea paginii
document.addEventListener('DOMContentLoaded', checkForDarkModeByExtensions);
