const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; 
const container = document.getElementById("containerproductos");

function showData(dataArray) {

  for (const item of dataArray.products) {
    container.innerHTML += `
	<div onclick="setCatID(${item.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${item.image}" alt="${item.cost}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${item.name} - USD ${item.cost}</h4>
                            <small class="text-muted">${item.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${item.description}</p>
                    </div>
                </div>
            </div>
            `; 
  }
}

  fetch(DATA_URL)
  .then(response => response.json()) 
  .then(data => showData(data))
  .catch(error => console.error("Error al cargar los datos:", error));
  
  