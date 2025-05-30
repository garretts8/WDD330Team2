import { loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default function login() {
  loadHeaderFooter().then(() => {
    setupFormSubmission();
  });
}

function setupFormSubmission() {
  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const email = form.email.value.toLowerCase(); // normalize email to lowercase
      const password = form.password.value;
      
      try {
        // Get all users
        const users = getLocalStorage("so-users") || [];
        
        // Find user by email (case insensitive)
        const user = users.find(u => u.email.toLowerCase() === email);
        
        if (!user) {
          alert("No account found with that email");
          return;
        }
        
        // Check password (in production, you would compare hashed passwords)
        if (user.password !== password) {
          alert("Incorrect password");
          return;
        }
        
        // Store user in session
        setLocalStorage("so-user", user);
        
        alert("Login successful!");
        window.location.href = "/";
      } catch (err) {
        console.error("Login error:", err);
        alert("Error logging in. Please try again.");
      }
    });
  }
}

// Initialize login
login();
