// The unordered list where the player’s guessed letters will appear on the webpage //
const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInputBox = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesMessage = document.querySelector(".remaining");
const remainingGuessesNumber = document.querySelector(".remaining span");
const guessedLetterMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
// This array will contain all the letters the player guesses, not shown on the webpage, only the console //
const guessedLetters = [];

// Function to display symbols for placeholders for the secret word // 

const mysteryWord = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
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
        // Calling this function here so the letter displays when it hasn’t been guessed before //
        showPlayerGuesses();
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
    };