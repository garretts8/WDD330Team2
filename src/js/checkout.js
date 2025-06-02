import { loadHeaderFooter, getLocalStorage, updateCartIconCount } from "./utils.mjs";

export default function checkout() {
  loadHeaderFooter().then(() => {
    renderOrderSummary();
    setupFormSubmission();
    updateCartIconCount(); 
  });
}



function renderOrderSummary() {
  const cartItems = getLocalStorage("so-cart") || [];
  const orderItemsContainer = document.getElementById("order-items");
  const subtotalElement = document.getElementById("subtotal");
  
  if (cartItems.length === 0) {
    orderItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  
  // Calculate subtotal
  let subtotal = 0;
  const itemsHtml = cartItems.map(item => {
    const itemTotal = item.FinalPrice * (item.quantity || 1);
    subtotal += itemTotal;
    
    return `
      <div class="order-item">
        <div class="item-info">
          <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
          <span>${item.Name} (x${item.quantity || 1})</span>
          <span>$${itemTotal.toFixed(2)}</span>
          
    
        </div>
      </div>
    `;
  }).join("");
  
  orderItemsContainer.innerHTML = itemsHtml;
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  
  // Calculate shipping (example: $5.99 flat rate)
  const shipping = 5.99;
  document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
  
  // Calculate tax (example: 8% of subtotal)
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
  
  // Calculate total
  const total = subtotal + shipping + tax;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

function setupFormSubmission() {
  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const orderData = {
        shipping: Object.fromEntries(formData.entries()),
        payment: {
          cardNumber: formData.get("cardNumber"),
          expDate: formData.get("expDate"),
          cvv: formData.get("cvv")
        },
        items: getLocalStorage("so-cart") || [],
        totals: {
          subtotal: document.getElementById("subtotal").textContent,
          shipping: document.getElementById("shipping").textContent,
          tax: document.getElementById("tax").textContent,
          total: document.getElementById("total").textContent
        }
      };
      
      // Here you would typically send the orderData to your server
      console.log("Order data:", orderData);
      
      // For now, we'll just simulate a successful order
      alert("Order placed successfully!");
      localStorage.removeItem("so-cart");
      window.location.href = "/";
    });
  }
}

// Initialize checkout
checkout();
