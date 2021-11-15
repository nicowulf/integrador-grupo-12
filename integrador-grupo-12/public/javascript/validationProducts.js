window.addEventListener("load", function () {
  let form = document.querySelector("form");
  
  form.addEventListener("submit", function (e) {
    
    const brand = document.querySelector("#brand");
    const description = document.querySelector("#description");
    const origin = document.querySelector("#origin_id");
    const style = document.querySelector("#style_id");
    const price = document.querySelector("#price");
    const discount = document.querySelector("#discount_id");
    const image = document.querySelector("#image");
   
    const regExImage = /^.*\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/;

    const errors = [];

    if (brand.value == "") {
      errors.push("Debes colocar la Marca");
    } else if (brand.value.length < 5) {
      errors.push("La Marca debe tener al menos 5 caracteres");
    }

    if (description.value == "") {
      errors.push("Debes colocar una descripción");
    } else if (description.value.length < 20) {
      errors.push("La descripción debe tener al menos 20 caracteres");
    }

    if (origin.value == "") {
      errors.push("Debes elegir un Origen");
    }

    if (style.value == "") {
      errors.push("Debes elegir una Variedad");
    }

    if (price.value == "") {
      errors.push("Debes colocar el precio");
    }

    if (discount.value == "") {
      errors.push("Debes seleccionar un descuento");
    }

    if (image.value == "") {
      errors.push("Tienes que subir una imagen");
    } else if (!regExImage.test(avatar.value)) {
      errors.push(
        "Las extensiones de archivo permitidas son .jpg, .jpeg, .png, .gif"
      );
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
