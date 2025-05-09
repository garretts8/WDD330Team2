import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  console.log("cartItems from localStorage:", cartItems);
  console.log("Is cartItems an array?", Array.isArray(cartItems));

  // Ensure cartItems is always an array
  if (!Array.isArray(cartItems)) {
    cartItems = cartItems ? [cartItems] : [];
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

// event listener to remove buttons
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.id; 
      removeFromCart(productId);
    });
  });
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
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-item" data-id="${item.Id}">Remove</button>
  </li>`;

  return newItem;
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
}

renderCartContents();
