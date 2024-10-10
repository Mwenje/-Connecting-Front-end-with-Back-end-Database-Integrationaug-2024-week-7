const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const register = document.getElementById("frm-registration");
const login = document.getElementById("frm-login");
const emailLogin = document.getElementById("email-login");
const passwordLogin = document.getElementById("password-login");

document.addEventListener("DOMContentLoaded", () => {
  if (register) {
    register.addEventListener("submit", async (e) => {
      e.preventDefault();

      const userData = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      //   //send the requestI request for registration
      try {
        const response = await fetch("/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const results = await response.json();
        console.log(results);
        alert(results.message); // Display registration message
        window.location.href = "/login.html";
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during registration.");
      }
    });
  }

  if (login) {
    login.addEventListener("submit", async (e) => {
      e.preventDefault();

      loginData = {
        email: emailLogin.value,
        password: passwordLogin.value,
      };

      //send the requestI request for login
      try {
        const response = await fetch("/auth/loginUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const results = await response.json();
        console.log(results);
        // Display registration message);

        // Redirect to the dashboard after successful login
        if (response.ok) {
          // Store the user info or token in localStorage/sessionStorage
          localStorage.setItem("user", JSON.stringify(results.user));
          alert(
            `${results.message}, Welcome ${results.user.name} of email address: ${results.user.email}`
          );

          // Redirect to the dashboard after successful login
          window.location.href = "/dashboard.html";
        } else {
          alert(results.message); // Show error message if login fails
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Invalid credentials!");
      }
    });
  }
});
