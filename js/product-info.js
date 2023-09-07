//comentario

// cambio de estrellas al hacer click en ellas
var starLabels = document.querySelectorAll('.stars label');
var selectedRating = document.getElementById('selected-rating');
var ratingInput = document.getElementById('rating');

starLabels.forEach((label, index) => {
    label.addEventListener('click', () => {
        // Cambiar la clase para mostrar la estrella llena o vacía
        for (let i = 0; i < starLabels.length; i++) {
            if (i <= index) {
                starLabels[i].classList.add('fas', 'fa-star-filled');
                starLabels[i].classList.remove('fa-star-empty');
            } else {
                starLabels[i].classList.add('fa-star-empty');
                starLabels[i].classList.remove('fas', 'fa-star-filled');
            }
        }

        // Actualizar el valor 
        ratingInput.value = index + 1;

        // Actualizar el número de estrellas seleccionadas
        selectedRating.textContent = index + 1;
    });
});

// envío del formulario al servidor
document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores del comentario y la puntuación
    var comment = document.getElementById('comment').value;
    var rating = ratingInput.value;

    // 
    let message = '';
    if (rating >= 5) {
        message = '¡Extraordinario!';
    }else if (rating >= 4) {
        message = '¡Excelente Producto!';
    } else if (rating >= 3) {
        message = 'Buen producto';
    } else if (rating >= 2) {
        message = 'Aceptable';
    } else if (rating >= 1) {
        message = 'Malo';
    }

    // Mostrar el mensaje
    document.getElementById('message').textContent = message;
   
    // Limpia el formulario después del envío 
    document.getElementById('comment').value = '';
    ratingInput.value = '0';
    selectedRating.textContent = '0';
    starLabels.forEach(label => {
        label.classList.remove('fas');
        label.classList.add('fa-regular');
    });
});