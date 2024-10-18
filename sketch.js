let dice = [];
let numberOfDice = 5;
let keyPressCount = 0;
let message = ""; // Variable to store the message

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numberOfDice; i++) {
    dice[i] = new Die(50); // Argument is the size of the die
  }
}

function draw() {
  background("lightblue");
  
  // Loop over the array and place+display each die
  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    die.place(die.size * 1.2 * i + die.size, die.size * 2);
    die.display(); // Actually draw it on screen
  }

  textSize(32);
  fill(0);
  text("Keys pressed: " + keyPressCount, 200, height / 2);

  // Display the message if it exists
  if (message) {
    fill(0, 255, 0); // Green text
    stroke(0); //black stroke
    strokeWeight(2);
    textSize(48);
    textAlign(CENTER, CENTER);
    text(message, width / 2, height / 2); // Display the message
  }
}

function mouseClicked() {
  // Uncomment and implement the freeze logic if needed
}

function keyPressed() {
  if (keyPressCount < 5) {
    shakeDice();
    keyPressCount++;
  }
}

function deviceShaken() {
  shakeDice();
}

function shakeDice() {
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
      break; // Exit after setting the message
    }
  }
}
