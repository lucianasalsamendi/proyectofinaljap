
document.addEventListener("DOMContentLoaded", async () => {
  
  const productID = localStorage.getItem("Product");
  const productInfo = document.getElementById("product-info");
  const respondeID = await getJSONData(
      PRODUCT_INFO_URL + productID + EXT_TYPE
      // Aprovecho que ya estan los datos en init y 
      // pido que me de el url de productos y el tipo de extension 
  ); 

  function getProductDetails() {
  
      let product = respondeID.data;
          // Pido los datos del json en este caso los datos de productos


      productInfo.innerHTML = `
          <div id="name">
          <h1 class="titulo">${product.name}<h1>
          </div>
        
          <div class="info"> 
          <div id="imageBg" class="ImageBg">
          </div>
          <div class="image" id="image">
          </div>
          <div id="informacion">
          
          <p class="title">
          <span style="font-weight: bold;">
          </span> ${product.description}
          </p>
          <p class="title">
          <span style="font-weight: bold;">
          Categoría</span><br> ${product.category}
          </p>
          <p class="title">
          <span style="font-weight: bold;">
          Cantidad de vendidos</span><br> ${product.soldCount}</p>
          <p class="title" id="precioProducto">

          ${product.currency}:${product.cost}
          </p>
              <div class="botonCarrito">
                  <button class="btnCarro">
                  Añadir al carrito
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                  </svg>
                  </button>
              </div>
          </div>
        </div>
      </div>
      `


