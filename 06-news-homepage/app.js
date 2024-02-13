document.addEventListener("DOMContentLoaded", function () {
  let mobileMenu = document.getElementById("mobile-menu-wrapper");
  let menuIcon = document.querySelector("#mobile-nav img.menu-icon");

  menuIcon.addEventListener("click", function () {
    mobileMenu.classList.toggle("show");

    // Hide the hamburger menu when
    menuIcon.classList.toggle("hide");
  });
});

// Close the mobile menu when the user clicks outside of it
document.addEventListener("click", function (event) {
  let mobileMenu = document.getElementById("mobile-menu-wrapper");
  let menuIcon = document.querySelector("#mobile-nav img.menu-icon");

  if (event.target !== mobileMenu && event.target !== menuIcon) {
    mobileMenu.classList.remove("show");
    menuIcon.classList.remove("hide");
  }
});

// Close the mobile menu when clicked on Close button
document
  .querySelector(".menu-close-icon")
  .addEventListener("click", function () {
    document.getElementById("mobile-menu-wrapper").classList.remove("show");
    document
      .querySelector("#mobile-nav img.menu-icon")
      .classList.remove("hide");
  });
