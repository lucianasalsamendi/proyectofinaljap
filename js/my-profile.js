/*! Acá empieza Dark and light
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector("#bd-theme");

    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherText = document.querySelector("#bd-theme-text");
    const activeThemeIcon = document.querySelector(".theme-icon-active use");
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );
    const svgOfActiveBtn = btnToActive
      .querySelector("svg use")
      .getAttribute("href");

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });

    btnToActive.classList.add("active");
    btnToActive.setAttribute("aria-pressed", "true");
    activeThemeIcon.setAttribute("href", svgOfActiveBtn);
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
    themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

    if (focus) {
      themeSwitcher.focus();
    }
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme, true);
      });
    });
  });
})();

/*Aca termina dark and light*/

document.addEventListener("keyindex", function (event) {
  if (event.key === "Tab") {
    const campos = Array.from(document.getElementsByTagName("input"));
    const campoActual = document.activeElement;
    const currentIndex = campos.indexOf(campoActual);

    if (currentIndex > -1) {
      let nextIndex;
      if (event.shiftKey) {
        // Si se presiona Shift + Tab, navegar hacia la izquierda.
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = campos.length - 1;
        }
      } else {
        // Si se presiona Tab, navegar hacia la derecha.
        nextIndex = (currentIndex + 1) % campos.length;
      }

      campos[nextIndex].focus();
      event.preventDefault();
    }
  }
});

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function displayImage() {
  const selectedImage = document.getElementById("selectedImage");
  const imagenInput = document.getElementById("imagenInput");
  const imagenPerfilDiv = document.getElementById("imagenPerfil");

  if (imagenInput.files && imagenInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      selectedImage.src = e.target.result;
      // Show the image
      selectedImage.style.display = "block";

      const imageDataURL = e.target.result;
      localStorage.setItem("selectedImage", imageDataURL);

      // Hide the SVG when an image is selected
      imagenPerfilDiv.querySelector("svg").style.display = "none";
    };

    reader.readAsDataURL(imagenInput.files[0]);
  }
}

window.onload = function () {
  const selectedImage = document.getElementById("selectedImage");
  const storedImageDataURL = localStorage.getItem("selectedImage");
  const imagenPerfilDiv = document.getElementById("imagenPerfil");

  if (storedImageDataURL) {
    selectedImage.src = storedImageDataURL;
    // Show the image
    selectedImage.style.display = "block";
    imagenPerfilDiv.querySelector("svg").style.display = "none";
  }
};

// Función para cargar los datos desde el localStorage y llenar los campos
function cargarDatos() {
  const nombre = localStorage.getItem("nombre");
  const apellido = localStorage.getItem("apellido");
  const email = localStorage.getItem("email");
  const telefono = localStorage.getItem("telefono");
  const imagen = localStorage.getItem("imagenPerfil")

  if (nombre) {
    document.getElementById("nombre").value = nombre;
  }
  if (apellido) {
    document.getElementById("apellido").value = apellido;
  }
  if (email) {
    document.getElementById("mail").value = email;
  }
  if (telefono) {
    document.getElementById("tel").value = telefono;
  }
  if (imagenPerfil){
    document.getElementById('imagenGuardada').src = imagen;
  }
}

// Función para guardar los datos en el localStorage cuando se envía el formulario
function guardarDatos() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("mail").value;
  const telefono = document.getElementById("tel").value;

  localStorage.setItem("nombre", nombre);
  localStorage.setItem("apellido", apellido);
  localStorage.setItem("telefono", telefono);
}

// Llama a la función cargarDatos cuando se carga la página
cargarDatos();

// traer el mail para el input
const inputGmail = document.getElementById("inputMail");
const gmail = localStorage.getItem("user");

function llenarMail() {
  inputGmail.value = gmail;
}
llenarMail();

//imagen perfil 

const defaultFile = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTEyOCAyNmExMDIgMTAyIDAgMSAwIDEwMiAxMDJBMTAyLjEyIDEwMi4xMiAwIDAgMCAxMjggMjZaTTcxLjQ0IDE5OGE2NiA2NiAwIDAgMSAxMTMuMTIgMGE4OS44IDg5LjggMCAwIDEtMTEzLjEyIDBaTTk0IDEyMGEzNCAzNCAwIDEgMSAzNCAzNGEzNCAzNCAwIDAgMS0zNC0zNFptOTkuNTEgNjkuNjRhNzcuNTMgNzcuNTMgMCAwIDAtNDAtMzEuMzhhNDYgNDYgMCAxIDAtNTEgMGE3Ny41MyA3Ny41MyAwIDAgMC00MCAzMS4zOGE5MCA5MCAwIDEgMSAxMzEgMFoiLz48L3N2Zz4=';


const file = document.getElementById('fileInput');
const img = document.getElementById('imagenGuardada');

file.addEventListener('change',e =>{
    if(e.target.files[0]){
       const reader = new FileReader( )
       reader.onload = function( e ){
        img.src = e.target.result;

        
       }
       reader.readAsDataURL(e.target.files[0])
       
    }else{
        img.src = defaultFile;
    }
} )
// eventos al boton 



const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')



    const formulario = document.getElementById("formularioPerfil");
  
    formulario.addEventListener("submit", function (event) {
      if (formulario.checkValidity() === false) {
        event.preventDefault(); // Evita la recarga de la página si no pasa la validación.
      } else {
        // El formulario está listo para ser enviado, puedes ejecutar cualquier acción adicional aquí.
        
        event.preventDefault()
        guardarDatos()
        if (localStorage.getItem('imagenPerfil')) {
          // Actualiza el valor existente en localStorage
          localStorage.setItem("imagenPerfil" , img.src);
        }
        
        if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
        }
      }
    });


