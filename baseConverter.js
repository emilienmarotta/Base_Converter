document.addEventListener('DOMContentLoaded', function() {
    AOS.init();
});


window.addEventListener('load', function() {
    
    setTimeout(function() {
        
        document.body.classList.add('loaded');
    
    }, 0);

});

document.addEventListener("DOMContentLoaded", function() {
    
    const angle1 = document.getElementById("angle1");
    const angle2 = document.getElementById("angle2");

    setTimeout( () => {

        angle1.style.transform = "translate(0, 0)";
        angle2.style.transform = "translate(0, 0)";
    
    }, 1500);

});

const upButton = document.getElementById("up-button");

upButton.addEventListener("touchstart", () => {

    upButton.src = "Index/arrow2.png";

});

upButton.addEventListener("touchend", () => {

    upButton.src = "Index/arrow.png";

});


const scrollToTopButton = document.getElementById("up-button");

window.addEventListener("scroll", () => {

    if (window.scrollY > 100) {

        scrollToTopButton.classList.add("visible");

    } else {

        scrollToTopButton.classList.remove("visible");

    }

});

scrollToTopButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

const typingSpeed = 30; // ms

const mainBoxTitleText = document.getElementById("h1");

function typeText(htmlElement, text, charIndex) {
    if (charIndex < text.length) {
        
        htmlElement.classList.add("cursor-blink");
        htmlElement.innerHTML += text.charAt(charIndex);

        charIndex++;
        setTimeout(() => typeText(htmlElement, text, charIndex), typingSpeed);
   
    } else {
   
        setTimeout(() => htmlElement.classList.remove("cursor-blink"), 0);
   
    }
}

typeText(mainBoxTitleText, "Base Converter", 0);

const inputValue = document.getElementById("input");
const output = document.getElementById("output");
const alphaBaseValue = document.getElementById("alpha-base-value");
const betaBaseValue = document.getElementById("beta-base-value");
const tipsButton = document.getElementById("tips");
const mainBox = document.getElementById("main-box");
const switchButton = document.getElementById("switch");
const savedAlphaBase = localStorage.getItem("alphaBase");
const savedBetaBase = localStorage.getItem("betaBase");

const alphanumericChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const digits = "0123456789";

let lastShortcutTime = 0;
const shortcutDelay = 500;

let isFlipped = false;


if (savedAlphaBase) {

    alphaBaseValue.value = savedAlphaBase;

}

if (savedBetaBase) {
    
    betaBaseValue.value = savedBetaBase;

}

setTimeout( () => {

    tipsButton.style.animation = "excitement 1.4s ease";

}, 500);

document.getElementById("switch").addEventListener("click", (event) => {
    
    event.preventDefault();
    
    let temp = alphaBaseValue.value;

    alphaBaseValue.value = betaBaseValue.value;
    betaBaseValue.value = temp;
    
    temp = inputValue.value;
    inputValue.value = output.innerHTML;
    output.innerHTML = temp;

});

document.addEventListener("keydown", (event) => {

    if (event.keyCode === 13) { event.preventDefault(); document.getElementById("convert").click(); }
    
});

function saveBases() {

    localStorage.setItem("alphaBase", alphaBaseValue.value);
    localStorage.setItem("betaBase", betaBaseValue.value);

}

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

    if (element.value === "" && window.innerWidth > 700) {

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

    conversionResult = conversion(alphaBaseValue.value, betaBaseValue.value, inputValue.value.toString());
    if (conversionResult === "") { output.innerHTML = "0"; } 
    else { output.innerHTML = conversionResult; }

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

    conversionResult = conversion(alphaBaseValue.value, betaBaseValue.value, inputValue.value.toString());
    if (conversionResult === "") { output.innerHTML = "0"; } 
    else { output.innerHTML = conversionResult; }

}

document.addEventListener('keydown', function(event) {

    if (event.ctrlKey && event.key === ":") {

        inputValue.focus();
        inputValue.setSelectionRange(inputValue.value.length, inputValue.value.length);

    }
    
    else if (event.ctrlKey && event.key === ",") {

        alphaBaseValue.focus();
        alphaBaseValue.setSelectionRange(alphaBaseValue.value.length, alphaBaseValue.value.length);

    }

    else if (event.ctrlKey && event.key === ";") {

        betaBaseValue.focus();
        betaBaseValue.setSelectionRange(betaBaseValue.value.length, betaBaseValue.value.length);

    }

    else if (event.ctrlKey && event.key === "!") {

        const currentTime = new Date().getTime();
        if (currentTime - lastShortcutTime >= shortcutDelay - 400) {
        
            lastShortcutTime = currentTime;
            switchButton.click();
        
        }

    }

    else if (event.ctrlKey && event.key === "ù") {

        const currentTime = new Date().getTime();
        if (currentTime - lastShortcutTime >= shortcutDelay) {
        
            lastShortcutTime = currentTime;
            tipsButton.click();
        
        }

    }

});

tipsButton.addEventListener("click", () => {

    const delay = 200;

    if (isFlipped === false) {
        
        mainBox.classList.add("flipped");
        document.getElementById("front-face").style.display = "none";
        setTimeout( () => {
            
            tipsButton.src = "Index/tips-back.png";
            document.getElementById("back-face").style.display = "flex";
            tipsButton.classList.add("replacement");
        
        }, delay);
        isFlipped = true;
        
    } else {
        
        mainBox.classList.remove("flipped");
        tipsButton.classList.remove("replacement");
        document.getElementById("back-face").style.display = "none";
        setTimeout( () => {
            
            tipsButton.src = "Index/tips.png";
            document.getElementById("front-face").style.display = "flex";
        
        }, delay);
        isFlipped = false;

    }

});
