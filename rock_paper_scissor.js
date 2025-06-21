//we have used JSON.parse to convert string into object
//below code is like if the 1st expression is correct then it will work else it will run second expression(like if else)

// Get previously saved scores from localStorage OR if none exist, create a new scores object
let scores = JSON.parse(localStorage.getItem('scores')) || {
  win: 0,
  losses: 0,
  ties: 0
};
updateScoreElement();

// This function updates the displayed score element with the latest win/loss/tie information
function updateScoreElement() {
  // Find the element with class "js-score" on the page
  // Replace its inner HTML with the current scores
  document.querySelector('.js-score')
    .innerHTML = `Wins:${scores.win},losses:${scores.losses},Ties:${scores.ties}`;
}

//COMPUTER MOVE
//let computermove = ''; //Global variable

// This function randomly picks the computer's move as 'Rock', 'Paper', or 'Scissor'
function pickcomputermove() {
  const randomnumber = Math.random(); //selects the number between 0 to 1
  let computermove = '';
  //compter move code
  // Break the random number into 3 equal parts and assign a move based on the part
  if (randomnumber >= 0 && randomnumber < (1 / 3)) {
    computermove = 'Rock';
  } else if (randomnumber >= (1 / 3) && randomnumber < (2 / 3)) {
    computermove = 'Paper';
  } else if (randomnumber >= (2 / 3) && randomnumber < (1)) {
    computermove = 'Scissor';
  }
  // Print the computer's chosen move to the browser console for debugging
  console.log(computermove);
  return computermove; // Return this move to whoever called this function
}

// This variable will keep track of whether auto-play mode is on or off
let isAutoPlaying = false;
// This will store the ID of the setInterval so we can stop it
let intervalId;

//arrow function
// const autoplay = () =>{
//   //entire autoplay function syntax
// }

// This function is for auto-playing the game every 1 second
function AutoPlay() {
  if (!isAutoPlaying) { // If auto-play is OFF
    // Start an interval that plays the game every 1000 ms
    intervalId = setInterval(() => {
      const playerMove = pickcomputermove(); // Pick a random player move as well
      playGame(playerMove); // Play game with that random move
    }, 1000);
    isAutoPlaying = true; // Mark that auto-play is now ON
  } else {
    // If auto-play was already on, clear the interval to stop it
    clearInterval(intervalId);
    isAutoPlaying = false; // Turn off auto-play
  }
}

//instead of onclick we have used this in js
// Attach event listener to the "Rock" button so that playGame('Rock') is called when clicked
document.querySelector('.js-rock-btn')
  .addEventListener('click', () => {
    playGame('Rock');
  })

// Attach event listener to the "Paper" button so that playGame('Paper') is called when clicked
document.querySelector('.js-paper-btn')
  .addEventListener('click', () => {
    playGame('Paper');
  })

// Attach event listener to the "Scissor" button so that playGame('Scissor') is called when clicked
document.querySelector('.js-scissor-btn')
  .addEventListener('click', () => {
    playGame('Scissor');
  })

//if user press r its a rock similary for p and s its paper and scissor
// Listen for keyboard presses to let the user control the game with keys
document.body.addEventListener('keydown', (event) => {
  if (event.key == 'r') {
    playGame('Rock'); // Play Rock if 'r' key is pressed
  } else if (event.key == 'p') {
    playGame('Paper'); // Play Paper if 'p' key is pressed
  } else if (event.key == 's') {
    playGame('Scissor'); // Play Scissor if 's' key is pressed
  }
})

//USER MOVE
// This is the main game function that takes the player's move as input
function playGame(playerMove) {
  // Get computer's move randomly
  const computermove = pickcomputermove();
  let result = ' '; // Default result is blank string

  // Check all the combinations to decide who wins or if it's a tie
  if (playerMove === 'Scissor') {
    if (computermove === 'Rock') {
      result = 'You lose';
    } else if (computermove === 'Paper') {
      result = 'You win';
    } else if (computermove === 'Scissor') {
      result = 'Tie.';
    }
  } else if (playerMove === 'Rock') {
    const computermove = pickcomputermove(); // Gets a new computer move
    if (computermove === 'Rock') {
      result = 'Tie.';
    } else if (computermove === 'Paper') {
      result = 'You lose';
    } else if (computermove === 'Scissor') {
      result = 'You win';
    }
  } else if (playerMove === 'Paper') {
    const computermove = pickcomputermove();
    if (computermove === 'Rock') {
      result = 'You win';
    } else if (computermove === 'Paper') {
      result = 'Tie.';
    } else if (computermove === 'Scissor') {
      result = 'You lose';
    }
  }

  // Increment the correct score counter based on the result
  if (result === 'You win') {
    scores.win += 1;
  } else if (result === 'You lose') {
    scores.losses += 1;
  } else if (result === 'Tie.') {
    scores.ties += 1;
  }

  //stored the score in local storage
  //we have use JSON.stringify because localstrong only supports string so need to convert the score to strings
  localStorage.setItem('scores', JSON.stringify(scores));

  // Display the result on the page
  document.querySelector('.js-result').innerHTML = result;

  // Display both player and computer's moves using images
  document.querySelector('.js-move')
    .innerHTML = `You
            <img src="${playerMove}-emoji.png" class="move-icon">
            <img src="${computermove}-emoji.png" class="move-icon" >
            Computer`;

  // Update the displayed score after every round
  updateScoreElement();
}

// This helper resets all scores and also updates the displayed score
function resetScore() {
  // Set all the values of the score to zero
  scores.win = 0;
  scores.losses = 0;
  scores.ties = 0;
  // Remove scores from localStorage so they don't come back on page reload
  localStorage.removeItem('scores');
  // Update the displayed score to reflect reset
  updateScoreElement();
}
