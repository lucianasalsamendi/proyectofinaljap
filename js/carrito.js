document.addEventListener('DOMContentLoaded', ()=>{

// Ejecutar una función después de 2000 milisegundos (2 segundos)
setTimeout(function() {

    const carrito = [];
   // Obtener el elemento con el id 'btnCarrito'
    const btnCarrito = document.getElementById('btnCarrito');

    // Agregar un evento de clic al elemento
    btnCarrito.addEventListener('click', () => {
        console.log('hola');
    });

}, 1000);



})