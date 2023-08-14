const Cars_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

const icontainer = document.getElementById('icontainerCars')

function showData(dataArray){

  for (const item of dataArray) {
   
    icontainer.innerHTML +=`<div class='product'>
    <img src='${item.image}'Alt='${item.name}'>
    <h2>${item.name} ${item.currency} ${item.cost}</h2>
    <p>${item.description} ${item.soldCount} vendidos </p> </div>`;
  }
};



  fetch(Cars_URL)
  .then((response) => response.json())
  .then((data) => {showData(data.products);})
  .catch(error => console.error("Error al cargar los datos:", error));