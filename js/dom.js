const $ = (id) => document.querySelector(id);

// Api requests section
const container_random_images = $('#container-random-images');
const container_favorite_images = $('#container-favorite-images');
const btn_change_cat = $('.btn-change-cat');
const form = document.querySelector('.form-upload-kitten');

btn_change_cat.addEventListener('click', () => {
  get_anything(`${URL}/images/search?limit=10`, container_random_images);
});

/**
 * The function appends images to a container element based on the provided data and type.
 * @param data - The `data` parameter is an array of objects that contains information about the images
 * to be appended. Each object in the array represents an image and its associated data.
 * @param container - The "container" parameter is the HTML element where the images will be appended
 * to. It should be a valid DOM element, such as a div or a section.
 * @param type - The "type" parameter is a string that specifies the type of images to be appended. It
 * could be used to determine the source or category of the images, such as "cats", "dogs", or
 * "landscapes".
 */
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

/**
 * The function creates an image element with a cat image and assigns it a class and alt attribute
 * based on the provided data.
 * @param e - The parameter "e" is an object that represents a cat. It contains properties such as
 * "url" and "image.url" which are used to set the source of the image element. The "id" property is
 * used to set the alt attribute of the image.
 * @param type - The "type" parameter is used to determine the type of image to create. It can have two
 * possible values: "random" or any other value.
 * @returns an HTML `img` element.
 */
function create_image_cat(e, type){
  const img = document.createElement('img');
  type == 'random' ? img.src = e.url : img.src = e.image.url;
  img.alt = e.id;
  img.classList.add('img_cat');
  return img;
}

/**
 * The function creates a favorite button with a heart icon and adds event listeners based on the type
 * parameter.
 * @param e - The parameter "e" is an object representing the kitten element that the favorite button
 * is being created for. It likely contains information about the kitten, such as its ID or other
 * properties.
 * @param type - The "type" parameter is a string that determines the type of favorite button to
 * create. It can have two possible values: "random" or any other value.
 * @returns a button element with an image element inside it.
 */
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
}