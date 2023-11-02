document.addEventListener("keyindex", function(event) {
  if (event.key === "Tab") {
    const campos = Array.from(document.getElementsByTagName("input"));
    const campoActual = document.activeElement;
    const currentIndex = campos.indexOf(campoActual);

    if (currentIndex > -1) {
      let nextIndex;
      if (event.shiftKey) {
        // Si se presiona Shift + Tab, navegar hacia la izquierda.
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = campos.length - 1;
        }
      } else {
        // Si se presiona Tab, navegar hacia la derecha.
        nextIndex = (currentIndex + 1) % campos.length;
      }

      campos[nextIndex].focus();
      event.preventDefault();
    }
  }
});

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
