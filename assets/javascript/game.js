
var userText = document.getElementById("user-text");
var computerChoices = ["man with mango", "Teddy bear running in the woods"];
var numguessText = document.getElementById("numguess-text");
var correctAnswer = document.getElementById("correctAnswer");
var wrongCharArray = [];
var rightCharArray = [];
var winCount = 0;
var loseCount=0;
var numberOfGuesses = 11;
var complete = 0;
var spacesCount = 0;
var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
createButtons(computerGuess.length);
numguessText.textContent = numberOfGuesses;


//This function creates the alphabet buttons
function createButtons(length) {
  var btn;
  var counter = 0;
  spacesCount =  computerGuess.split(' ').length - 1
  //alert(computerGuess.replace(/\s+/g, ''))
  imageToConsole(computerGuess);
  var position = 0;
  var plain_count = 0;
  for (var i = 0; i < length; i++) {
    if (computerGuess[i] == " ") {
      btn = document.createElement("div2");
      btn.setAttribute("id", "plain" + plain_count);
      plain_count = plain_count + 1;
      document.getElementById("spaces").appendChild(btn);
    } else {
      btn = document.createElement("div");
      btn.setAttribute("id", "pos" + position);
      document.getElementById("spaces").appendChild(btn);
      position = position + 1;
    }
    
    
  }
  computerGuess = computerGuess.replace(/\s+/g, '');
  computerGuess = computerGuess.toLowerCase();
}

//This function  checks for guessedcharacter position in the word and highlights the button color with red or green
function characterPosition(guessedChar) {
  for (var i = 0; i < computerGuess.length; i++) {
    if (guessedChar === computerGuess.charAt(i)) {
      rightCharArray.push(guessedChar);
      document.getElementById(guessedChar).style.backgroundColor = "#afe4c3";
      document.getElementById("pos" + i).innerText = guessedChar;

    }
  }
}

//This function check if the character typed by user is already entered or not
function duplicateCharCheck(dupChar) {
  if ((wrongCharArray.includes(dupChar) || rightCharArray.includes(dupChar)) && numberOfGuesses >= 1) {
    return false;
  }
  else
    return true;
}

//This function deletes the guessing word divs for the player to start again
function deleteElement(length) {
  var parentElement = document.getElementById("spaces");
  var child;
  for (var i = 0; i < length; i++) {
    child = document.getElementById("pos" + i);
    parentElement.removeChild(child);

  }

  for (var i = 0; i < spacesCount; i++) {
    child = document.getElementById("plain" + i);
    parentElement.removeChild(child);

  }
}

//This function deletes the Image display on asidenav
function deleteImage() {
  var parent = document.getElementById("answerImage");
  var child = document.getElementById("animalImg");
  child.parentNode.removeChild(child);

}

//This function resets the game for the player to play again
function clear() {
  userText.innerText = "";
  numguessText.innerText = "";
  //document.getElementById("comp-text").innerText = "";
  //wrongText.innerText = "";
  correctAnswer.innerText = "";
  deleteElement(computerGuess.length);
  wrongCharArray = [];
  rightCharArray = [];
  numberOfGuesses = 10;
  computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
  createButtons(computerGuess.length);
  complete = 0;
  //remove image
  deleteImage();
  //This code resets the green and red color buttons to its original color
  let line1 = document.getElementById("line1").querySelectorAll('div');
  for (index = 0; index < line1.length; index++) {
    line1[index].style.backgroundColor = "#f2f9fb";
  }
  let line2 = document.getElementById("line2").querySelectorAll('div');
  for (index = 0; index < line2.length; index++) {
    line2[index].style.backgroundColor = "#f2f9fb";
  }

}

//This function prints the output in user screen
function printToConsole(text, value) {
  //wrongText=wrongCharArray.slice(0, -1).join(', ');
  (text).innerText = value;
}

//This function prints the image to the screen
function imageToConsole(location) {
  var DOM_img = document.createElement("img");
  var DOM_parent = document.getElementById("answerImage");
  DOM_img.src = "assets/images/" + location + ".png";
  DOM_img.setAttribute("class", "animal");
  DOM_img.setAttribute("alt", "animal");
  DOM_img.setAttribute("id", "animalImg");
  DOM_parent.appendChild(DOM_img);
  //document.getElementById("answerImage").innerHTML("<img src='assets/images/'"+location+"'.jpg' class='animal' alt='animal'>");
  // complete = 1;//This variable checks and stops adding more images 
}

function playAgain() {
  clear();

}

function closeFunc(){
  window.close();
}

// Next, we give JavaScript a function to execute when onkeyup event fires.
document.onkeyup = function (event) {
  userText.textContent = (event.key).toLowerCase();
  var temp = userText.textContent;
  //This if condition checks for duplicate char entered by user and blocks to print more then one image displayed on asidenav bar
  if (duplicateCharCheck(temp) && complete == 0) {
    // alert("inside dup");
    if (numberOfGuesses >= 1 && rightCharArray.length <= computerGuess.length) {
      if (computerGuess.includes(temp)) {
        characterPosition(temp);
        if (rightCharArray.length == computerGuess.length) {

          printToConsole(correctAnswer, "You win !!! your score is " + ++winCount);
          document.getElementById("yes").disabled = false;
          document.getElementById("no").disabled = false;
        }
      }
      else {
        wrongCharArray.push(temp);
        document.getElementById(temp).style.backgroundColor = "#e4afb5";
        // printToConsole(wrongText, wrongCharArray);
        --numberOfGuesses;
        printToConsole(numguessText, numberOfGuesses)
      }
    }
    else {
      var tempText = "The correct word is " + computerGuess + " you lose " + ++loseCount +" times";
      printToConsole(correctAnswer, tempText);
      document.getElementById("yes").disabled = false;
      document.getElementById("no").disabled = false;
    }
  }
  else if (numberOfGuesses == 0) {
    printToConsole(correctAnswer, computerGuess);
  }
};
