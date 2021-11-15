window.addEventListener("load", function () {
  let form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    

    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    
    const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    const errors = [];

    if (email.value == "") {
      errors.push("Tienes que escribir un correo electrónico");
    } else if (!regExEmail.test(email.value)) {
      errors.push("Debes escribir un formato de correo válido");
    }

    if (password.value == "") {
      errors.push("Tienes que escribir una contraseña");
    } else if (password.value.length < 8) {
      errors.push("La contraseña debe tener un mínimo de 8 caracteres");
    }

    const ulErrors = document.querySelector("div .errors ul");
    ulErrors.innerHTML = "";

    if (errors.length > 0) {
      e.preventDefault();
      for (error of errors) {
        ulErrors.innerHTML += `<li>${error}</li>`;
      }
    } else {
       form.submit();
    }
  });
});
