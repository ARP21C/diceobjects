let dice = [];
let numberOfDice = 5;
let keyPressCount = 0;
let message = ""; // Variable to store the message
let gameActive = true; //variable to track if the game is active


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numberOfDice; i++) {
    dice[i] = new Die(50); // Argument is the size of the die
  }
}

function draw() {
  background("lightgrey");
  
  // Loop over the array and place+display each die
  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    die.place(die.size * 1.2 * i + die.size, die.size * 2);
    die.display(); // Actually draw it on screen
  }

  strokeWeight(0);
  textSize(32);
  fill(0);
  text("Keys pressed: " + keyPressCount, 170, 150);

  // Display the message if it exists
  if (message) {
    textSize(48);
    textAlign(CENTER, CENTER);

    if (message.includes("YOU WIN!!")) {
      fill(0, 255, 0); //green text for you win
    } else {
      fill(255, 0, 0); //red text for you lose
    }

    stroke(0);
    strokeWeight(2);
    text(message, width / 2, height / 2); // Display the message
  }
}



function keyPressed() {
  if (keyPressCount < 5 && gameActive) { // Only allow rolling if the game is active
    shakeDice();
    keyPressCount++;
  }

  //check if keyPressCount has reached 5
  if (keyPressCount === 5) {
    message = "YOU LOSE :(";
    gameActive = false; //stops game
  }
}

function deviceShaken() {
  shakeDice();
}

function shakeDice() {
  if (!gameActive) return; // Exit if the game is not active

  let list = "values: ";
  let counts = {}; // Object to hold counts of each die value

  // Reset the message for new rolls
  message = ""; 

  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    die.roll(); // Roll the die to get a new value
    list += die.value + " "; // Add the value to the list

    // Count occurrences of each value
    counts[die.value] = (counts[die.value] || 0) + 1;
  }

  console.log(list); // Log the rolled values
  
  // Check for three of a kind and update the message
  checkForThreeOfAKind(counts);
}

// Function to check for three of a kind and update the message
function checkForThreeOfAKind(counts) {
  for (let value in counts) {
    if (counts[value] >= 3) {
      // If there are three or more of the same value, update the message
      message = "YOU WIN!!" ;
      gameActive = false; //stops game if won
      break; // Exit after setting the message
    }
  }
}
