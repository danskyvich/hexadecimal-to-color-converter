const userInput = document.getElementById('inputBox')
const button = document.getElementById('btnSubmit')
const form = document.getElementById('hexForm')
const errorHandler = document.getElementById('errorHandler')
const regex = "^#([A-Fa-f0-9]{6})$"
const display = document.getElementById('displayUserInput')
const displayColor = document.getElementById('displayColor')
let isInputValid = false;

form.addEventListener('submit', (e) => {
    //store all our error messages in this array
    let errorMessages = []

    //clear error message
    clearEverything()

    //if input is empty
    if (userInput.value === '' || userInput.value == null) {
        errorMessages.push('Input is empty.')
        isInputValid = false;
    }

    if (!userInput.value.match(regex)) {
        errorMessages.push('Input is not in proper format.')
        isInputValid = false;
    } else {
        isInputValid = true;
    }

    if (isInputValid) {
        convertHexToColor();
    }

    if (errorMessages.length > 0) {
        e.preventDefault()
        errorHandler.innerText = errorMessages.join(', ')
    }
})

function convertHexToColor() {
    display.innerText = userInput.value;
    let hex = userInput.value;

    //divide input into 3 substrings
    var r = hex.substring(1,3)
    var g = hex.substring(3,5)
    var b = hex.substring(5,7)

    //convert hex substrings into dec and convert to string
    var rNum = hexToDec(r).toString()
    var gNum = hexToDec(g).toString()
    var bNum = hexToDec(b).toString()

    //display it as color
    displayColor.style.backgroundColor = "rgb(" + rNum + "," + gNum + "," + bNum + ")" 
    document.getElementById('redHex').innerText = r.toString()
    document.getElementById('greenHex').innerText = g.toString()
    document.getElementById('blueHex').innerText = b.toString()

    document.getElementById('redDec').innerText = rNum.toString()
    document.getElementById('greenDec').innerText = gNum.toString()
    document.getElementById('blueDec').innerText = bNum.toString()

    document.getElementById('rgbSummary').innerText = "rgb(" + rNum + ", " + gNum + ", " + bNum + ")"
}

function hexToDec(n) {
    return parseInt(n, 16);
}

function clearEverything() {
    errorHandler.innerText = "";
    display.innerText = "";
    displayColor.style.backgroundColor = "rgb(255,255,255)"
    document.getElementById('redHex').innerText = ""
    document.getElementById('greenHex').innerText = ""
    document.getElementById('blueHex').innerText = ""

    document.getElementById('redDec').innerText = ""
    document.getElementById('greenDec').innerText = ""
    document.getElementById('blueDec').innerText = ""
    document.getElementById('rgbSummary').innerText = ""
}