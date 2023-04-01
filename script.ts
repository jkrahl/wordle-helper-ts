import fs from "fs";
import path from "path";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

console.log(argv);

var wordLength = parseInt(argv["length"] || "5");
var greenLetters = argv["green"] || ""; //Example: "a**o*"
var yellowLetters = argv["yellow"] || ""; //Example: "bcehl"
var grayLetters = argv["gray"] || ""; //Example: "ghiij"

console.log("wordLength: " + wordLength);
console.log("greenLetters: " + greenLetters);
console.log("yellowLetters: " + yellowLetters);
console.log("grayLetters: " + grayLetters);

// Get the words from the file and split them
const file = fs.readFileSync(path.join(__dirname, "palabras.txt"), "utf8");
const words = file.split("\r\n");

// Filter the words
let filteredWords = words.filter((word) => word.length === wordLength);

filteredWords = filteredWords.filter((word) => checkYellow(word));

filteredWords = filteredWords.filter((word) => checkGray(word));

filteredWords = filteredWords.filter((word) => checkGreen(word));

console.log(filteredWords);

// checkGreen returs true if the word has all green letters in the correct position, ignoring the positions with "*"
function checkGreen(word: string) {
    if (greenLetters === "" || greenLetters === "*".repeat(wordLength)) {
        return true;
    }
    for (let i = 0; i < greenLetters.length; i++) {
        if (greenLetters[i] !== "*" && greenLetters[i] !== word[i]) {
            return false;
        }
    }
    return true;
}

// checkYellow returs true if the word has all yellow letters
function checkYellow(word: string) {
    if (yellowLetters === "") {
        return true;
    }
    let yellowLettersCount = 0;
    for (let i = 0; i < yellowLetters.length; i++) {
        if (word.includes(yellowLetters[i])) {
            yellowLettersCount++;
        }
    }
    if (yellowLettersCount === yellowLetters.length) {
        return true;
    }
    return false;
}

// checkGray returs true if the word doesnt have any gray letter
function checkGray(word: string) {
    if (grayLetters === "") {
        return true;
    }
    for (let i = 0; i < grayLetters.length; i++) {
        if (word.includes(grayLetters[i])) {
            return false;
        }
    }
    return true;
}
