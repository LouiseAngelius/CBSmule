// login.js

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  // Function to set a cookie
  function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookie;
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username-field").value;
    const password = document.getElementById("password-field").value;
    const email = document.getElementById("email-field").value;

    // Send a request to the server to validate the login credentials
    fetch("/login/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data) {
          // Login successful
          console.log("Login successful");
          // Set a cookie for the user
          setCookie("user_id", data.UserID, 7); // Adjust the cookie expiration as needed
        } else {
          // Login failed
          console.log("Login failed");
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username-signup-field").value;
    const email = document.getElementById("email-signup-field").value;
    const password = document.getElementById("password-signup-field").value;
    const phoneNumber = document.getElementById("phonenumber-field").value;
    const favoriteJuice = document.getElementById("favoritejuice-field").value;
    const favoriteCoffee = document.getElementById(
      "favoritecoffee-field"
    ).value;
    const favoriteSandwich = document.getElementById(
      "favoritesandwich-field"
    ).value;

    // Send a request to the server to create a new user
    fetch("/login/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        phoneNumber,
        favoriteJuice,
        favoriteCoffee,
        favoriteSandwich,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data) {
          // Signup successful
          console.log("Signup successful");
          // Set a cookie for the user
          setCookie("user_id", data.UserID, 7); // Adjust the cookie expiration as needed
        } else {
          // Signup failed
          console.log("Signup failed");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
});
