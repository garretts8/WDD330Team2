import { productList } from "./productList.mjs";
import { loadHeaderFooter, updateCartIconCount } from "./utils.mjs";
import { showWelcomeModal } from './welcomeBanner.js';


productList(".product-list", "tents");

loadHeaderFooter().then(() => {
  updateCartIconCount(); 
});

const form = document.getElementById("newsletter-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("newsletter-email").value;
    // TODO: send `email` to your newsletter backend
    alert(`Thanks for subscribing, ${email}!`);
    form.reset();
  });
}
// Show Modal
showWelcomeModal();