document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("login");

  btn.addEventListener("click", function () {
    const user = document.getElementById("floatingInput").value;
    const password = document.querySelector("input[type='password']").value;
    const recordar = document.querySelector("input[type='checkbox']").checked;

    function validarpass() {
      if (user.length > 4 && password.length > 6) {
        return true;
      } else {
        return false;
      }
    }

    if (validarpass()) {
      if (recordar) {
        localStorage.setItem("user", user);
      } else {
        sessionStorage.setItem("user", user);
      }

      // Redireccionar al usuario a la página deseada
      window.location.href = "index.html";
    } else {
      alert("Datos incorrectos");
    }
  });
});
