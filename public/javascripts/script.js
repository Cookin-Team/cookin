const hamburger = document.getElementById("menu-mobile");
const menuWrapper = document.getElementById("menu-mobile-wrapper");

document.addEventListener(
  "DOMContentLoaded",
  () => {
    //Btn Start First Screen
    hamburger.onclick = function(e) {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        menuWrapper.classList.remove("active");
      } else {
        this.classList.add("active");
        menuWrapper.classList.add("active");
      }
    };
  },
  false
);
