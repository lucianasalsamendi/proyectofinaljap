document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });


    let guardado = localStorage.getItem("user");
    let noguardado = sessionStorage.getItem("user");
    
    const userDisplay = document.getElementById("userDisplay");
    const logoutBtn = document.getElementById("logoutBtn");
    const profileBtn = document.getElementById("profileBtn");

    if (guardado || noguardado) {
        let user = guardado || noguardado;
        document.getElementById("userDisplay").textContent = "Hola, " + user;

        logoutBtn.addEventListener("click", function() {
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            window.location.href = "login.html";
        });
        
    } else {
        window.location.href = "login.html";
    }

        profileBtn.addEventListener("click", function() {
            window.location.href = "my-profile.html";
        })
});