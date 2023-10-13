// URL de la API
const CARTURL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

document.addEventListener('DOMContentLoaded', async function () {
  const listado = document.getElementById('cart-data');
  const listadoInfoCart = await getJSONData(CARTURL);

  listadoInfoCart.data.articles.forEach(function (cart) {
    listado.innerHTML += getHTML(cart)
    subTotal (cart.unitCost)
  })
});

function getHTML(cart) {
    return `<tr>
    <th scope="row"><img class="img-fluid" width="60" height="60"src="${cart.image}" alt=""></th>
    <td><p>${cart.name}</p></td>
    <td>${cart.currency} ${cart.unitCost}</td> 
    <td><input id="cantidad" type="number" min="1" max="100" value="${cart.count}" oninput="subTotal(${cart.unitCost})"></td>
    <td><strong> ${cart.currency}<span id="multiplicacion">  ${cart.unitCost * cart.count}</span></strong></td>
    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
  </svg><td>
    </tr>`;
};
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

function subTotal(precio) {
  const cantidadCart = document.getElementById('cantidad').value
  const multiplicacionCart = document.getElementById('multiplicacion')
  multiplicacionCart.innerHTML = cantidadCart * precio
  document.getElementById("subT").innerHTML = cantidadCart * precio
  if (porcentaje > 0)
  costo.innerHTML = calculoEnvio (porcentaje)
  if (costo.textContent == 0) {
    total.innerHTML = subT.textContent
  }
  else {
    total.innerHTML = costoTotal ().toString ();
  }
}

function calculoEnvio (porcentaje){
  if (porcentaje == 5){
    return subT.textContent * 0.05
  }
  if (porcentaje == 7){
    return subT.textContent * 0.07
  }
  if (porcentaje == 15){
    return subT.textContent * 0.15
  }
}

function costoTotal () {
  var precio = parseInt(subT.textContent)
  var porcentajePorPrecio = parseInt (costo.textContent)
  return precio + porcentajePorPrecio
}

premium.addEventListener ('click', function(){
  if (premium.checked) {
  porcentaje = 15
  costo.innerHTML= calculoEnvio (porcentaje)
  total.innerHTML = costoTotal ().toString();
  }
})

express.addEventListener ('click', function() {
  if (express.checked) {
  porcentaje= 7
  costo.innerHTML= calculoEnvio (porcentaje)
  }
})

standard.addEventListener ('click', function() {
  if (standard.checked) {
  porcentaje= 5
  costo.innerHTML= calculoEnvio (porcentaje)
  }
})

