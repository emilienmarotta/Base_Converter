
const alphaBaseValue = document.getElementById("alpha-base-value");
const betaBaseValue = document.getElementById("beta-base-value");
const inputValue = document.getElementById("input");
const output = document.getElementById("output");

const savedAlphaBase = localStorage.getItem("alphaBase");
const savedBetaBase = localStorage.getItem("betaBase");

const alphanumericChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const digits = "0123456789";

if (savedAlphaBase) {
    alphaBaseValue.value = savedAlphaBase;
}

if (savedBetaBase) {
    betaBaseValue.value = savedBetaBase;
}

document.getElementById("switch").addEventListener("click", (event) => {
    
    event.preventDefault();
    
    let temp = alphaBaseValue.value;

    alphaBaseValue.value = betaBaseValue.value;
    betaBaseValue.value = temp;
    
    temp = inputValue.value;
    inputValue.value = output.innerHTML;
    output.innerHTML = temp;

    localStorage.setItem("alphaBase", alphaBaseValue.value);
    localStorage.setItem("betaBase", betaBaseValue.value);

});

document.getElementById("convert").addEventListener("click", (event) => {
    
    event.preventDefault();

    conversionResult = conversion(alphaBaseValue.value, betaBaseValue.value, inputValue.value.toString());
    if (conversionResult === "") { output.innerHTML = "0"; } 
    else { output.innerHTML = conversionResult; }

});

document.addEventListener("keydown", (event) => {

    if (event.keyCode === 13) { event.preventDefault(); document.getElementById("convert").click(); }
    
});

function conversion(alphaBase, betaBase, nAlphaBase) {
    let nDecimalBase = 0;
    nAlphaBase = nAlphaBase.toString();

    for (let i = 0; i < nAlphaBase.length; i++) {
        let digit = parseInt(nAlphaBase[i], alphaBase);
        nDecimalBase += digit * Math.pow(alphaBase, nAlphaBase.length - i - 1);
    }

    let nBetaBase = "";

    for (let i = 0; nDecimalBase > 0; i++) {
        let quotient = Math.floor(nDecimalBase / betaBase);
        let remainder = nDecimalBase % betaBase;
        nBetaBase = remainder.toString(betaBase) + nBetaBase;
        nDecimalBase = quotient;
    }

    nBetaBase = nBetaBase.toUpperCase();

    return nBetaBase;
}

function handleInput (element, allowedChars) {

    if (allowedChars === 1) {

        allowedChars = alphanumericChars;

    } else {

        allowedChars = digits;

    }

    let startPosition = element.selectionStart;
    let endPosition = element.selectionEnd;
    
    let newValue = "";

    for (let i = 0; i < element.value.length; i ++) {

        if (allowedChars.includes(element.value[i])) {

            newValue += element.value[i];

        } else {

            startPosition -= 1;
            endPosition -= 1;

        }
    }

    element.value = newValue

    if (element.value === "") {

        element.value = "0";

    }

    while (element.value[0] === "0" && element.value.length > 1) {

        element.value = element.value.substring(1);

    }

    if (element.value[0] === "0") {
        
        element.setSelectionRange(1, 1);
    
    } else {
        
        element.setSelectionRange(startPosition, endPosition);
    }

}

function handlePaste (event, element, allowedChars) {

    if (element.value === "0") {

        element.value = "";

    }

    if (allowedChars === 1) {

        allowedChars = alphanumericChars;

    } else {

        allowedChars = digits;

    }

    event.preventDefault();
    const clipboardData = event.clipboardData.getData('text');

    let newValue = element.value;

    for (let i = 0; i < clipboardData.length; i ++) {
        
        if (allowedChars.includes(clipboardData[i])) {

            newValue += clipboardData[i];

        }

    }

    element.value = newValue;

    if (element.value === "") {

        element.value = "0";

    }

}
