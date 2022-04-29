const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const timecont = document.getElementById('time-cont')
const endgameEl = document.getElementById('end-game-container');
const kitten = document.getElementById('kitty');
const umberella = document.getElementById('umbrella');
const rain = document.getElementById('rain');

// List of cat breeds
const words = [
  'abyssinian','aegean','bobtail','curl','ringtail','shorthair','wirehair','aphrodite','arabian','australian',
  'balinese','bengal','bambino','bombay','brazilian','british','burmese','burmilla','spangled','chantilly',
  'chartreux','chausie','colorpoint','cornish','cymric','cyprus','devon','donskoy','dragon','dwelf',
  'egyptian','european','exotic','foldex','german','havana','highlander','himalayan','japanese','kanaani',
  'khao','kinkalow','korat','korean','korn','kurilian','lambkin','laperm','lykoi','maine','manx',
  'mekong','minskin','minuet','munchkin','nebelung','norwegian','ocicat','ojos','feral','oregon',
  'oriental','persian','peterbald','pixie','ragamuffin','ragdoll','raas','russian','sawet','savannah',
  'scottish','selkirk', 'serengeti','serrade','siamese','siberian','singapura','snowshoe','sokoke',
  'somali','sphynx','suphalak','thai','tonkinese','toybob','toyger','turkish','ukranian','york'
];
let randomWord;
let score = 0; 
let time = 20; // default countdown time
let timePassed = 0; // use this to stop player from going to far if they're too good at the game
let kittyDirection = 1; // 1 is right 0 is left
let umbDirection = 1; // 1 is right 0 is left
let kittenStyle = 100; // default start spot
let umberellaStyle = 10; //defualt start spot
let max = 800; // max distance traveled going right
let min = 10; // min distance traveling to left
let increment = 0;
let endMessage = "";

kitten.src = "./pics/cat.png" //apply on first load.

// Focus on text on start
text.focus();
makeItRain();
const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timePassed++;
  timeEl.innerHTML = time + 's';
  if(time < 10){
    timecont.style.color === 'red' ? timecont.style.color = 'black' : timecont.style.color = 'red';
  }
  if (kittenStyle === max) {
    kittyDirection = 0;
    kitten.src = "./pics/cat2.png"
  }
  if (kittenStyle === min) {
    kittyDirection = 1;
    kitten.src = "./pics/cat.png"
  }

  if (kittyDirection === 1) {
    kittenStyle += 10;
  }
  if (kittyDirection === 0) {
    kittenStyle -= 10;
  }

  kitten.style.left = `${kittenStyle}px`;


  // game over conditions ------------------------------
  if (kittyDirection === 1){
    if (kittenStyle - umberellaStyle > 260){
      clearInterval(timeInterval);
      gameOver();
    }
  }
  if (kittyDirection === 0){
    if (umberellaStyle - kittenStyle > 30){
      clearInterval(timeInterval);
      gameOver();
    }
  }
  if (time === 0) { // remove time? or time attack mode?
    clearInterval(timeInterval);
    gameOver();
  }
}

// Game over, show end screen -----------------------------
function gameOver() {
  time === 0 ? endMessage = "Time's up!" : endMessage = "The Kitten got too wet!";
  
  endgameEl.innerHTML = `
  <h1>Game Over</h1>
  <p>${endMessage}</p>
  <p>Cat breeds typed correctly: ${score}</p>
  <button onclick="location.reload()">Play Again</button>
`;

  endgameEl.style.display = 'flex';
}

function correctWord() {
  // check if going left or right
  if (umberellaStyle >= max) {
    umbDirection = 0;
  }
  if (umberellaStyle <= min) {
    umbDirection = 1;
  }
  // 
  if(score > timePassed){
    if(umbDirection = 0){
      umberellaStyle = kittenStyle - 20;
    } else {
      umberellaStyle = kittenStyle + 20;
    }
  } else {
    if (umbDirection === 1) {
      umberellaStyle += 20; //change how many pixels the umbrella moves depending difficulty
    }
    if (umbDirection === 0) {
      umberellaStyle -= 20;
    }
  } 
  umberella.style.left = `${umberellaStyle}px`
}
addWordToDOM();

text.addEventListener('input', e => {
  const insertedText = e.target.value;
  if (insertedText === "swap") {
    umbDirection === 1 ? umbDirection = 0 : umbDirection = 1;
    console.log(umbDirection);
    e.target.value = '';
  }
  if (insertedText === randomWord) { // maybe include a if insertedText === "swap" or something
    addWordToDOM();
    updateScore();

    // Clear text box when word matches
    e.target.value = '';
    correctWord();
    time += 3;  //add 3 seconds
    updateTime();
  }
});


// rain background -------------------------------------------------------------
function makeItRain() {
  rain.innerHTML="";
  while (increment < 100) {
    let randomStyle = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
    let randomBottom = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
    //increment with a smol number
    increment += randomBottom
    
    let innerHTMLRain = ('<div class="drop" style="left: ' + increment 
       + '%; bottom: '+ (randomBottom + randomBottom - 1 + 100) 
       + '%; animation-delay: 0.' + randomStyle 
       + 's; animation-duration: 0.5' + randomStyle 
       + 's;"><div class="stem" style="animation-delay: 0.' + randomStyle 
       + 's; animation-duration: 0.5' + randomStyle 
       + 's;"></div></div>');
    rain.insertAdjacentHTML('beforeend', innerHTMLRain); 
  }
}
