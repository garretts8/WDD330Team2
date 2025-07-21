import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: "index.html",
        cart: "cart/index.html",
        checkout: "checkout/index.html",
        product: "product_pages/index.html",
        product_list: "product_list/index.html",
        login: "login/index.html",
        signup: "signup/index.html",
        orders: "orders/index.html",
        success: "checkout/success.html",
        // product2: "product_pages/marmot-ajax-3.html",
        // product3: "product_pages/northface-alpine-3.html",
        // product4: "product_pages/northface-talus-4.html",
      },
    },
  },
});
