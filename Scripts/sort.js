function getInputValue() {
    const input = document.getElementById('input-txt').value
    let separateLines = input.split(/\r?\n|\r|\n/g);
    separateLines = separateLines.map((line) => line.trim())
    separateLines = separateLines.filter((item) => item !== '');
    const removeDups = document.getElementById('removeDups').checked;
    const numbered = document.getElementById('numbered').checked;
    const unNumbered = document.getElementById('unNumbered').checked;
    const ascending = document.getElementById('rbtnOrderAscending').checked
    const random = document.getElementById('rbtnOrderRandom').checked
    const original = document.getElementById('rbtnOrderOriginal').checked
    if (removeDups) {
        separateLines = separateLines.filter((item,
            index) => separateLines.indexOf(item) === index);
    }
    if (ascending) {
        separateLines = separateLines.sort((a, b) => sortAlphabetically(a, b));
    } else if (random) {
        separateLines = separateLines.sort(() => Math.random() - 0.5);
    } else if (original) {
        separateLines = separateLines.map((e) => e)
    } else {
        separateLines = separateLines.sort((a, b) => sortAlphabetically(b, a));
    }
    if (numbered) {
        separateLines = separateLines.map((e, index) => (index + 1) + '. ' + e)
    } else if (unNumbered) {
        separateLines = separateLines.map((e) => e.substring(e.indexOf(". ") + 1))
    } else {
        separateLines = separateLines.map((e) => e)
    }
    document.getElementById('output-txt').value = separateLines.join('\r\n')
}

function sortAlphabetically(a, b) {
    const specialCharsFormat = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    const textA = a.toUpperCase();
    const textB = b.toUpperCase();
    if (!specialCharsFormat.test(textA) && specialCharsFormat.test(textB)) {
        return -1;
    } else if (
        specialCharsFormat.test(textA) &&
        !specialCharsFormat.test(textB)
    ) {
        return 1;
    }
    if (isNaN(textA) && !isNaN(textB)) {
        return -1;
    } else if (!isNaN(textA) && isNaN(textB)) {
        return 1;
    }
    return textA.localeCompare(textB);
}