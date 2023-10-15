const generateBtn = document.getElementById('generate');
const result = document.getElementById('result');
const clipboardBtn = document.getElementById('clipboard');

const passwordLength = document.getElementById('password-length');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');

const themeBtn = document.getElementById('btn-theme');
const passwordBox = document.querySelector('.password-box');
const passwordResult = document.querySelector('.password-result')

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    passwordBox.classList.toggle('dark-mode');
    result.style.color = '#000';
    passwordResult.style.backgroundColor = '#ccc';
})

const random = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

generateBtn.addEventListener('click', () => {
    const length = +passwordLength.value;
    const hasUpperLetter = uppercaseElement.checked;
    const hasLowerLetter = lowercaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbol = symbolsElement.checked;

    result.innerText = generatePassword(hasUpperLetter, hasLowerLetter, hasNumber, hasSymbol, length);
});

// copy from clipboard
clipboardBtn.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = result.innerText;

    textarea.value = password;

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    clipboardBtn.style.backgroundColor = 'coral';
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    let randomCount = lower + upper + number + symbol;
    let randomArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (randomCount === 0) {
        return ''
    }

    for (let i = 0; i < length; i += randomCount) {
        randomArr.forEach((type) => {
            const funcName = Object.keys(type)[0];
            generatedPassword += random[funcName]();
        });
    }

    let finalPasword = generatedPassword.slice(0, length);
    return finalPasword;
}


function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbol = '!@#$%^&*(){}[]?'
    return symbol[Math.floor(Math.random() * symbol.length)];
}

