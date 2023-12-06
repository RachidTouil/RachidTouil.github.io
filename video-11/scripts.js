const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let carteRetourne=0;
let message=document.getElementById('message');
let bestScore=1000;




function flipCard() {
  if (lockBoard)  return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards() ;
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  // j'incremente la variable carteRetourne pour savoir si toutes les cartes son retournées
  carteRetourne++;
  
  

  resetBoard();
}

function unflipCards() {
  lockBoard = true
  ;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

//ajout du compteur de click s'arrete si toutes les carte sont retournées
let nbClick=0;
function compteurClick(){
  if(carteRetourne!=6){
  let compteur=document.getElementById('nb-click');
  nbClick++;
  compteur.innerText=nbClick;
}
else{
message.innerText="Bravo tu as gagné ";
if(nbClick<bestScore)
bestScore=nbClick;
localStorage.setItem('bestScore',bestScore);
}
}
let divBestScore=document.getElementById('bestScore');
divBestScore.textContent+=localStorage.getItem('bestScore');

