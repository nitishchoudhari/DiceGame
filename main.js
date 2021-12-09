'use strict';

const diceImg = document.querySelector('.dice');

//buttons
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnOpenModal = document.querySelector('.btn--instructions');
const btnCloseModal = document.querySelector('.close-modal');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const activePlayer0 = document.querySelector('.player--0');
const activePlayer1 = document.querySelector('.player--1');


let currScore0El = document.getElementById(`current--0`);
let currScore1El = document.getElementById(`current--1`);
let score0El = document.getElementById(`score--0`);
let score1El = document.getElementById(`score--1`);

let scores, currScore, activePlayer, isPlaying;

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.style.backgroundImage = 'linear-gradient(to top left, #434343 0%, #000000 100%)';
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    document.body.style.backgroundImage = 'linear-gradient(to top left, #753682 0%, #bf2e34 100%)';
};

function init() {
    scores = [0, 0];
    currScore = 0;
    activePlayer = 0
    isPlaying = true;

    currScore0El.textContent = 0;
    currScore1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    diceImg.classList.add('hidden');
    activePlayer0.classList.remove('player--winner');
    activePlayer1.classList.remove('player--winner');
    activePlayer0.classList.add('player--active');
    activePlayer1.classList.remove('player--active');

}

init();


function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer0.classList.toggle('player--active');
    activePlayer1.classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    currScore = 0;
}



btnRoll.addEventListener('click', rollDicePlayer);


function rollDicePlayer() {
    if (isPlaying) {
        diceImg.classList.remove('hidden');
        let dice = Math.floor(Math.random() * 6) + 1;
        diceImg.setAttribute('src', `images/dice-${dice}.png`)
        // diceImg.src = `dice-${dice}.png`;
        if (dice !== 1) {
            currScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currScore;
        } else {
            switchPlayer()
        }
    }
}

btnHold.addEventListener('click', holdScore);
function holdScore() {
    if (isPlaying) {
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        scores[activePlayer] += currScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 60) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceImg.classList.add('hidden');
            isPlaying = false;
        }
        switchPlayer()
    }
}

btnNew.addEventListener('click', init);

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);