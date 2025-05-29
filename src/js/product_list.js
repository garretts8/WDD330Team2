import { productList } from "./productList.mjs";
import { getParam, loadHeaderFooter, updateCartIconCount } from "./utils.mjs";

const category = getParam("category");
// productList(".product-list", "tents");
productList(".product-list", category);

loadHeaderFooter().then(() => {
  updateCartIconCount(); 
});



// import productList from "./productList.mjs";



