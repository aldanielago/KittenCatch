/**
 * The function `sw_succes` displays a success message using the SweetAlert library.
 * @param message - The message parameter is a string that represents the text to be displayed in the
 * success message.
 * @returns The function `sw_succes` returns a function called `succes`.
 */
function sw_succes(message){
  const succes = () =>{
    swal({
      title: "Succes!",
      text: message,
      icon: "success",
      button: false,
      timer: 2000
    });
  }
  return succes;
}

/**
 * The function `sw_error` displays an error message using the SweetAlert library.
 * @param title - The title parameter is a string that represents the title of the error message. It is
 * displayed at the top of the error message box.
 * @param message - The `message` parameter is a string that represents the error message that will be
 * displayed in the error dialog.
 * @returns The function `sw_error` returns another function called `error`.
 */
function sw_error(title, message){
  const error = () =>{
    swal({
      title: title,
      text: message,
      icon: "error",
    });
  }
  return error;
}

/**
 * The function generates a notification message based on the response status and data.
 * @param res - The "res" parameter is typically an object that represents the response received from
 * an API request. It contains information such as the status code and the response body.
 * @param data - The `data` parameter is an object that contains additional information related to the
 * response. It could include details such as an error message or any other relevant data.
 * @param action - The "action" parameter is a string that represents the action that was performed. It
 * is used to generate a success message for the notification.
 */
function generate_notification(res, data, action){
  if(res.ok){
    const succes_m = sw_succes('You have ' + action + ' succesfull!');
    succes_m();
  } else {
    const error_m = sw_error(res.status, data.message);
    error_m();
  }
}