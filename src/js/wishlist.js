import { loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default function wishlist() {
  loadHeaderFooter().then(() => {
    renderWishlist();
  });
}

function renderWishlist() {
  const user = getLocalStorage("so-user");
  if (!user || !user.wishlist || user.wishlist.length === 0) {
    document.querySelector(".product-list").innerHTML = 
      "<p>Your wishlist is empty. Add items from your cart!</p>";
    return;
  }

  const htmlItems = user.wishlist.map(wishlistItemTemplate);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".move-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.id;
      moveToCart(productId);
    });
  });

  document.querySelectorAll(".remove-wishlist").forEach(button => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.id;
      removeFromWishlist(productId);
    });
  });
}

function wishlistItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="move-to-cart" data-id="${item.Id}">Add to Cart</button>
    <button class="remove-wishlist" data-id="${item.Id}">Remove</button>
  </li>`;
}

function moveToCart(productId) {
  const user = getLocalStorage("so-user");
  if (!user) return;

  const item = user.wishlist.find(item => item.Id === productId);
  if (!item) return;

  let cart = getLocalStorage("so-cart") || [];
  const existingItem = cart.find(cartItem => cartItem.Id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }

  setLocalStorage("so-cart", cart);
  removeFromWishlist(productId);
  alert("Item added to cart!");
}

function removeFromWishlist(productId) {
  const user = getLocalStorage("so-user");
  if (!user) return;

  const users = getLocalStorage("so-users") || [];
  const userIndex = users.findIndex(u => u.id === user.id);
  
  if (userIndex === -1) return;

  const wishlistIndex = users[userIndex].wishlist.findIndex(w => w.Id === productId);
  if (wishlistIndex === -1) return;

  users[userIndex].wishlist.splice(wishlistIndex, 1);
  setLocalStorage("so-users", users);
  setLocalStorage("so-user", users[userIndex]);
  renderWishlist();
}

// Initialize wishlist
wishlist();
