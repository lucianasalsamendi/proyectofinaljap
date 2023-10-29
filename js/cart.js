// URL de la API
const CARTURL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

document.addEventListener('DOMContentLoaded', async function () {
  const listado = document.getElementById('cart-data');
  const listadoInfoCart = await getJSONData(CARTURL);

  const cartItems = JSON.parse(localStorage.getItem('carrito')) || [];

  function removeItemFromCarrito(itemId) {
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
      cartItems.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(cartItems));
      displayCarritoItems(); 
    }
  }


  function displayCarritoItems() {
    listado.innerHTML = ''; 

    cartItems.forEach((cart, index) => {
      listado.innerHTML += getHTML(cart, index);
      subTotal(cart.unitCost, cart.count, index);
    });

    listadoInfoCart.data.articles.forEach(function (cart) {
      listado.innerHTML += getHTML(cart);
    });

    const deleteButtons = document.querySelectorAll('.bi-trash-fill');
    deleteButtons.forEach((button, index) => {
      button.addEventListener('click', function () {
        const itemId = cartItems[index].id;
        removeItemFromCarrito(itemId);
      });
    });
  }

  displayCarritoItems();
});

function getHTML(cart, index) {
  return `<tr>
      <td><img class="img-fluid" width="60" height="60" src="${cart.image}" alt=""></td>
      <td><p>${cart.name}</p></td>
      <td>${cart.currency} ${cart.unitCost}</td> 
      <td><input id="cantidad_${index}" type="number" min="1" max="100" value="${cart.count}" oninput="subTotal(${cart.unitCost}, this.value, ${index})"></td>
      <td><strong> ${cart.currency}<span id="multiplicacion_${index}">  ${cart.unitCost * cart.count}</span></strong></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg></td>
  </tr>`;
}
/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {

  'use strict';

  const getStoredTheme = () => localStorage.getItem('theme');
  const setStoredTheme = theme => localStorage.setItem('theme', theme);


  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  }


  setTheme(getPreferredTheme());

  const showActiveTheme = (theme, focus = false) => {
  const themeSwitcher = document.querySelector('#bd-theme');


    if (!themeSwitcher) {
      return;
    }
    const themeSwitcherText = document.querySelector('#bd-theme-text');
    const activeThemeIcon = document.querySelector('.theme-icon-active use');
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href');

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active');
      element.setAttribute('aria-pressed', 'false');
    });

    btnToActive.classList.add('active');
    btnToActive.setAttribute('aria-pressed', 'true');
    activeThemeIcon.setAttribute('href', svgOfActiveBtn);
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);


    if (focus) {
      themeSwitcher.focus();
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme());
    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme());

    document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-bs-theme-value');
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme, true);
      });
    });
  });
})();

/*Aca termina dark and light*/
const costo = document.getElementById('costo');
const total = document.getElementById('total');
const premium = document.getElementById('envioPremium');
const express = document.getElementById('envioExpres');
const standard = document.getElementById('envioStandar');
let porcentaje = "5"


function subTotal(precio, cantidad, index) {
  // Calcula el subtotal para este elemento
  const multiplicacionCart = document.getElementById(`multiplicacion_${index}`);
  multiplicacionCart.innerHTML = precio * cantidad;

  // Calcula la suma de todos los subtotales
  const subtotalElements = document.querySelectorAll('[id^="multiplicacion_"]');
  let totalSubtotal = 0;
  subtotalElements.forEach((element) => {
    totalSubtotal += parseInt(element.textContent);
  });

  // Actualiza el elemento HTML con el subtotal total
  const subtotalTotalElement = document.getElementById("subT");
  subtotalTotalElement.innerHTML = totalSubtotal;

  // Actualiza el total basado en el envío
  if (porcentaje > 0) {
    costo.innerHTML = calculoEnvio(porcentaje);
  }

  if (costo.textContent == 0) {
    total.innerHTML = totalSubtotal;
  } else {
    total.innerHTML = costoTotal(totalSubtotal).toString();
  }
}

