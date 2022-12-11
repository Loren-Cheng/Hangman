// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

class HangMan {

  constructor(remainAttempts, wordList) {
    this._winCount = 0;
    this._loseCount = 0
    this._remainAttempts = remainAttempts;
    this._wordList = wordList;
    let index = Math.floor(Math.random() * this._wordList.length);
    this._winWord = this._wordList[index];
    this._maskedWord = "";
    for (let i = 0; i < this._winWord.length; i++) {
      this._maskedWord += "-";
    }
    this._attemptsLetter = "";
  }

  get remainAttempts() {
    return this._remainAttempts;
  }

  set remainAttempts(value) {
    this._remainAttempts = value;
  }

  get wordList() {
    return this._wordList;
  }

  set wordList(value) {
    this._wordList = value;
  }

  start() {
    console.log('H A N G M A N');
    this.menu();
    console.log();
  }

  mask() {
    console.log(`${this._maskedWord}`)
  }

  menu() {
    let letter = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ")
    if ("play" === letter) {
      console.log();
      this.guess();
      this.reset();
      this.menu();
    } else if ("results" === letter) {
      console.log(`You won: ${this._winCount} times`)
      console.log(`You lost: ${this._loseCount} times`)
      this.menu();
    } else if ("exit" === letter) {
    }
  }

  guess() {
    while (true) {
      this.mask();
      let letter = input(`Input a letter: `);
      let containedInWinWord = this._winWord.includes(letter);//true or false
      let hadTried = this._attemptsLetter.includes(letter) && letter !== "";//true or false

      if (letter.length > 1 || letter.length === 0) {
        console.log("Please, input a single letter.")
        continue;
      }
      if (!"abcdefghijklmnopqrstuvwxyz".includes(letter)) {
        console.log("Please, enter a lowercase letter from the English alphabet.")
        continue;
      }

      if (hadTried) {
        console.log("You've already guessed this letter.")
      } else if (!containedInWinWord && !hadTried) {
        console.log(`That letter doesn't appear in the word.`)
        this._attemptsLetter += letter;
        this._remainAttempts--;
      } else if (containedInWinWord && !hadTried) {
        this._attemptsLetter += letter;
        this.renewMask();
      }
      console.log();

      if (this._remainAttempts === 0) {
        this._loseCount++;
        console.log("You lost!")
        break;
      } else if (this._winWord === this._maskedWord) {
        this._winCount++;
        console.log(`You guessed the word ${this._winWord}!`)
        console.log(`You survived!`)
        break;
      }
    }
  }

  renewMask() {
    this._maskedWord = "";
    for (let i = 0; i < this._winWord.length; i++) {
      if (this._attemptsLetter.includes(this._winWord.charAt(i))) {
        this._maskedWord += this._winWord.charAt(i);
      } else {
        this._maskedWord += "-";
      }
    }
  }

  reset() {
    this._remainAttempts = 8;
    let index = Math.floor(Math.random() * this._wordList.length);
    this._winWord = this._wordList[index];
    this._maskedWord = "";
    for (let i = 0; i < this._winWord.length; i++) {
      this._maskedWord += "-";
    }
    this._attemptsLetter = "";
  }

}

play = new HangMan(8, ["python", "java", "swift", "javascript"]);
play.start();