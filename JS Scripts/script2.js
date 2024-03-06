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

        // Vérifier si l'utilisateur existe déjà
        var users = JSON.parse(localStorage.getItem("users")) || [];

        var existingUser = users.find(user => user.email === full_email);

        if (existingUser) {
            alert("User already exists. Please log in.");
            return;
        }

        // Ajouter le nouvel utilisateur
        var newUser = { name: full_name, email: full_email, password: full_password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("User registered successfully! Please log in.");

        // Redirection facultative vers la page de connexion après l'inscription
        window.location.href = "login.html";
    });

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var loginEmail = document.getElementById("loginEmail").value;
        var loginPassword = document.getElementById("loginPassword").value;

        var users = JSON.parse(localStorage.getItem("users")) || [];

        var currentUser = users.find(user => user.email === loginEmail && user.password === loginPassword);

        if (currentUser) {
            // Redirection vers la page index.html si les identifiants sont corrects
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});
