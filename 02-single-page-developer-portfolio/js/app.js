// Input fields
let contactName = document.getElementById("form-input-name");
let contactEmail = document.getElementById("form-input-email");
let contactMessage = document.getElementById("form-input-message");

// Error elements
let nameError = document.getElementById("msg-name");
let emailError = document.getElementById("msg-email");
let messageError = document.getElementById("msg-message");

let submit = document.getElementById("form-submit-btn");

// ---------------------------
// Name validation
// ---------------------------
function addNameError() {
  nameError.innerHTML = "<p>Please enter your name!</p>";
  contactName.classList.add("error");
}

function clearNameError() {
  nameError.innerHTML = "";
  contactName.classList.remove("error");
}

function validateName() {
  //   Name validation
  if (contactName.value.trim().length > 0) {
    let nameFormat = /^[a-zA-Z ]*$/;

    if (contactName.value.match(nameFormat)) {
      contactName.classList.remove("error");
      contactName.classList.add("valid");
    } else {
      nameError.innerHTML = "<p>Sorry! Invalid format here!</p>";
      contactName.classList.add("error");
    }
  }
}

// ---------------------------
// Email validation
// ---------------------------
function addEmailError() {
  emailError.innerHTML = "<p>Please enter your email!</p>";
  contactEmail.classList.add("error");
}

function clearEmailError() {
  emailError.innerHTML = "";
  contactEmail.classList.remove("error");
}

function validateEmail() {
  // Email format valdiation
  if (contactEmail.value.trim().length > 0) {
    let emailFormat = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (contactEmail.value.match(emailFormat)) {
      contactEmail.classList.remove("error");
      contactEmail.classList.add("valid");
    } else {
      emailError.innerHTML = "<p>Sorry! Invalid format here!</p>";
      contactEmail.classList.add("error");
    }
  }
}

// ---------------------------
// Message validation
// ---------------------------
function addMessageError() {
  messageError.innerHTML = "<p>Please enter a message!</p>";
  contactMessage.classList.add("error");
}

function clearMessageError() {
  messageError.innerHTML = "";
  contactMessage.classList.remove("error");
}

function validateMessage() {
  if (contactMessage.value.trim().length > 0) {
    contactMessage.classList.remove("error");
    contactMessage.classList.add("valid");
  } else {
    messageError.innerHTML = "<p>Sorry! Invalid format here!</p>";
    contactMessage.classList.add("error");
  }
}

contactName.addEventListener("focus", clearNameError);
contactName.addEventListener("input", clearNameError);
contactName.addEventListener("keyup", validateName);

contactEmail.addEventListener("focus", clearEmailError);
contactEmail.addEventListener("input", clearEmailError);
contactEmail.addEventListener("keyup", validateEmail);

contactMessage.addEventListener("focus", clearMessageError);
contactMessage.addEventListener("input", clearMessageError);
contactMessage.addEventListener("keyup", validateMessage);

// Form validation
// This is called when "SEND MESSAGE" button is clicked.
submit.addEventListener("click", function (e) {
  e.preventDefault();

  if (contactName.value.trim() === "") {
    addNameError();
  }

  if (contactEmail.value.trim() === "") {
    addEmailError();
  }

  if (contactMessage.value.trim() === "") {
    addMessageError();
  }

  //   Name validation
  if (contactName.value.trim().length > 0) {
    validateName();
  }

  // Email format valdiation
  if (contactEmail.value.trim().length > 0) {
    validateEmail();
  }

  // Message validation
  if (contactMessage.value.trim().length > 0) {
    validateMessage();
  }
});
