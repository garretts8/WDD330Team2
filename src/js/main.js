import { productList } from "./productList.mjs";
import { loadHeaderFooter, updateCartIconCount } from "./utils.mjs";
productList(".product-list", "tents");

loadHeaderFooter().then(() => {
  updateCartIconCount(); 
});