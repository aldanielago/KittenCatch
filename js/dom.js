const $ = (id) => document.querySelector(id);

const container_random_images = $('#container-random-images');
const container_favorite_images = $('#container-favorite-images');
const btn_change_cat = $('.btn-change-cat');
const form = document.querySelector('.form-upload-kitten');

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
