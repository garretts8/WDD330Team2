import { getLocalStorage, getCartItemCount, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];

  console.log("cartItems from localStorage:", cartItems);
  console.log("Is cartItems an array?", Array.isArray(cartItems));

  // Ensure cartItems is always an array
  if (!Array.isArray(cartItems)) {
    cartItems = cartItems ? [cartItems] : [];
  }

  // Ensure each item has a quantity (default = 1)
  cartItems = cartItems.map(item => {
    if (!item.quantity) item.quantity = 1;
    return item;
  });

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  

 // event listener to remove buttons
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.id;
      removeFromCart(productId);
    });
  });

  // event listener for quantity input changes
  document.querySelectorAll(".cart-quantity-input").forEach(input => {
    input.addEventListener("change", (event) => {
      const newQty = parseInt(event.target.value);
      const productId = event.target.dataset.id;
      if (newQty > 0) {
        updateCartQuantity(productId, newQty);
      }
    });
  });
}

function updateCartQuantity(productId, newQuantity) {
  let cart = getLocalStorage("so-cart") || [];

  const itemIndex = cart.findIndex(item => item.Id === productId);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = newQuantity;
  }

  setLocalStorage("so-cart", cart);
  updateCartIconCount();
  renderCartContents(); // re-render the cart with updated quantities
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p> Qty: <input type="number" class="cart-quantity-input" data-id="${item.Id}" 
    id="quantity-${item.Id}" min="1" value="${item.quantity}" /> </p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-item" data-id="${item.Id}">X</button>
  </li>`;

  return newItem;
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  if (!Array.isArray(cart)) {
    cart = [];
  }

  console.log("Cart from localStorage:", cart);
  console.log("Is cart an array?", Array.isArray(cart));

  const itemIndex = cart.findIndex(item => item.Id === productId);
  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
  }

  localStorage.setItem("so-cart", JSON.stringify(cart));
  renderCartContents();
}

function updateCartIconCount() {
  const count = getCartItemCount();
  const cartCountEl = document.getElementById("cart-count");
  const cartCountPlainEl = document.getElementById("cart-count-plain");
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
  if (cartCountPlainEl) {
    cartCountPlainEl.textContent = count;
  }
}

updateCartIconCount();
renderCartContents();
