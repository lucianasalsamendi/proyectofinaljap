document.addEventListener('DOMContentLoaded', function () {
  fetch(Categorias_URL)
    .then((response) => response.json())
    .then((data) => {
      showData(data.products);
    })
    .catch(error => console.error("Error loading data:", error));
});

const id = localStorage.getItem('catID');
const Categorias_URL = "https://japceibal.github.io/emercado-api/cats_products/" + id + ".json";
const icontainer = document.getElementById('containerproductos');
const filterButton = document.getElementById('rangeFilterCount');

filterButton.addEventListener('click', filtrado);

function showData(dataArray) {
  icontainer.innerHTML = '';

  for (const item of dataArray) {
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

function filtrado() {
  const minPrice = parseFloat(document.getElementById('rangeFilterCountMin').value) || 0;
  const maxPrice = parseFloat(document.getElementById('rangeFilterCountMax').value) || Number.MAX_SAFE_INTEGER;

  fetch(Categorias_URL)
    .then((response) => response.json())
    .then((data) => {
      const filteredProducts = data.products.filter(item => item.cost >= minPrice && item.cost <= maxPrice);
      showData(filteredProducts);
    })
    .catch(error => console.error("Error loading data:", error));
}

//buscador

let carsData = [ ];
const inputBuscar = document.getElementById("buscador");

inputBuscar.addEventListener('input', () => {
  const busqueda = inputBuscar.value.toLowerCase();
  const resultadosFiltrados = filterItems(busqueda);
  mostrarDatosFiltrados(resultadosFiltrados);
});

function filterItems(query) {
  return carsData.filter(function (el) {
    return el.name.toLowerCase().includes(query);
  });
}

function mostrarDatosFiltrados(data) {
  icontainer.innerHTML = "";

  if (data.length === 0) {
    icontainer.innerHTML = "No existe el producto buscado";
    return;
  }

  showData(data);
}

