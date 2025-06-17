import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";

const tokenKey = "so-token";

export async function login(creds, redirect = "/") {
    try {
        const token = await loginRequest(creds)
        setLocalStorage(tokenKey, token);
        window.location = redirect;
    } catch (error) {
        alert("error.message.message");
    }

}

export function checkLogin() {
    
}

export function isTokenValid() {
    const token = getLocalStorage("so-token");
    if (!token || !token.expires ) {
        return false;
    }

    return Date.now() < token.expires;
}