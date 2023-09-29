// DOM MANIPULATION //
const $ = (id) => document.querySelector(id);

// Principal page
const paws = document.querySelectorAll('.paw');

// Api requests section
const container_random_images = $('#container-random-images');
const container_favorite_images = $('#container-favorite-images');
const btn_change_cat = $('.btn-change-cat');

// DOM INTERACTION //
btn_change_cat.addEventListener('click', () => {
  get_anything(`${URL}?limit=3`, append_images, container_random_images);
});


function append_images(data, container){
  container.innerHTML = '';
  data.forEach(e => {
    const mini_container = document.createElement('div');
    mini_container.classList.add('relative')
    const img = create_image_cat(e);
    const btn = create_favorite_button();

    mini_container.innerHTML += img.outerHTML;
    mini_container.innerHTML += btn.outerHTML;
    container.innerHTML += mini_container.outerHTML;
  });
};

function create_image_cat(e){
  const img = document.createElement('img');
  img.src = e.url;
  img.alt = e.id;
  img.classList.add('img_cat');
  return img;
}

function create_favorite_button(){
  const btn = document.createElement('button');
  const img = document.createElement('img');
  img.src = './assets/suit-heart.svg';
  btn.classList.add('btn_dislike')

  btn.appendChild(img);
  btn.addEventListener('click', post_add_favorite_kitten)
  return btn;
}