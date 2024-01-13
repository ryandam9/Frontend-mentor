// Plans
monthly_plans = {
  arcade: 9,
  advanced: 12,
  pro: 15,
};

yearly_plans = {
  arcade: 90,
  advanced: 120,
  pro: 150,
};

yearly_free = {
  arcade: "2 months free",
  advanced: "2 months free",
  pro: "2 months free",
};

const addonPrices = {
  "online-service-addon": 1,
  "larger-storage-addon": 2,
  "customizable-profile-addon": 2,
};

// Add on services
const addonServices = [
  {
    name: "Online Service",
    price: 1,
    description: "Access to multiplayer games",
  },

  {
    name: "Larger Storage",
    price: 2,
    description: "Extra 1TB of cloud save",
  },

  {
    name: "Customizable Profile",
    price: 2,
    description: "Custom theme on your profile",
  },
];

// Execute on page load
window.onload = function () {
  generateAddonServices();
};

// User selections
// These will be updated as the user selects different options
// and will be used to calculate final price.
let selectedPlan = "arcade";
let selectedBillingType = "monthly";

// -----------------------------------
// Event listener for the next button
// -----------------------------------
document.querySelectorAll(".next-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const currentStep = e.target.getAttribute("current-step");
    const nextStep = Number(currentStep) + 1;

    // If on step #1, validate form fields.
    if (currentStep === "1") {
      let result = validateFormFields();

      if (!result) {
        return;
      }
    }

    showAndHideSection(currentStep, nextStep);
    highlightCircle(nextStep);

    if (nextStep === 4) {
      calculateFinalPrice();
    }
  });
});

// -----------------------------------
// Event listener for the previous button
// -----------------------------------
document.querySelectorAll(".prev-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const currentStep = e.target.getAttribute("current-step");
    const nextStep = Number(currentStep) - 1;
    showAndHideSection(currentStep, nextStep);

    highlightCircle(nextStep);
  });
});

// -----------------------------------
// Show and hide sections
// -----------------------------------
function showAndHideSection(currentStep, nextStep) {
  document
    .getElementById(`step-${currentStep}-container`)
    .classList.add("hidden");
  document
    .getElementById(`step-${nextStep}-container`)
    .classList.remove("hidden");
}

// -----------------------------------
// Highlight circle
// -----------------------------------
function highlightCircle(nextStep) {
  // Remove active class from all circles
  document.querySelectorAll(".step-number").forEach((step) => {
    step.classList.remove("active");
  });

  // Add active class to the next circle
  document.querySelectorAll(".step-number").forEach((step) => {
    if (step.firstChild.textContent === String(nextStep)) {
      step.classList.add("active");
    }
  });
}

// -----------------------------------
// Step #1
// Form validation
// -----------------------------------
function validateFormFields() {
  // Input elements
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let phoneNumber = document.getElementById("phone-number");

  // Error message elements
  let nameMsg = document.getElementById("name-msg");
  let emailMsg = document.getElementById("email-msg");
  let phoneNumberMsg = document.getElementById("phone-number-msg");

  // User entered values.
  let nameInput = name.value.trim();
  let emailInput = email.value.trim();
  let phoneNumberInput = phoneNumber.value.trim();

  let validationPassed = true;

  // When validation starts, remove error messages.
  name.classList.remove("error");
  email.classList.remove("error");
  phoneNumber.classList.remove("error");
  nameMsg.textContent = "";
  emailMsg.textContent = "";
  phoneNumberMsg.textContent = "";

  if (nameInput === "") {
    name.classList.add("error");
    nameMsg.textContent = "This field is required";
    validationPassed = false;
  }

  if (emailInput === "") {
    email.classList.add("error");
    emailMsg.textContent = "This field is required";
    validationPassed = false;
  }

  // Check if email is valid
  if (emailInput !== "") {
    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(emailInput)) {
      email.classList.add("error");
      emailMsg.textContent = "Please enter a valid email";
      validationPassed = false;
    }
  }

  if (phoneNumberInput === "") {
    phoneNumber.classList.add("error");
    phoneNumberMsg.textContent = "This field is required";
    validationPassed = false;
  }

  // If phone number contains non-numeric characters except +
  // then it is invalid.
  if (phoneNumberInput !== "") {
    let phoneNumberRegex = /^[0-9+]+$/;
    if (!phoneNumberRegex.test(phoneNumberInput)) {
      phoneNumberMsg.textContent = "Please enter a valid phone number";
      validationPassed = false;
    }
  }

  return validationPassed;
}

