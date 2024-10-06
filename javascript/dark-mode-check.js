function checkColors() {
    // Ia culorile calculate pentru fundal și text
    let bodyStyle = window.getComputedStyle(document.body);
    let backgroundColor = bodyStyle.backgroundColor;
    let textColor = bodyStyle.color;

    // Verificăm dacă background-ul este foarte întunecat și textul este tot întunecat
    if (isDarkColor(backgroundColor) && isDarkColor(textColor)) {
        alert("Please disable dark mode to have an optimal experience on this page.");
    }
}

// Funcție care verifică dacă o culoare este întunecată (exemplu pentru culori RGB)
function isDarkColor(color) {
    // Extrage componentele RGB din valoarea de culoare
    let rgb = color.match(/\d+/g);

    if (rgb) {
        // Calculează luminozitatea culorii pe baza componentelor RGB
        let luminance = (0.299 * rgb[0]) + (0.587 * rgb[1]) + (0.114 * rgb[2]);
        return luminance < 128;  // O valoare de luminozitate mai mică decât 128 este considerată întunecată
    }
    return false;
}

document.addEventListener('DOMContentLoaded', checkColors);
