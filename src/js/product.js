import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");

// productDetails(productId);

if (productId) {
  productDetails(productId);
} else {
  console.error("We couldn't find product ID in the  URL");
}
