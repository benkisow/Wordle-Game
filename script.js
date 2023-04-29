// FOR TESTING - CORRECT WORD IS TRACE
var wordList = ['TOPIC','CLUCK','MARRY','GRILL','FACTS','CEDAR','CLEAN','STAFF','CRISP','PAUSE','DUSKY','CHUGS','TIRES','WHILE','CLADE'
		,'HIGHS','HANGS','EDGED','CUSHY','DRYER','RESIN','BEADS','HEELS','BOOBY','HOTEL','HOPES','FINCH','HANDS','BONGO','CARTS'
		,'DOUBT','BURNS','BULBS','SAUCE','PAPER','BARMY','CRAPE','GHOST','SCOPE','BELLY','DOPES','EXACT','BARGE','AGGRO','BLUFF'
		,'BLEEP','SHOPS','COILS','DASHI','CAMPY','BLACK','ASHES','MATES','AGREE','FLEAS','BONKS','CLONE','LISTS','FRIED','DIKES'
		,'ELVES','EWERS','CRIER','COVEY','GRAPE','NOTCH','SLICE','BURRO','FISTS','WIRED','FUNNY','DAMES','TERMS','CREPE','DOLED'
		,'SOULS','DOPED','ITEMS','BIRTH','CHUGS','DIPPY','CHAPS','FORMS','SKINS','SIGHT','CAPON','ERROR','SQUAD','DELFT','FILLY'
		,'POSED','ASSET','LIVED','DUOMO','FELON','COLTS','BURKA','BOUGH','STEMS','COOPS','TABLE']
var numberOfWords = wordList.length;
var randomNumber = Math.floor(Math.random() * numberOfWords);
var correctWord = wordList[randomNumber];
// FOR TESTING - CORRECT WORD IS TRACE


// Enable first input and put focus on it
var firstLetter = document.getElementById("guess-1").elements["letter-1"];
firstLetter.removeAttribute("disabled");
firstLetter.focus();


// Add event listener to all letters for backspace
var allInputs = document.querySelectorAll("input[type=text]");

allInputs.forEach(function (value, i) {
	allInputs[i].addEventListener("keydown", function(event) {
		if (event.key == "Backspace") {
			var inputForm = this.form.id;

			if (allInputs[i].name != "letter-1") {
				var currentInput = Number(allInputs[i].name.slice(-1));
				var prevInput = currentInput - 1;

				document.getElementById(inputForm).elements["letter-" + prevInput].value = "";
				document.getElementById(inputForm).elements["letter-" + prevInput].removeAttribute("disabled");
				document.getElementById(inputForm).elements["letter-" + prevInput].removeAttribute("readonly");
				document.getElementById(inputForm).elements["letter-" + prevInput].focus();
			}
		}
	})
})


// Function for if user wins the game
function youWin() {
	document.getElementById("endgame-message").style.visibility = "visible";
	document.getElementById("endgame-message").innerHTML = "You Win!<br><button id='play-again-btn' onClick='window.location.reload();''>Play Again</button>";
}


// Function to check the guess against the correct word
function checkGuess(form) {
	var inputs = document.getElementById(form).elements;

	var numberCorrect = 0;

	for (var i = 0; i < inputs.length; i++) {
		var letter = inputs[i].value.toUpperCase();

		if (letter == correctWord[i]) {
			inputs[i].style.backgroundColor = "rgb(169,209,142)";
			numberCorrect = numberCorrect + 1;
		} else {
			if (correctWord.includes(letter) === true){
				inputs[i].style.backgroundColor = "rgb(255,217,102)";
			} else {
				inputs[i].style.backgroundColor = "rgb(201,201,201)";
			}
		}
	}

	if (numberCorrect == 5) {
		youWin();
		return true;
	} else {
		if (form == "guess-6") {
			document.getElementById("endgame-message").style.visibility = "visible";
			document.getElementById("endgame-message").innerHTML = "You didn't get it!<br>The word was " + correctWord + "<br><button id='play-again-btn' onClick='window.location.reload();''>Play Again</button>";
		}
		return false;
	}
}


// Function to run whenever user inputs a letter
// 1. Doesn't take input if it is not a letter a-zA-Z
// 2. If it is a letter a-zA-Z, makes input readonly and moves to next input
function onInput(input) {
	// Get form parent of input
	var form = input.form.id;

	// Derive current guess from form id parameter and calc next guess
	var currentGuess = Number(form.slice(-1));
	var nextGuess = currentGuess + 1;

	// Derive current letter from form id parameter and calc next letter
	var currentLetter = Number(input.name.slice(-1));
	var nextLetter = currentLetter + 1;

	if (input.name == "letter-5") {
		if (!/^[a-zA-Z]*$/g.test(input.value)) {
	        input.value = input.value.replace(/[^a-zA-Z]/g, '');
	        input.focus();
	        return false;
	    } else {
			if (form == "guess-6") {
				document.getElementById(form).elements[input.name].setAttribute("readonly","true");
				checkGuess(form);
			} else {
				document.getElementById('guess-' + nextGuess).elements["letter-1"].removeAttribute("disabled");
				document.getElementById('guess-' + nextGuess).elements["letter-1"].focus()
				document.getElementById(form).elements[input.name].setAttribute("readonly","true");
				checkGuess(form);
				if(checkGuess(form)) {
					document.getElementById('guess-' + nextGuess).elements["letter-1"].setAttribute("readonly","true");
				}
			}
		}
	} else {
		if (!/^[a-zA-Z]*$/g.test(input.value)) {
	        input.value = input.value.replace(/[^a-zA-Z]/g, '');
	        input.focus();
	        return false;
	    } else {
	    	document.getElementById(form).elements["letter-" + nextLetter].removeAttribute("disabled");
			document.getElementById(form).elements["letter-" + nextLetter].focus();
			document.getElementById(form).elements[input.name].setAttribute("readonly","true");
	    }
	}
}
