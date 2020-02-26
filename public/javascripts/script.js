const hamburger = document.getElementById("menu-mobile");
const menuWrapper = document.getElementById("menu-mobile-wrapper");
const btnPrint = document.getElementById("btn-print");

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

    if (btnPrint) {
      btnPrint.addEventListener("click", function() {
        var printContents = document.getElementById("print-list").innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
      });
    }
  },
  false
);