// -----------------------------------
// Step #1
// When the user focuses on a form field, remove the error message
// -----------------------------------
document.querySelectorAll(".form-field").forEach((field) => {
  field.addEventListener("focus", function (e) {
    // Remove border.
    e.target.classList.remove("error");

    let msg = e.target.parentNode.querySelector(".error-msg");
    msg.textContent = "";
  });
});

// -----------------------------------
// Step #2
// When plan type is changed, update the price and freebie
// -----------------------------------
document
  .getElementById("plan-checkbox")
  .addEventListener("change", function (e) {
    document.getElementById("arcade-price").textContent = e.target.checked
      ? `$${yearly_plans.arcade}/yr`
      : `$${monthly_plans.arcade}/mo`;

    document.getElementById("advanced-price").textContent = e.target.checked
      ? `$${yearly_plans.advanced}/yr`
      : `$${monthly_plans.advanced}/mo`;

    document.getElementById("pro-price").textContent = e.target.checked
      ? `$${yearly_plans.pro}/yr`
      : `$${monthly_plans.pro}/mo`;

    if (e.target.checked) {
      document.getElementById("arcade-freebie").textContent =
        yearly_free.arcade;
      document.getElementById("advanced-freebie").textContent =
        yearly_free.advanced;
      document.getElementById("pro-freebie").textContent = yearly_free.pro;

      document
        .querySelector(".plan-type-yearly")
        .classList.remove("unselected");
      document.querySelector(".plan-type-monthly").classList.add("unselected");

      // Update user selection
      selectedBillingType = "yearly";
    } else {
      document.getElementById("arcade-freebie").textContent = "";
      document.getElementById("advanced-freebie").textContent = "";
      document.getElementById("pro-freebie").textContent = "";

      document.querySelector(".plan-type-yearly").classList.add("unselected");
      document
        .querySelector(".plan-type-monthly")
        .classList.remove("unselected");

      // Update user selection
      selectedBillingType = "monthly";
    }

    updateAddonServices();
  });

// -----------------------------------
// Step #2
//   Highlight selected plan
//   This is done by adding the "selected" class to the plan
// -----------------------------------
document
  .querySelector(".plans")
  .querySelectorAll("li")
  .forEach((plan) => {
    plan.addEventListener("click", function (e) {
      // Remove selected class from all plans
      document
        .querySelector(".plans")
        .querySelectorAll("li")
        .forEach((plan) => {
          plan.classList.remove("selected");
        });

      // 'event.target' is the clicked element
      let clickedElement = e.target;

      // Check if the clicked element is not the <li> itself
      while (clickedElement !== this) {
        // Move up in the DOM tree
        clickedElement = clickedElement.parentNode;
      }

      // At this point, 'clickedElement' is the <li> element
      // Retrieve the 'plan-value' attribute
      let planName = clickedElement.getAttribute("plan-value");

      // Add selected class to the clicked plan
      plan.classList.add("selected");

      // Update user selection
      selectedPlan = planName;
    });
  });

// -----------------------------------
// Step #3
// Add ons
// -----------------------------------
document.querySelectorAll(".addon-item").forEach((addon) => {
  // Identify the checkbox inside it.
  const checkbox = addon.querySelector("input[type=checkbox]");

  // Add event listener to the checkbox
  checkbox.addEventListener("change", function (e) {
    // If checkbox is selected, add a border to its parent's parent
    // Otherwise, remove the border
    liElement = addon.parentNode;

    if (e.target.checked) {
      liElement.classList.add("checked");
    } else {
      liElement.classList.remove("checked");
    }
  });
});

