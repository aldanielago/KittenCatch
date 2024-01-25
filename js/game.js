music_before_game.play();
let count = 0;

paws.forEach(paw => {
  paw.addEventListener('click', () => {
    count++;
    score.textContent = count;
    meow.play();
  });
});

function startGame() {
  welcomePage.classList.add('go-up');
  setTimeout(() => {
    welcomePage.classList.add('none');
    phoneSection.classList.remove('none');
    phoneSection.classList.add('go-down');
    counterBeforeGame();
    countainer_before_game.classList.remove('none');
  }, 1000);
}

function counterBeforeGame() {
  music_before_game.pause();
  music_countdown.currentTime = 0;
  music_countdown.play();
  reverseCounter.textContent = 3;
  setTimeout(() => {
    reverseCounter.textContent = 2;
  }, 1000);
  setTimeout(() => {
    reverseCounter.textContent = 1;
  }, 2000);
  setTimeout(() => {
    borderReverseCounter.classList.add('none');
    reverseCounter.textContent = 'GO';
  }, 3000);
  setTimeout(() => {
    countainer_before_game.classList.add('disappear');
    countainer_before_game.classList.add('none');
    counterDuringGame();
    music_countdown.pause();
    countainer_before_game.classList.remove('disappear');
  }, 4000);
}

function counterDuringGame() {
  music_during_game.currentTime = 0;
  music_during_game.play();
  let time = 9;
  const timer = setInterval(() => {
    if (time === 0) {
      clearInterval(timer);
      endGame();
    } else {
      time--;
      gameContainer.textContent = time;
    }
  }, 1000);
}

function endGame() {
  container_end_game.classList.remove('none');
  music_during_game.pause();
  music_after_game.currentTime = 0;
  music_after_game.play();
  setTimeout(() => {
    container_end_game.classList.add('none');
    phoneSection.classList.remove('go-down');
    phoneSection.classList.add('go-up-phone');
  }, 2000);
  setTimeout(() => {
    phoneSection.classList.add('none');
    endGameSection.classList.remove('none');
    endGameSection.classList.add('go-down-end-game');
    scoreEndGame.textContent = count;
    saveScore(count);
    best_score.textContent = localStorage.getItem('score');
  }, 3000);
  setTimeout(() => {
    music_after_game.pause();
    music_before_game.currentTime = 0;
    music_before_game.play();
  }, 5000);
}

function saveScore(score) {
  if(!localStorage.getItem('score') || localStorage.getItem('score') < score) {
    localStorage.setItem('score', score);
  }
  count = 0;
}
