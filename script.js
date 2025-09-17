import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 5;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor;
            if (oldColor === 'green') {
                return;
            }

            if (oldColor === 'yellow' && color !== 'green') {
                return;
            }

            elem.style.backgroundColor = color;
            break;
        }
    }
}

function processEnter() {
    let guessString = currentGuess.join("");
    if (guessString.length !== 5) {
        toastr.error("Not enough letters!");
        return;
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Word not found!");
        return;
    }

    let rightGuess = Array.from(rightGuessString);

    for (let i = 0; i < 5; i++) {
        let letterColor = '';
        let box = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining].children[i];
        let letter = currentGuess[i];

        let letterPosition = rightGuess.indexOf(currentGuess[i]);
        if (letterPosition === -1) {
            letterColor = 'gray';
        } else {
            if (currentGuess[i] === rightGuess[i]) {
                letterColor = 'green';
            } else {
                letterColor = 'yellow';
            }
            rightGuess[letterPosition] = '#';
        }

        let delay = 250 * i;
        setTimeout(() => {
            box.style.backgroundColor = letterColor;
            shadeKeyBoard(letter, letterColor);
        }, delay);
    }

    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessString === rightGuessString) {
        toastr.success("You guessed right! Game over!");
        guessesRemaining = 0;
    } else if (guessesRemaining === 0) {
        toastr.error("You've run out of guesses! Game over!");
        toastr.info(`The right word was: "${rightGuessString}"`);
    }
}

function processDelete() {
    let box = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining].children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
}

function insertLetter(pressedKey) {
    if (nextLetter === 5) {
        return;
    }
    pressedKey = pressedKey.toLowerCase();

    let box = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining].children[nextLetter];
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
        return;
    }

    let pressedKey = String(e.key);
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        processDelete();
        return;
    }

    if (pressedKey === "Enter") {
        processEnter();
        return;
    }

    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
        return;
    } else {
        insertLetter(pressedKey);
    }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;
    if (!target.classList.contains("keyboard-button")) {
        return;
    }

    let key = target.textContent;
    if (key === "Del") {
        key = "Backspace";
    }

    document.dispatchEvent(new KeyboardEvent("keyup", { 'key': key }));
});

initBoard();

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target

    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});