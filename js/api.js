const URL = "https://api.thecatapi.com/v1";
const secret = 'live_J9AQh9q3XIn68qL5EO2oXgDSqRL5iH4xzexuYBxSWYu1m0sPAIE4k8sy6UDdyb81';

/**
 * The function `object_post` creates an object with properties and values for making a POST request
 * with specific headers and body content.
 * @param content - The `content` parameter is the data that you want to send in the POST request. It
 * should be a JSON object or a string that can be converted to JSON.
 * @returns an object with the following properties: method, mode, credentials, headers, and body.
 */
function object_post(content){
  const obj = {
    method: 'POST',
    mode: 'cors',
		credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': secret
    },
    body: JSON.stringify(
      content
    )
  }
  return obj;
}

/**
 * The function `get_anything` is an asynchronous function that fetches data from a specified URL,
 * calls a callback function with the fetched data, and handles any errors that occur during the fetch.
 * @param url - The `url` parameter is the URL of the API endpoint that you want to fetch data from. It
 * should be a string.
 * @param callback - The callback parameter is a function that will be called with the data retrieved
 * from the URL. It is responsible for handling the data and updating the container element with the
 * appropriate content.
 * @param container - The `container` parameter is the HTML element where you want to display the data
 * retrieved from the API. It could be a div, span, table, or any other HTML element that can hold
 * content.
 * @param [type=random] - The "type" parameter is an optional parameter that specifies the type of data
 * you want to retrieve from the URL. By default, it is set to 'random'. However, you can pass a
 * different value to retrieve a specific type of data.
 */
async function get_anything(url, callback, container, type = 'random'){
  const res = await fetch(url, {
    headers: {
      'x-api-key': secret
    }
  });
  const data = await res.json();
  console.log(data);

  if(res.ok){
    callback(data, container, type);
  } else {
    const error_m = sw_error(res.status, data.message);
    error_m();
  }
}

/**
 * This JavaScript function adds a kitten to the user's favorite list by making an API request.
 * @param id - The `id` parameter represents the unique identifier of the kitten image that you want to
 * add to your favorite list.
 */
async function post_add_favorite_kitten(id){
  const res = await fetch(`${URL}/favourites`, object_post({
    image_id: id
  }));
  const data = await res.json();

  generate_notification(res, data, ' added a cat to your favorite list ');
  get_anything(`${URL}/favourites`, append_images, container_favorite_images, 'favorite');
}

async function delete_favorite_kitten(id){
  const res = await fetch(`${URL}/favourites/${id}`, {
    method: 'DELETE',
    mode: 'cors',
		credentials: 'same-origin',
    headers: {
      'x-api-key': secret
    }
  });
  const data = await res.json();

  generate_notification(res, data, ' deleted a cat from your favorite list ');
  get_anything(`${URL}/favourites`, append_images, container_favorite_images, 'favorite');
}

// Resquest to the API to get images
get_anything(`${URL}/images/search?limit=10`, append_images, container_random_images);

// Request to the API for favorite kittens
get_anything(`${URL}/favourites`, append_images, container_favorite_images, 'favorite');