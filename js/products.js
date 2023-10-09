
let productsarray = [];

document.addEventListener('DOMContentLoaded', function () {
  
  const id = localStorage.getItem('catID');
  const Categorias_URL = "https://japceibal.github.io/emercado-api/cats_products/" + id + ".json";
  fetch(Categorias_URL)
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data.products)) {
        productsarray = data.products;

        showData(productsarray), nameCat(data) ;

        console.log(productsarray);
      } else {
        console.error("No funca la cosa");
      }
    })
    .catch(error => console.error("Error loading data:", error));
});

function nameCat(param1){
  const tituleCat = document.getElementById('ih2products')
   tituleCat.innerHTML=`<h2 id=ih2products>Verás aquí todos los productos de la categoría <b>${param1.catName}<b></h2>`
 }
 
 function setCatIDproducts(id) {
  localStorage.setItem("Product",id);
  window.location = "product-info.html"}

function showData(productsarray) {
	const icontainer = document.getElementById('containerproductos');
  icontainer.innerHTML = '';

  for (const item of productsarray) {
    icontainer.innerHTML += `<div onclick="setCatIDproducts(${item.id})" class="list-group-item list-group-item-action cursor-active">
    <div class="row">
                    <div class="col-3">
                        <img src="${item.image}" alt="${item.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${item.name} - ${item.currency} ${item.cost}</h4>
                            <small class="text-muted">${item.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${item.description}</p>
                    </div>
                </div>`;
  }
}

///filtrado rango de precios
const filterButton = document.getElementById('rangeFilterCount');

filterButton.addEventListener('click', filtrado);
function filtrado() {
  const minPrice = parseFloat(document.getElementById('rangeFilterCountMin').value) || 0;
  const maxPrice = parseFloat(document.getElementById('rangeFilterCountMax').value) || Number.MAX_SAFE_INTEGER;
	const filteredProducts = productsarray.filter(item => item.cost >= minPrice && item.cost <= maxPrice);
      showData(filteredProducts);
}

const botonborradorango = document.getElementById('clearRangeFilter');

botonborradorango.addEventListener('click', borrarrango);

function borrarrango() {

  document.getElementById('rangeFilterCountMin').value = '';
  document.getElementById('rangeFilterCountMax').value = '';

  showData(productsarray);
}

////filtrado de nombre en tiempo real

const inputBuscar = document.getElementById("buscador");

inputBuscar.addEventListener('input', () => {
  const busqueda = inputBuscar.value.toLowerCase();
  const resultadosFiltrados = filterItems(busqueda);
  mostrarDatosFiltrados(resultadosFiltrados);
});

function filterItems(busqueda) {
  return productsarray.filter(function (item) {
    return item.name.toLowerCase().includes(busqueda);
  });
}

function mostrarDatosFiltrados(data) {
  const icontainer = document.getElementById('containerproductos');
  icontainer.innerHTML = '';

  if (data.length === 0) {
    icontainer.innerHTML = "No existe el producto buscado";
    return;
  }

  showData(data);
}

//////filtrado por costo y relevancia


function ordenar(cost) {
  sortOrder = cost;
  productsarray.sort(function(a, b) {
    if (sortOrder === 'ascendente') {
      return a.cost - b.cost;
    } else {
      return b.cost - a.cost;
    }
  });

  showData(productsarray);
}

function ordenarPorRelevancia() {
   productsarray.sort(function(a, b) {
    return b.soldCount - a.soldCount;
  });
 showData(productsarray);
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

