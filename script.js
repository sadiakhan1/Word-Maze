var height = 6; //# of guesses
var width = 5; //word length

var row = 0; //current guess (attempt #)
var col = 0; //current letter for that attempt

var gameOver = false;
var wordList = ["about", "above", "actor", "admit", "adore", "adult", "after", "again", "agent", "agile", "agree", "ahead", "alarm", "album", "alert", "alien", "alive", "alone", "along", "alter", "amber", "angel", "anger", "angle", "ankle", "apple", "apply", "arena", "argue", "arise", "arrow", "aside", "asset", "audio", "award", "aware", "basic", "beach", "beads", "beast", "begin", "being", "below", "bench", "bills", "birth", "black", "blade", "blame", "blank", "blast", "block", "blown", "board", "boast", "bones", "books", "boost", "brain", "brand", "brave", "bread", "break", "brick", "bride", "brief", "bring", "broad", "brown", "brush", "build", "burst", "cable", "camel", "carry", "cause", "cease", "chain", "chair", "chalk", "cheap", "cheat", "chess", "chief", "child", "chips", "choir", "civil", "claim", "class", "clean", "clear", "clerk", "clock", "clone", "close", "cloud", "coach", "coast", "color", "comes", "comic", "count", "court", "craft", "crash", "crazy", "cream", "creek", "crest", "crime", "crisp", "cross", "crown", "curve", "dance", "dealt", "debut", "delay", "depth", "devil", "diary", "dream", "drill", "drink", "drive", "early", "earth", "eager", "edges", "email", "enjoy", "entry", "equal", "erase", "error", "event", "every", "exact", "faith", "false", "fancy", "favor", "feast", "field", "final", "flame", "flash", "fleet", "float", "flock", "flood", "floor", "fluid", "focus", "force", "frame", "fresh", "fruit", "funny", "ghost", "giant", "glass", "globe", "grape", "graph", "grass", "green", "greet", "guess", "guest", "habit", "hands", "happy", "harsh", "heart", "heavy", "hobby", "honey", "honor", "horse", "hotel", "house", "human", "humor", "ideal", "image", "imply", "index", "input", "issue", "joint", "jolly", "judge", "juice", "knife", "label", "lakes", "large", "laser", "later", "layer", "learn", "lemon", "light", "liver", "local", "logic", "loose", "lucky", "lunch", "major", "march", "match", "medal", "metal", "might", "model", "money", "month", "moral", "motor", "mount", "mouse", "movie", "music", "naive", "nails", "nasty", "never", "noble", "noise", "north", "notes", "novel", "ocean", "offer", "often", "older", "onion", "orbit", "organ", "other", "outer", "paint", "panel", "panic", "paper", "party", "peace", "peach", "piano", "piece", "place", "plain", "plant", "plate", "point", "pound", "power", "press", "price", "pride", "prime", "print", "prize", "quick", "quiet", "radar", "range", "ratio", "ready", "relax", "reply", "reset", "rider", "ridge", "right", "rival", "river", "robot", "rocks", "royal", "rugby", "ruler", "salad", "sandy", "scale", "scene", "scope", "score", "sense", "serve", "share", "sharp", "sheep", "shine", "shirt", "shock", "short", "sight", "silly", "slice", "smart", "smile", "smoke", "snake", "snowy", "solar", "solid", "sound", "space", "spare", "spice", "spicy", "split", "sport", "staff", "stage", "stain", "stake", "stand", "start", "state", "steam", "steel", "steal", "stone", "storm", "story", "style", "sugar", "sunny", "super", "sweet", "table", "taste", "teach", "teeth", "thank", "their", "theme", "there", "these", "thing", "those", "throw", "thumb", "tight", "tiger", "title", "today", "token", "total", "touch", "trace", "trade", "trail", "train", "treat", "trend", "trick", "trunk", "truth", "trust", "twice", "under", "union", "unity", "urban", "usage", "usual", "value", "vapor", "vault", "vivid", "vocal", "voice", "wagon", "walks", "walls", "watch", "water", "weigh", "whale", "wheel", "where", "which", "while", "white", "whole", "woman", "women", "world", "worry", "worth", "wrong", "write", "yield", "young", "youth"]

var guessList = [...wordList];


var word = wordList[Math.floor(Math.random()*wordList.length)].toUpperCase();
console.log(word);

window.onload = function(){
    intialize();
}


function intialize() {
    // Create the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // Create the key board
    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]

    for (let i = 0; i < keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;
            if (key == "Enter") {
                keyTile.id = "Enter";
            }
            else if (key == "⌫") {
                keyTile.id = "Backspace";
            }
            else if ("A" <= key && key <= "Z") {
                keyTile.id = "Key" + key; // "Key" + "A";
            } 

            keyTile.addEventListener("click", processKey);

            if (key == "Enter") {
                keyTile.classList.add("enter-key-tile");
            } else {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }
    

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        processInput(e);
    })
}

function processKey() {
    e = { "code" : this.id };
    processInput(e);
}

function processInput(e) {
    if (gameOver) return; 

    // alert(e.code);
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
        }
    }
    else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
            col -=1;
        }
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }

    else if (e.code == "Enter") {
        update();
    }

    if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = word;
    }
}

function update() {
    let guess = "";
    document.getElementById("answer").innerText = "";

    //string up the guesses into the word
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;
        guess += letter;
    }

    guess = guess.toLowerCase(); //case sensitive
    console.log(guess);

    if (!guessList.includes(guess)) {
        document.getElementById("answer").innerText = "Not in word list";
        return;
    }
    
    //start processing guess
    let correct = 0;

    let letterCount = {}; //keep track of letter frequency, ex) KENNY -> {K:1, E:1, N:2, Y: 1}
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];

        if (letterCount[letter]) {
           letterCount[letter] += 1;
        } 
        else {
           letterCount[letter] = 1;
        }
    }

    console.log(letterCount);

    //first iteration, check all the correct ones first
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");

            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.remove("present");
            keyTile.classList.add("correct");

            correct += 1;
            letterCount[letter] -= 1; //deduct the letter count
        }

        if (correct == width) {
            gameOver = true;
        }
    }

    console.log(letterCount);
    //go again and mark which ones are present but in wrong position
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        // skip the letter if it has been marked correct
        if (!currTile.classList.contains("correct")) {
            //Is it in the word?         //make sure we don't double count
            if (word.includes(letter) && letterCount[letter] > 0) {
                currTile.classList.add("present");
                
                let keyTile = document.getElementById("Key" + letter);
                if (!keyTile.classList.contains("correct")) {
                    keyTile.classList.add("present");
                }
                letterCount[letter] -= 1;
            } // Not in the word or (was in word but letters all used up to avoid overcount)
            else {
                currTile.classList.add("absent");
                let keyTile = document.getElementById("Key" + letter);
                keyTile.classList.add("absent")
            }
        }
    }

    row += 1; //start new row
    col = 0; //start at 0 for new row
}