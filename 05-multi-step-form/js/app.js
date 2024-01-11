// Event listener for the next button
document.querySelectorAll(".next-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const currentStep = e.target.getAttribute("current-step");
    const nextStep = Number(currentStep) + 1;

    showAndHideSection(currentStep, nextStep);
    highlightCircle(nextStep);
  });
});

// Event listener for the previous button
document.querySelectorAll(".prev-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const currentStep = e.target.getAttribute("current-step");
    const nextStep = Number(currentStep) - 1;
    showAndHideSection(currentStep, nextStep);

    highlightCircle(nextStep);
  });
});

// Show and hide sections
function showAndHideSection(currentStep, nextStep) {
  document.getElementById(`step-${currentStep}`).classList.add("hidden");
  document.getElementById(`step-${nextStep}`).classList.remove("hidden");
}

// Highlight circle
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

// When checkbox is selected,
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
    } else {
      document.getElementById("arcade-freebie").textContent = "";
      document.getElementById("advanced-freebie").textContent = "";
      document.getElementById("pro-freebie").textContent = "";
    }
  });
