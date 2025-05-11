import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage, getCartItemCount } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

export function updateCartCount() {
  const count = getCartItemCount();
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
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
  updateCartCount(getCartItemCount());
}

// method to fill in the details for the current product in the HTML.
function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
