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
                for (const article of articles) {
                    cartData.innerHTML += `<div class="row">
                        <div class="">
                            <div class ="col-2">
                            <img src="${article.image}" class="img-thumbnail width=1px alt="${article.name}"
                        </div>
                        <div class ="">
                           ${article.name}
                        </div>
                        <div class=""
                            <label for="cantidad"></label>
                            <input type="number" value="${article.count}" min="1" step="1" id="cantidad">
                        </div>
                         <div class ="">
                            ${article.unitCost} ${article.currency}
                        </div>
                        </div>
                            </div>
                    `;
                }
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