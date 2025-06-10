import { getLocalStorage, setLocalStorage, getCartItemCount } from "./utils.mjs";

export default function shoppingCart() {
  renderCartContents();
  updateCartIconCount();
}

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];

  // Safety: ensure array format
  if (!Array.isArray(cartItems)) {
    cartItems = cartItems ? [cartItems] : [];
  }

  // Ensure each item has a quantity (default = 1)
  cartItems = cartItems.map(item => {
    if (!item.quantity) item.quantity = 1;
    return item;
  });

  // Render items
  const htmlItems = cartItems.map(cartItemTemplate);
    const output = document.querySelector(".product-list");
    output.innerHTML = htmlItems.join("");
      const cartSummary = document.querySelector(".cart-summary");
  const cartTotal = document.querySelector(".cart-summary__total");

  if (cartItems.length > 0) {
    cartSummary.classList.remove("cart-hidden");

    const total = cartItems.reduce((sum, item) => {
      return sum + item.FinalPrice * item.quantity;
    }, 0);

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  } else {
    cartSummary.classList.add("cart-hidden");
  }

  // Set up event listeners
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.id;
      removeFromCart(productId);
    });
  });

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

function cartItemTemplate(item) {
  const imageSrc = item.Images?.PrimaryMedium || 
                   item.image || 
                   "/images/placeholder.jpg"; // fallback image
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
     <img src="${imageSrc}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>

    <p class="cart-quantity">
      Qty: <input type="number" class="cart-quantity-input" data-id="${item.Id}" 
      id="quantity-${item.Id}" min="1" value="${item.quantity}" />
    </p>

    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-item" data-id="${item.Id}">x</button>
  </li>`;
}

function updateCartQuantity(productId, newQuantity) {
  let cart = getLocalStorage("so-cart") || [];
  const itemIndex = cart.findIndex(item => item.Id === productId);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = newQuantity;
  }
  setLocalStorage("so-cart", cart);
  updateCartIconCount();
  renderCartContents(); // re-render
}

function removeFromCart(productId) {
  let cart = getLocalStorage("so-cart") || [];
  const itemIndex = cart.findIndex(item => item.Id === productId);

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
  }

  setLocalStorage("so-cart", cart);
  renderCartContents();
  window.location.reload()
}


function updateCartIconCount() {
  const count = getCartItemCount();
  const cartCountEl = document.getElementById("cart-count");
  const cartCountPlainEl = document.getElementById("cart-count-plain");

  if (cartCountEl) cartCountEl.textContent = count;
  if (cartCountPlainEl) cartCountPlainEl.textContent = count;
}


