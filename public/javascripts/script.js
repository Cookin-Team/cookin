const hamburger = document.getElementById("menu-mobile");
const menuWrapper = document.getElementById("menu-mobile-wrapper");
const btnPrint = document.getElementById("btn-print");
const myPassword = $("#myPassword");
const closeModal = document.getElementById("close");
const modal = document.getElementById("modalPopUp");

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
