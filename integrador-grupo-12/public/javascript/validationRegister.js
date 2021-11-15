window.addEventListener('load', function() {
    let form = document.querySelector("form");

        
    form.addEventListener("submit", function(e) {
        
        const first_name = document.querySelector("#first_name");
        const last_name = document.querySelector("#last_name");
        const email = document.querySelector("#email");
        const password = document.querySelector("#password");
        const confirm_password = document.querySelector("#confirm_password");
        const avatar = document.querySelector("#avatar");
        
        const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regExAvatar = /^.*\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/;
        
        const errors = []
        
         if(first_name.value == ""){
             errors.push("Debes colocar tu nombre")
         }else if(first_name.value.length <2){
             errors.push("El nombre debe tener un mínimo de 2 caracteres")
         }

         if(last_name.value == ""){
             errors.push("Debes colocar tu apellido")
             last_name.classList.add("is-invalid")
         }else if(first_name.value.length <2){
             errors.push("El apellido debe tener un mínimo de 2 caracteres")
         }

         if(email.value == ""){
             errors.push("Tienes que escribir un correo electrónico")
         }else if(!regExEmail.test(email.value)){
             errors.push("Debes escribir un formato de correo válido")
         }
        
         if(password.value == ""){
             errors.push("Tienes que escribir una contraseña")
         }else if(password.value.length <8){
             errors.push("La contraseña debe tener un mínimo de 8 caracteres")
         }
        
         if(confirm_password.value == ""){
             errors.push("Tienes que confirmar tu contraseña")
         }
        
         if(avatar.value == ""){
             errors.push("Tienes que subir una imagen")
         }else if(!regExAvatar.test(avatar.value)){
             errors.push("Las extensiones de archivo permitidas son .jpg, .jpeg, .png, .gif")
         }
        
        const ulErrors = document.querySelector("div .errors ul")
        ulErrors.innerHTML = ""
       
        if(errors.length > 0){
            e.preventDefault()
            for(error of errors){
                ulErrors.innerHTML += `<li>${error}</li>`
            }
        }else{
            form.submit()
        }
})
}
)