const URL = "https://api.thecatapi.com/v1/images/search";
const secret = 'live_H2wWIYYW8JqbNtD0UrO6qYC0xJxFt8WYCkt9bCgZ64nQHlKbMXjrbqBAf7XZrpbs';

async function get_anything(url, callback, container){
  try {
    const res = await fetch(url);
    const data = await res.json();
    callback(data, container);

  } catch (error) {
    const error_m = sw_error('Something went wrong at get information.', error);
    error_m();
  }
}

async function post_add_favorite_kitten(url){
  try {
    const res = await fetch(url, {
      method: 'POST'
    });
    const data = await res.json();
    sw_succes('Yo have added a cat to your favorite list succesfull!', data.message)
  } catch(error){
    const error_m = sw_error('Something went wrong at post method.', error);
    error_m();
  }
}

// Resquest to the API to get images
get_anything(`${URL}?limit=3`, append_images, container_random_images);

// Request to the API for favorite kittens
get_anything(`${URL}?api_key=${secret}`, append_images, container_favorite_images);