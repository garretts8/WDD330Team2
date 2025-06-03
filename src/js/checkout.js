import checkoutProcess from "./checkoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {

  checkoutProcess.init("so-cart");

  const checkoutForm = document.getElementById("checkout-form");
  if (!checkoutForm) {
    console.warn("Could not find #checkout-form in the DOM.");
    return;
  }

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkoutProcess.checkout(checkoutForm);
  });
});