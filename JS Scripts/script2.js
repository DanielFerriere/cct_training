const wrapper = document.querySelector(".wrapper"),
      loginLink = document.querySelector(".login-link"),
      registerLink = document.querySelector(".register-link");

registerLink.addEventListener('click', () => {
    wrapper.classList.add("active");
})

loginLink.addEventListener('click', () => {
    wrapper.classList.remove("active");
})

document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var full_name = document.getElementById("full_name").value;
        var full_email = document.getElementById("full_email").value;
        var full_password = document.getElementById("full_password").value;

        localStorage.setItem("Full-Name", full_name);
        localStorage.setItem("Full-Email", full_email);
        localStorage.setItem("Full-Password", full_password);

        // Optional: Redirect to login page after registration
        // window.location.href = "login.html";
    });

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var loginEmail = document.getElementById("loginEmail").value;
        var loginPassword = document.getElementById("loginPassword").value;

        var storedEmail = localStorage.getItem("Full-Email");
        var storedPassword = localStorage.getItem("Full-Password");

        if (loginEmail === storedEmail && loginPassword === storedPassword) {
            // Redirect to index.html if credentials match
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});
