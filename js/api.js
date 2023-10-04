const URL = "https://api.thecatapi.com/v1";
const secret = 'live_J9AQh9q3XIn68qL5EO2oXgDSqRL5iH4xzexuYBxSWYu1m0sPAIE4k8sy6UDdyb81';


/**
 * The function `object_post` creates an object with properties for making a POST request with
 * specified content and content type.
 * @param content - The `content` parameter is the data that you want to send in the POST request. It
 * can be a string, an object, or any other valid data type that you want to send to the server.
 * @param content_type - The `content_type` parameter specifies the type of content being sent in the
 * request body. It could be a string such as "application/json" for JSON data,
 * "application/x-www-form-urlencoded" for form data, or any other valid content type.
 * @returns an object with the following properties: method, mode, credentials, headers, and body.
 */
function object_post(content, content_type){
  const obj = {
    method: 'POST',
    mode: 'cors',
		credentials: 'same-origin',
    headers: {
      'x-api-key': secret
    },
    body: content
  }

  if(content_type){
    obj.headers['Content-Type'] = content_type
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
async function get_anything(url, container, type = 'random'){
  const res = await fetch(url, {
    headers: {
      'x-api-key': secret
    }
  });
  const data = await res.json();

  if(res.ok){
    append_images(data, container, type);
  } else {
    const error_m = sw_error(res.status, data.message);
    error_m();
  }
}


/**
 * The function `post_add_favorite_kitten` sends a POST request to add a kitten to the user's favorite
 * list, generates a notification, and updates the favorite images container.
 * @param id - The `id` parameter is the unique identifier of the kitten image that you want to add to
 * your favorite list.
 */
async function post_add_favorite_kitten(id){
  const res = await fetch(`${URL}/favourites`, object_post(
    JSON.stringify({ image_id: id }), 'application/json'
  ));
  const data = await res.json();

  generate_notification(res, data, 'added a cat to your favorite list');
  get_anything(`${URL}/favourites`, container_favorite_images, 'favorite');
}

/**
 * The function `delete_favorite_kitten` deletes a favorite kitten from a list and generates a
 * notification.
 * @param id - The `id` parameter is the unique identifier of the favorite kitten that you want to
 * delete from the list.
 */
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

  generate_notification(res, data, 'deleted a cat from your favorite list');
  get_anything(`${URL}/favourites`, container_favorite_images, 'favorite');
}

/**
 * The function uploads a kitten photo, adds it to favorites, generates a notification, and retrieves
 * favorite images.
 */
async function upload_kitten_photo(){
  const form_data = new FormData(form);
  const res = await fetch(`${URL}/images/upload`, object_post(form_data));
  const data = await res.json();

  post_add_favorite_kitten(data.id)
  generate_notification(res, data, 'uploaded a photo of you kitten');
  get_anything(`${URL}/favourites`, container_favorite_images, 'favorite');
}

get_anything(`${URL}/images/search?limit=10`, container_random_images);
get_anything(`${URL}/favourites`, container_favorite_images, 'favorite');