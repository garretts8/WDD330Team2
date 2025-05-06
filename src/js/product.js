import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");
console.log(findProductById(productId));
productDetails(productId);

function addProductToCart(product) {
  let currentCart = getLocalStorage("so-cart") || [];
  currentCart.push(product);
  setLocalStorage("so-cart", currentCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}


// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
