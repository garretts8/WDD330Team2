import { getLocalStorage } from "./utils.mjs";

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  itemCount: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,

  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key) || [];
    this.calculateItemSummary();
    this.calculateOrdertotal();
  },

  calculateItemSummary: function () {
    const cartItems = getLocalStorage("so-cart") || [];
    const orderItemsContainer = document.getElementById("order-items");
    const subtotalElement = document.getElementById("subtotal");

    if (cartItems.length === 0) {
      orderItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    let subtotal = 0;
    const itemsHtml = cartItems
      .map((item) => {
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
      })
      .join("");

    orderItemsContainer.innerHTML = itemsHtml;
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  },

  calculateOrdertotal: function () {
    const subtotalText = document.getElementById("subtotal").textContent || "$0";
    const subtotalValue = parseFloat(subtotalText.replace("$", "")) || 0;

    this.shipping = 5.99;
    this.tax = parseFloat((subtotalValue * 0.08).toFixed(2));
    this.orderTotal = parseFloat(
      (subtotalValue + this.shipping + this.tax).toFixed(2)
    );

    document.getElementById("shipping").textContent = `$${this.shipping.toFixed(
      2
    )}`;
    document.getElementById("tax").textContent = `$${this.tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${this.orderTotal.toFixed(
      2
    )}`;
  },

  checkout: function (form) {
    const formData = new FormData(form);
    const cartItems = getLocalStorage(this.key) || [];

    const itemCount = cartItems.reduce((sum, item) => {
      return sum + (Number(item.quantity) || 1);
    }, 0);

    const orderData = {
      itemCount: itemCount,
      shipping: Object.fromEntries(formData.entries()),
      payment: {
        cardNumber: formData.get("cardNumber"),
        expDate: formData.get("expDate"),
        cvv: formData.get("cvv"),
      },
      items: cartItems,
      totals: {
        subtotal: document.getElementById("subtotal").textContent,
        shipping: document.getElementById("shipping").textContent,
        tax: document.getElementById("tax").textContent,
        total: document.getElementById("total").textContent,
      },
    };

    console.log("Order data:", orderData);

    alert("Order placed successfully!");
    localStorage.removeItem(this.key);
    window.location.href = "/";
  },
};

export default checkoutProcess;
