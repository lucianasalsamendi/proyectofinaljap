const id = localStorage.getItem('catID')

const Categorias_URL = "https://japceibal.github.io/emercado-api/cats_products/" + id +".json";

const icontainer = document.getElementById('icontainerCars')

function showData(dataArray){

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
                </div>`
  }
};

  fetch(Categorias_URL)
  .then((response) => response.json())
  .then((data) => {showData(data.products);})
  .catch(error => console.error("Error al cargar los datos:", error));

