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
};

function sw_error(title, message){
  const error = () =>{
    swal({
      title: title,
      text: message,
      icon: "error",
    });
  }
  return error;
};

function generate_notification(res, data, action){
  if(res.ok){
    const succes_m = sw_succes('You have ' + action + ' succesfull!');
    succes_m();
  } else {
    const error_m = sw_error(res.status, data.message);
    error_m();
  }
};
