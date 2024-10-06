function isColorDark(color) {
    let rgb = color.match(/\d+/g).map(Number);
    let luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return luminance < 100;
}

function checkForDarkModeByExtensions() {
    let headerStyle = window.getComputedStyle(document.querySelector('header'));

    const expectedHeader = 'rgb(255, 255, 255)'; // #ffffff

    // Dacă header-ul este foarte întunecat
    if (isColorDark(headerStyle.backgroundColor)) {
        if (!sessionStorage.getItem('alertShown')) {
            alert("TEST 10.");
            sessionStorage.setItem('alertShown', 'true');
        }
    }
}

document.addEventListener('DOMContentLoaded', checkForDarkModeByExtensions);
