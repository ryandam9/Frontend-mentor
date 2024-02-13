document.addEventListener("DOMContentLoaded", function () {
  let mobileMenu = document.getElementById("mobile-menu-wrapper");
  let menuIcon = document.querySelector("#mobile-nav img.menu-icon");

  menuIcon.addEventListener("click", function () {
    mobileMenu.classList.toggle("show");
  });
});
