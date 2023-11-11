const defaultFile = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTEyOCAyNmExMDIgMTAyIDAgMSAwIDEwMiAxMDJBMTAyLjEyIDEwMi4xMiAwIDAgMCAxMjggMjZaTTcxLjQ0IDE5OGE2NiA2NiAwIDAgMSAxMTMuMTIgMGE4OS44IDg5LjggMCAwIDEtMTEzLjEyIDBaTTk0IDEyMGEzNCAzNCAwIDEgMSAzNCAzNGEzNCAzNCAwIDAgMS0zNC0zNFptOTkuNTEgNjkuNjRhNzcuNTMgNzcuNTMgMCAwIDAtNDAtMzEuMzhhNDYgNDYgMCAxIDAtNTEgMGE3Ny41MyA3Ny41MyAwIDAgMC00MCAzMS4zOGE5MCA5MCAwIDEgMSAxMzEgMFoiLz48L3N2Zz4=';


const file = document.getElementById('fileInput');
const img = document.getElementById('imagenGuardada');

file.addEventListener('change',e =>{
    if(e.target.files[0]){
       const reader = new FileReader( )
       reader.onload = function( e ){
        img.src = e.target.result;
       }
       reader.readAsDataURL(e.target.files[0])
    }else{
        img.src = defaultFile;
    }
} )