// -----------------------------------
// Generate Add on services
// -----------------------------------
function generateAddonServices() {
  for (let itemId in addonServices) {
    const item = addonServices[itemId];
    let listElement = document.createElement("li");
    listElement.className = "addon-item-container";

    let div1 = document.createElement("div");
    div1.className = "addon-item";

    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = item.name.replace(/ /g, "-").toLowerCase() + "-addon";

    // Add event listener to the checkbox
    checkbox.addEventListener("change", function (e) {
      // If checkbox is selected, add a border to its parent's parent
      // Otherwise, remove the border
      if (e.target.checked) {
        listElement.classList.add("checked");
      } else {
        listElement.classList.remove("checked");
      }
    });

    // Name & Description
    let div2 = document.createElement("div");

    let p1 = document.createElement("p");
    p1.className = "addon-item-type";
    p1.textContent = item.name;

    let p2 = document.createElement("p");
    p2.className = "addon-item-summary";
    p2.textContent = item.description;

    div2.appendChild(p1);
    div2.appendChild(p2);

    // Price
    let p3 = document.createElement("p");
    p3.className = "addon-item-price";

    if (selectedBillingType === "monthly") {
      p3.textContent = `+$${item.price}/mo`;
    } else {
      p3.textContent = `+$${item.price * 10}/yr`;
    }

    div1.appendChild(checkbox);
    div1.appendChild(div2);

    listElement.appendChild(div1);
    listElement.appendChild(p3);

    document.querySelector(".addon-items-list").appendChild(listElement);

    // When anywhere in "div1" item is clicked, toggle the checkbox
    listElement.addEventListener("click", function (e) {
      // If the clicked element is the checkbox, do nothing
      if (e.target === checkbox) {
        return;
      }

      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event("change"));
    });
  }
}

// -----------------------------------
// This is called when the user changes the billing type
// between monthly and yearly.
// It will update the prices of the addons.
// -----------------------------------
function updateAddonServices() {
  document.querySelectorAll(".addon-item-container").forEach((addon) => {
    // Identify the checkbox inside it.
    const checkbox = addon.querySelector("input[type=checkbox]");

    // Update price
    let price = addon.querySelector(".addon-item-price");

    if (selectedBillingType === "monthly") {
      price.textContent = `+$${addonPrices[checkbox.id]}/mo`;
    } else {
      price.textContent = `+$${addonPrices[checkbox.id] * 10}/yr`;
    }
  });
}

document
  .getElementById("summary-change-link")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Go back to step 1
    showAndHideSection(4, 2);

    // Highlight the first circle
    highlightCircle(2);
  });

// -----------------------------------
// Step #5
// Summary
// -----------------------------------
function calculateFinalPrice() {
  let finalPrice = 0;

  // Add the plan price
  if (selectedBillingType === "monthly") {
    finalPrice += monthly_plans[selectedPlan];
  } else {
    finalPrice += yearly_plans[selectedPlan];
  }

  let basePrice =
    selectedBillingType === "monthly"
      ? monthly_plans[selectedPlan]
      : yearly_plans[selectedPlan];

  let billingType = selectedBillingType === "monthly" ? "/mo" : "/yr";

  // Update final Base price
  document.querySelector(".summary-plan").textContent =
    selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1);

  document.querySelector(".summary-base-price").textContent =
    `$${basePrice}${billingType}`;

  // Remove existing child nodes
  const addonItems = document.querySelector(".addon-items");
  while (addonItems.firstChild) {
    addonItems.removeChild(addonItems.firstChild);
  }

  // Add the addons price
  document.querySelectorAll(".addon-item").forEach((addon) => {
    const checkbox = addon.querySelector("input[type=checkbox]");

    if (checkbox.checked) {
      let div1 = document.createElement("div");
      div1.className = "addon-item";

      let p1 = document.createElement("p");
      div1.appendChild(p1);

      let displayAddon = checkbox.id.replace(/-/g, " ").replace("addon", "");
      displayAddon =
        displayAddon.charAt(0).toUpperCase() + displayAddon.slice(1);
      p1.textContent = displayAddon;

      let p2 = document.createElement("p");
      div1.appendChild(p2);

      let addonPrice = addonPrices[checkbox.id];

      if (selectedBillingType === "yearly") {
        addonPrice *= 10;
      }

      p2.textContent = `+$${addonPrice}${billingType}`;
      document.querySelector(".addon-items").appendChild(div1);

      finalPrice += addonPrice;
    }
  });

  // Update final price
  document.querySelector(".total-price-msg").innerText = `Total (per ${
    selectedBillingType === "monthly" ? "month" : "year"
  })`;

  document.querySelector(".total-price-amt").innerText =
    `+$${finalPrice}${billingType}`;
}
