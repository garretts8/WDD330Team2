
import { findProductById } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

// three functions are recommended: productDetails(productId), addToCart() -moved from the 
// product.js, and renderProductDetails().

//This function will become the entrypoint into our module and will make sure that 
// everything happens in the right order. This function should be the default export.
let product = {};

export default async function productDetails(productId) {
    try {
      product = await findProductById(productId);
  
      if (!product || !product.Id) {
        throw new Error("Product not found.");
      }
  
      renderProductDetails();
  
      const addButton = document.getElementById("addToCart");
      if (addButton) {
        addButton.addEventListener("click", addToCart);
        addButton.style.display = "block";
      }
  
    } catch (error) {
      console.error("Error loading product:", error);
  
      const existingError = document.getElementById("dynamic-error");
      if (!existingError) {
        const errorMessage = document.createElement("p");
        errorMessage.id = "dynamic-error";
        errorMessage.textContent = "This item couldn’t be found. Please try again or select a different product.";
        errorMessage.style.color = "red";
        errorMessage.style.margin = "1em 0";
  
        const referenceNode = document.getElementById("addToCart");
        if (referenceNode && referenceNode.parentNode) {
          referenceNode.parentNode.insertBefore(errorMessage, referenceNode);
        }
      }
  
      // Hide  button
      const addButton = document.getElementById("addToCart");
      if (addButton) {
        addButton.style.display = "none";
      }
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
  alert(`${product.Brand.Name} was successfully added!`)
  window.location.reload();
  
}


// method to fill in the details for the current product in the HTML.
function renderProductDetails() {
  const discountPercentage = ((product.SuggestedRetailPrice - product.ListPrice) / product.SuggestedRetailPrice) * 100;
  document.querySelector("#productName").innerHTML = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerHTML = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;  
  document.querySelector("#productImage").alt = product.Name; 
  document.querySelector("#productSuggestedRetailPrice").innerHTML ="$" + product.SuggestedRetailPrice.toFixed(2);  
  document.querySelector("#productFinalPrice").innerHTML = "$" + product.FinalPrice; 
  document.querySelector("#productDiscountPercent").innerHTML = "Save "+ discountPercentage.toFixed(0) +"%!";
  document.querySelector("#productColorName").innerHTML = "Colors: "+ product.Colors[0].ColorName; 
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
/* product name,  product without brand, product image source, product image alt, productFinalPrice, productColorName, productDescriptionHtmlSimple, addToCart */

// Handles Add to Cart clicks
