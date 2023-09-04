let productsarray = [];

document.addEventListener('DOMContentLoaded', function () {
  const id = localStorage.getItem('catID');
  const Categorias_URL = "https://japceibal.github.io/emercado-api/cats_products/" + id + ".json";
  fetch(Categorias_URL)
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data.products)) {
        productsarray = data.products;

        showData(productsarray);

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


function showData(productsarray) {
	const icontainer = document.getElementById('containerproductos');
  icontainer.innerHTML = '';

  for (const item of productsarray) {
    icontainer.innerHTML += `<div class="list-group-item list-group-item-action cursor-active">
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
