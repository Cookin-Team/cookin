const hamburger = document.getElementById("menu-mobile");
const menuWrapper = document.getElementById("menu-mobile-wrapper");
const btnPrint = document.getElementById("btn-print");
const myPassword = $("#myPassword");
const closeModal = document.getElementById("close");
const modal = document.getElementById("modalPopUp");
const titleModal = document.getElementById("titleModal");
const contentModal = document.getElementById("messageModal");

document.addEventListener(
  "DOMContentLoaded",
  () => {
    //Btn Nav Resp
    hamburger.onclick = function(e) {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        menuWrapper.classList.remove("active");
      } else {
        this.classList.add("active");
        menuWrapper.classList.add("active");
      }
    };

    //Btn Print list
    if (btnPrint) {
      btnPrint.addEventListener("click", function() {
        var printContents = document.getElementById("print-list").innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
      });
    }

    //Btn Password
    if (myPassword) {
      myPassword.strength({
        strengthClass: "strength",
        strengthMeterClass: "strength_meter",
        strengthButtonClass: "button_strength",
        strengthButtonText: `<i class="fas fa-eye"></i>`,
        strengthButtonTextToggle: `<i class="fas fa-eye-slash"></i>`
      });
    }

    //Btn close modal
    if (closeModal) {
      closeModal.onclick = function(e) {
        modal.classList.remove("active");
      };
    }
  },
  false
);
// Recetas favoritas
let btnRecipe = document.querySelectorAll(".form-favorite");

btnRecipe.forEach(button => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    console.log(button);
    addFavorite(button);
  });
});

//Btn Favorite
function addFavorite(btn) {
  const recipeId = btn.getAttribute("data-recipeId");

  if (btn.classList.contains("form-add")) {
    console.log("entra");
    axios
      .post(`/add-favorite/${recipeId}`)
      .then(response => {
        console.log("entra en el then");
        btn.classList.remove("form-add");
        btn.classList.add("form-delete");
        modal.classList.add("active");
        titleModal.innerHTML = `Congratulations`;
        contentModal.innerHTML = "Your recipe had been added to favorites.";
      })
      .catch(function(error) {
        console.log(error, "hola");
      });
  } else {
    axios
      .post(`/delete-favorite/${recipeId}`)
      .then(response => {
        btn.classList.remove("form-delete");
        btn.classList.add("form-add");
        modal.classList.add("active");
        titleModal.innerHTML = "Delete";
        contentModal.innerHTML =
          "Your recipe had been deleted from favorites..";
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

//Lista de ingredientes

let btnIngredients = document.querySelectorAll(".form-shopping");
btnIngredients.forEach(button => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    console.log(button);
    addShopping(button);
  });
});

//Btn Add shopping
function addShopping(btn) {
  const recipeId = btn.getAttribute("data-recipeId");
  const userId = btn.getAttribute("data-userId");
  axios
    .post(`/recipes/shopping-list/${recipeId}/${userId}`)
    .then(response => {
      console.log("entra en el then");
      btn.classList.remove("form-add");
      btn.classList.add("form-delete");
      modal.classList.add("active");
      titleModal.innerHTML = `Congratulations`;
      contentModal.innerHTML =
        "Your ingredients had been added to your shopping list.";
    })
    .catch(function(error) {
      console.log(error, "hola");
    });
}
