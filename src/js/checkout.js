import checkoutProcess from "./checkoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {

  const checkout = new checkoutProcess("so-cart", "#order-summary");

  checkout.init();

  const checkoutForm = document.getElementById("checkout-form");
  if (!checkoutForm) {
    console.warn("Could not find #checkout-form in the DOM.");
    return;
  }

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkout.checkout(checkoutForm);
  });
});