function calculoEnvio(porcentaje, subTotal) {
  return (subTotal * porcentaje) / 100;
}

function costoTotal(subTotal, porcentajeEnvio) {
  return subTotal + porcentajeEnvio;
}

function calcularCostoEnvio() {
  var subTotal = parseFloat(subT.textContent);
  var porcentajeEnvio = 0;

  if (premium.checked) {
    porcentajeEnvio = 15;
  } else if (express.checked) {
    porcentajeEnvio = 7;
  } else if (standard.checked) {
    porcentajeEnvio = 5;
  }
  costo.innerHTML = calculoEnvio(porcentajeEnvio, subTotal).toFixed(0); 
  total.innerHTML = costoTotal(subTotal, parseFloat(costo.textContent)).toFixed(0); 
}

premium.addEventListener('click', calcularCostoEnvio);
express.addEventListener('click', calcularCostoEnvio);
standard.addEventListener('click', calcularCostoEnvio);


 
//Modifica el botón forma de pago al metodo seleccionado 

document.addEventListener('DOMContentLoaded', function () {
  const tarjetaRadio = document.getElementById('tarjeta');
  const transferenciaRadio = document.getElementById('transferencia');
  const guardarFormaPagoBtn = document.getElementById('guardarFormaPago');
  const formaDePagoSelect = document.getElementById('formadepago');

  guardarFormaPagoBtn.addEventListener('click', function () {
    let formaDePagoSeleccionada = '';


    if (tarjetaRadio.checked) {
      formaDePagoSeleccionada = "Tarjeta de Crédito";
    } else if (transferenciaRadio.checked) {
      formaDePagoSeleccionada = "Transferencia Bancaria";
    }

    // Actualiza el texto del botón "Forma de Pago"
    formaDePagoSelect.innerText = formaDePagoSeleccionada;
  });
});


  costo.innerHTML = calculoEnvio(porcentajeEnvio, subTotal).toFixed(0);
  total.innerHTML = costoTotal(subTotal, parseFloat(costo.textContent)).toFixed(
    0
  );


premium.addEventListener("click", calcularCostoEnvio);
express.addEventListener("click", calcularCostoEnvio);
standard.addEventListener("click", calcularCostoEnvio);
  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("sell-info");
    const formPago = document.getElementById("formadepago-form")
    let carthtml = "./index.html"
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity() && !formPago.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        //mostrarBootstrapAlert('danger', 'Por favor, rellena todos los campos requeridos.');
  //alert("no anda")
        // Mostrar una alerta SweetAlert en caso de campos requeridos vacíos
        Swal.fire({
          title: "Error",
          text: "Por favor, rellena todos los campos requeridos.",
          icon: "error",
        });
      } else {
        //mostrarBootstrapAlert('success', 'Tu compra ha sido procesada con éxito.');
        alert("Comprado")
         // Mostrar una alerta SweetAlert en caso de envío exitoso
      Swal.fire({
        title: "Compra Finalizada",
        text: "Tu compra ha sido procesada con éxito.",
        icon: "success",
        showConfirmButton: true, // Ocultar el botón de confirmación
      });

      // Esperar durante unos segundos antes de redirigir al carrito
      setTimeout(function () {
        // Cambiar la URL a la página del carrito
        window.location.href = carthtml;
      }, 5000); // 5000 ms = 5 segundos
    }
  
      form.classList.add("was-validated");
    });
  });

  
//PRUEBAS VALIODACION
//Codigo de boostrap para los inputs validos y no validos
// Example starter JavaScript for disabling form submissions if there are invalid fields
/*(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const alertContainer = document.getElementById('alert-container');
function mostrarBootstrapAlert(tipo, mensaje) {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert", `alert-${tipo}`);
    alertDiv.role = "alert";
    alertDiv.textContent = mensaje;
    
    alertContainer.innerHTML = ""; // Limpiar el contenedor de alertas existentes
    alertContainer.appendChild(alertDiv);
}

 function mostrarAlerta(tipo, mensaje) {
    
    alertContainer.innerHTML = `
      <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
      </div>
    `;
  }

