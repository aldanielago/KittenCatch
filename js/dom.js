const $ = (id) => document.querySelector(id);

// Game
const score = document.querySelector('#score');
const paws = document.querySelectorAll('.paw');

// Welcome page
const first_section = $('.welcome-page');
const i_play_music = $('#i-play-music');

// 3 seconds before game
const container_before_game = $('.container-counter-before-game');
const reverse_counter = $('.reverse-counter');
const border_reverse_counter = $('.border-button-blur');

// During the game
const game_counter = $('.counter-during-game');
const game_section = $('.phone');

// End game
const container_end_game = $('.container-after-game');
const section_end_game = $('.end-game-section');
const game_score = $('#score-end-game');
const best_score = $('#best-score');

// Music
const music_before_game = $('#music-before-game');
const music_during_game = $('#music-during-game');
const music_after_game = $('#music-after-game');
const music_countdown = $('#music-countdown');
const meow = $('#meow');

// API
const api_section = $('.api-section')
const container_random_images = $('#container-random-images');
const container_favorite_images = $('#container-favorite-images');
const btn_change_cat = $('.btn-change-cat');
const form = $('.form-upload-kitten');

btn_change_cat.addEventListener('click', () => {
  get_anything(`${URL}/images/search?limit=10`, container_random_images);
});

function append_images(data, container, type){
  container.innerHTML = '';
  data.forEach(e => {
    const mini_container = document.createElement('div');
    mini_container.classList.add('relative');
    const img = create_image_cat(e, type);
    const btn = create_favorite_button(e, type);

    mini_container.appendChild(img);
    mini_container.appendChild(btn);
    container.appendChild(mini_container);
  });
};

function create_image_cat(e, type){
  const img = document.createElement('img');
  type == 'random' ? img.src = e.url : img.src = e.image.url;
  img.alt = e.id;
  img.classList.add('img_cat');
  return img;
};

function create_favorite_button(e, type){
  const btn = document.createElement('button');
  const img = document.createElement('img');
  type == 'random' ? img.src = './assets/suit-heart.svg' : img.src = './assets/suit-heart-fill.svg'

  btn.classList.add('btn_heart')
  btn.addEventListener('click', () => {
    type == 'random' ? post_add_favorite_kitten(e.id) : delete_favorite_kitten(e.id);
  });

  btn.appendChild(img);
  return btn;
};
