import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// three functions are recommended: productDetails(productId), addToCart() -moved from the 
// product.js, and renderProductDetails().

//This function will become the entrypoint into our module and will make sure that 
// everything happens in the right order. This function should be the default export.
let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails();
  document
    .getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  let cart = getLocalStorage("so-cart") || [];
  const existingItem = cart.find(item => item.Id === product.Id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  setLocalStorage("so-cart", cart);
}
// method to fill in the details for the current product in the HTML.
function renderProductDetails() {
  document.querySelector("#productName").innerHTML = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerHTML = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;  
  document.querySelector("#productFinalPrice").innerHTML = product.FinalPrice; 
  document.querySelector("#productColorName").innerHTML = product.Colors[0].ColorName; 
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
/* product name,  product without brand, product image source, product image alt, productFinalPrice, productColorName, productDescriptionHtmlSimple, addToCart */

// Handles Add to Cart clicks
