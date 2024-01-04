cardHolderName = document.getElementById("card-holder-name");
cardNumber = document.getElementById("card-number");
expiryMonth = document.getElementById("card-expiry-month");
expiryYear = document.getElementById("card-expiry-year");
cvc = document.getElementById("card-cvc");

submitBtn = document.getElementById("submit-btn");

// Output fields
displayCardHolderName = document.getElementById("display-card-holder-name");
displayCardNumber = document.getElementById("display-card-number");
displayCardExpiryDate = document.getElementById("display-card-expiry-date");
displayCardCVC = document.getElementById("display-card-cvc");

// Error message fields
cardHolderNameMsg = document.getElementById("card-holder-name-msg");
cardNumberMsg = document.getElementById("card-number-msg");
cardExpiryDateMsg = document.getElementById("card-expiry-date-msg");
cvcMsg = document.getElementById("card-cvc-msg");

function cardHolderNameValidation(e) {
  if (e.target.value.trim().length > 0) {
    cardHolderName.classList.remove("error");
    cardHolderNameMsg.innerText = "";
  }

  displayCardHolderName.innerText = e.target.value.toUpperCase();
}

function cardNumberValidation(e) {
  // Remove existing errors if any.
  if (e.target.value.trim().length > 0) {
    cardNumber.classList.remove("error");
    cardNumberMsg.innerText = "";
  }

  let cardNo = e.target.value;

  // If any non-digit character is entered, show error
  if (/\D/g.test(cardNo)) {
    cardNumberMsg.innerText = "Wrong format, numbers only!";
    return;
  }

  let cardNoFmt = "";

  for (let i = 0; i < cardNo.length; i++) {
    if (i % 4 == 0 && i > 0) {
      cardNoFmt += " ";
    }
    cardNoFmt += cardNo[i];
  }

  displayCardNumber.innerText = cardNoFmt;
}

// Expiry month
function expiryMonthValidation(e) {
  if (e.target.value.trim().length > 0) {
    expiryMonth.classList.remove("error");
    cardExpiryDateMsg.innerText = "";
  }

  if (e.target.value > 12) {
    cardExpiryDateMsg.innerText = "Month must be between 1 and 12!";
    return;
  }

  displayCardExpiryDate.innerText = e.target.value + "/" + expiryYear.value;
}
// Expire year
function expiryYearValidation(e) {
  if (e.target.value.trim().length > 0) {
    expiryYear.classList.remove("error");
    cardExpiryDateMsg.innerText = "";
  }

  if (e.target.value < 24 || e.target.value > 99) {
    cardExpiryDateMsg.innerText = "Year must be between 24 and 99!";
    return;
  }

  displayCardExpiryDate.innerText = expiryMonth.value + "/" + e.target.value;
}

// CVC
function cvcValidation(e) {
  if (e.target.value.trim().length > 0) {
    cvc.classList.remove("error");
    cvcMsg.innerText = "";
  }

  if (e.target.value < 100 || e.target.value > 999) {
    cvcMsg.innerText = "CVC must be between 100 and 999!";
    return;
  }

  displayCardCVC.innerText = e.target.value;
}

// Card holder name
cardHolderName.addEventListener("keyup", cardHolderNameValidation);
cardHolderName.addEventListener("change", cardHolderNameValidation);

// Card number
cardNumber.addEventListener("keyup", cardNumberValidation);
cardNumber.addEventListener("change", cardNumberValidation);

// Card expiry month
expiryMonth.addEventListener("keyup", expiryMonthValidation);
expiryMonth.addEventListener("change", expiryMonthValidation);

// Card expiry year
expiryYear.addEventListener("keyup", expiryYearValidation);
expiryYear.addEventListener("change", expiryYearValidation);

// Card CVC
cvc.addEventListener("keyup", cvcValidation);
cvc.addEventListener("change", cvcValidation);

// Submit button
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  allFieldsOkay = true;

  // Check if all fields are filled
  if (cardHolderName.value === "") {
    cardHolderNameMsg.innerText = "Can't be blank!";
    cardHolderName.classList.add("error");
    allFieldsOkay = false;
  }

  if (cardNumber.value === "") {
    cardNumberMsg.innerText = "Can't be blank!";
    cardNumber.classList.add("error");
    allFieldsOkay = false;
  }

  if (cardNumber.value.length < 16) {
    cardNumberMsg.innerText = "Must be 16 digits long!";
    cardNumber.classList.add("error");
    allFieldsOkay = false;
  }

  if (expiryMonth.value === "" || expiryYear.value === "") {
    cardExpiryDateMsg.innerText = "Can't be blank!";

    if (expiryMonth.value === "") {
      expiryMonth.classList.add("error");
      allFieldsOkay = false;
    }

    if (expiryYear.value === "") {
      expiryYear.classList.add("error");
      allFieldsOkay = false;
    }
  }

  if (cvc.value === "") {
    cvcMsg.innerText = "Can't be blank!";
    cvc.classList.add("error");
    allFieldsOkay = false;
  }

  if (!allFieldsOkay) {
    return;
  }

  // Hide the form
  document.querySelector(".card-form").style.display = "none";

  document.querySelector(".loader").style.display = "block";

  setTimeout(function () {
    document.querySelector(".loader").style.display = "none";

    // Show feedback
    document.querySelector(".feedback").style.display = "block";
  }, 2000);
});
