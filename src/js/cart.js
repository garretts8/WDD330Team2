
import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";


loadHeaderFooter().then(() => {
  shoppingCart(); // only runs on cart page
});

