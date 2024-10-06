function isColorDark(color) {
    let rgb = color.match(/\d+/g).map(Number);
    let luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return luminance < 100;
}

function checkForDarkModeByExtensions() {
    let headerStyle = window.getComputedStyle(document.querySelector('header'));
    let bodyTextColor = window.getComputedStyle(document.body).color;

    const expectedHeader = 'rgb(255, 255, 255)'; // #ffffff
    const expectedTextColor = 'rgb(0, 0, 0)'; // #000000

    // Verificăm dacă header-ul este întunecat sau textul din body nu mai este negru
    if (isColorDark(headerStyle.backgroundColor) || bodyTextColor !== expectedTextColor) {
        if (!sessionStorage.getItem('alertShown')) {
            alert("ULTIMUL TEST ?!");
            sessionStorage.setItem('alertShown', 'true');
        }
    }
}

document.addEventListener('DOMContentLoaded', checkForDarkModeByExtensions);
