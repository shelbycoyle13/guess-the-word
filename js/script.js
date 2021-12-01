// The unordered list where the player’s guessed letters will appear on the webpage //
const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInputBox = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesMessage = document.querySelector(".remaining");
const remainingGuessesNumber = document.querySelector(".remaining span");
const guessedLetterMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let remainingGuesses = 8;
let word = "magnolia";
// This array will contain all the letters the player guesses, not shown on the webpage, only the console //
let guessedLetters = [];

const getWord = async function () {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await response.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    mysteryWord(word);
};

getWord();

// Function to display symbols for placeholders for the secret word // 

const mysteryWord = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

mysteryWord(word);

// Event listener for the Guess button //

guessButton.addEventListener("click", function(e) {
    // Stops the page from refreshing and reloading everything //
    e.preventDefault();
    // We are emptying the message element//
    guessedLetterMessage.innerText = "";
    // We are going to grab what was entered in the text box //
    const guessValue = textInputBox.value;
    // Let's make sure that it is a single letter //
    const goodGuess = validateInput(guessValue);
    
    if (goodGuess) {
        // We've got a letter! Let's guess! //
        makeGuess(guessValue);
    }
      
    textInputBox.value = "";

    });

// Function to validate the player's input //

const validateInput = function (guessValue) {
    const acceptedLetter = /[a-zA-Z]/;
    if (guessValue.length === 0) {
        guessedLetterMessage.innerText = ("Please enter a letter!"); 
    } else if (guessValue.length > 1) {
        guessedLetterMessage.innerText = ("You can only enter one letter at a time!");
    } else if (!guessValue.match(acceptedLetter)) {
        guessedLetterMessage.innerText = ("I'm sorry, but you may only enter a letter from A to Z!");
    } else {
        return guessValue;
    }
};

// Function to capture the player's input //

const makeGuess = function (guessValue) {
    guessValue = guessValue.toUpperCase();
    if (guessedLetters.includes(guessValue)) {
        guessedLetterMessage.innerText = ("You've already guessed that letter!");
    } else {
        guessedLetters.push(guessValue);
        console.log(guessedLetters);
        
        countGuessesRemaining(guessValue);
        // Calling this function here so the letter displays when it hasn’t been guessed before //
        showPlayerGuesses();
        updateWordInProgress(guessedLetters);
    }
};

// Function to update the page with the letters the player guesses //

const showPlayerGuesses = function () {
    guessedLettersList.innerText = "";
    for (letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

// Function to update the word in progress //

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    console.log("wordUpper is logged out", wordUpper);
    console.log("wordArray is logged out", wordArray);
    const correctLetters = [];
    for (const letter of wordArray) {
     if (guessedLetters.includes(letter)) {
        correctLetters.push(letter.toUpperCase());
     } else {
        correctLetters.push("●");
    }
    wordInProgress.innerText = correctLetters.join("");
    checkTheWin();
    }
};

const countGuessesRemaining = function (guessValue) {
    const upperWord = word.toUpperCase();
    if (upperWord.includes(guessValue)) {
        guessedLetterMessage.innerText = ("Nice job! That letter is in the word!");
    } else {
        guessedLetterMessage.innerText = ("Sorry, that letter is not in the word!");
        remainingGuesses -= 1;
    }
    if (remainingGuesses === 0) {
        guessedLetterMessage.innerText = `Sorry, the game is over! The word was ${word}!`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesNumber.innerText = "one guess";
    } else if (remainingGuesses > 1) {
        remainingGuessesNumber.innerText = `${remainingGuesses} guesses`;
    };
};

const checkTheWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        guessedLetterMessage.classList.add("win");
        guessedLetterMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
        guessButton.classList.add("hide");
        remainingGuessesMessage.classList.add("hide");
        guessedLettersList.classList.add("hide");
        playAgainButton.classList.remove("hide");
    };

playAgainButton.addEventListener("click", function () {
    // Function to reset all values and get a new word //
    guessedLetterMessage.classList.remove("win");
    guessedLetters = [];
    guessedLetterMessage.innerText = "";
    guessedLettersList.innerText = "";
    remainingGuesses = 8;
    remainingGuessesNumber.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    remainingGuessesMessage.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
});