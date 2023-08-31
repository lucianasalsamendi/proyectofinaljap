//El código (document.addEventListener) asegura que el contenido de la página HTML se haya cargado completamente antes de ejecutar el código JavaScript.
  //Se obtiene una referencia al elemento de botón de inicio de sesión con el ID "login" en el DOM.
    //Se agrega un escuchador de eventos al botón de inicio de sesión que espera el evento de clic.
document.addEventListener("DOMContentLoaded", function () {

  const btn = document.getElementById("login");
  
  btn.addEventListener("click", function () {
    //Se obtiene el valor ingresado por el usuario en el campo de entrada con el ID "floatingInput" y se almacena en la variable user.
    const user = document.getElementById("floatingInput").value;
    //Se obtiene el valor ingresado por el usuario en el campo de contraseña con el ID "floatingPassword" y se almacena en la variable password.
    const password = document.getElementById("floatingPassword").value;
    //Se verifica si el checkbox de "recordar" está marcado. Si está marcado, se almacena el nombre de usuario en el (localStorage), de lo contrario, se almacena en el (sessionStorage).
    const recordar = document.querySelector("input[type='checkbox']").checked;
    //La función validarpass() se define para verificar si la longitud del nombre de usuario es mayor que 4 y la longitud de la contraseña es mayor que 6. Si ambas condiciones se cumplen, la función devuelve true, de lo contrario, devuelve false.
    function validarpass() {
      if (user.length > 4 && password.length > 6) {
        return true;
      } else {
        return false;
      }
    }
    //Se verifica si la función validarpass() devuelve true. Si es así, se procede a realizar lo siguiente:
    //Si el checkbox de "recordar" está marcado, se almacena el nombre de usuario en el almacenamiento local.
    //Si el checkbox de "recordar" no está marcado, se almacena el nombre de usuario en el almacenamiento de sesión.
    if (validarpass()) {
      if (recordar) {
        localStorage.setItem("user", user);
      } else {
        sessionStorage.setItem("user", user);
      }
      //Luego, se redirige al usuario a la página "index.html" utilizando window.location.href.
      //Si la función validarpass() devuelve false, se muestra una alerta indicando "Datos incorrectos".
      window.location.href = "index.html";
    } else {
      alert("Datos incorrectos");
    }
  });
});

const isSessionActive = localStorage.setItem("user", user);
  
  // Redirigir según la condición
  if (!isSessionActive) {
    window.location.href = 'login.html';
  }