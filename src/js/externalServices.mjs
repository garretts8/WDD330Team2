const baseURL = "http://server-nodejs.cit.byui.edu:3000/"

//import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}
export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  };
  return await fetch("http://server-nodejs.cit.byui.edu:3000/checkout", options)
    .then(convertToJson);
}

export async function loginRequest(user) {
  const options = {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(user),
  };
  const response = await fetch("http://server-nodejs.cit.byui.edu:3000/login", options).then(convertToJson);
    
  return response.accessToken;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  return response;
}