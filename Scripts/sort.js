function getInputValue() {
    const input = document.getElementById('input-txt').value
    let separateLines = input.split(/\r?\n|\r|\n/g);
    separateLines = separateLines.map((line) => line.trim())
    separateLines = separateLines.filter((item) => item !== '');
    const removeDups = document.getElementById('removeDups').checked;
    const numbered = document.getElementById('numbered').checked;
    const ascending = document.getElementById('rbtnOrderAscending').checked
    if (removeDups) {
        separateLines = separateLines.filter((item,
            index) => separateLines.indexOf(item) === index);
    }
    if (ascending) {
        separateLines = separateLines.sort((a, b) => sortAlphabetically(a, b));
    } else { separateLines = separateLines.sort((a, b) => sortAlphabetically(b, a)); }
    if (numbered) {
        separateLines = separateLines.map((e, index) => (index + 1) + '. ' + e)
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