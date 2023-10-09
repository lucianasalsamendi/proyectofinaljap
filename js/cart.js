// URL de la API
const URL_userID = "https://japceibal.github.io/emercado-api/user_cart/25801.json";



// Realiza una solicitud Fetch a la API
fetch(URL_userID)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                // Procesa los datos y muestra en pantalla
                const articles = data.articles;
                const cartData = document.getElementById("cart-data");
                cartData.innerHTML = "";
                articles.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><img src="${product.image}" alt="${product.name}" class="imgcart" width="100"></td>
                        <td>${product.name}</td>
                        <td>${product.currency}  ${product.unitCost}</td>
                        <td> <label for="cantidad"></label>
                        <input type="number" value="${product.count}" min="1" step="1" id="cantidad"></td>
                        <td>${product.currency}  ${product.unitCost}</td>
                        
                    `;
                    cartData.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });

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

  // Ejecutar una función después de 2000 milisegundos (2 segundos)
setTimeout(function() {

  const carrito = [];
 // Obtener el elemento con el id 'btnCarrito'
  const btnCarrito = document.getElementById('btnCarrito');

  // Agregar un evento de clic al elemento
  btnCarrito.addEventListener('click', () => {
    Swal.fire(
      'Felicidades!',
      'Ha sido agregado al carrito con éxito.',
      'success'
    )
  });

}, 1000);
