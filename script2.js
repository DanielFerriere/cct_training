document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.querySelector(".wrapper");
    const loginLink = document.querySelector(".login-link");
    const registerLink = document.querySelector(".register-link");

    registerLink.addEventListener('click', () => {
        wrapper.classList.add("active");
    });

    loginLink.addEventListener('click', () => {
        wrapper.classList.remove("active");
    });

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var full_name = document.getElementById("full_name").value;
        var full_email = document.getElementById("full_email").value;
        var full_password = document.getElementById("full_password").value;

        // Vérifier si l'utilisateur existe déjà
        var users = JSON.parse(localStorage.getItem("users")) || [];

        var existingUser = users.find(user => {
            var decryptedEmail = CryptoJS.AES.decrypt(user.email, "secret-key").toString(CryptoJS.enc.Utf8);
            return decryptedEmail === full_email;
        });

        if (existingUser) {
            alert("User already exists. Please log in.");
            return;
        }

        // Chiffrer le nom d'utilisateur, l'adresse e-mail et le mot de passe avant de les stocker
        var encryptedName = CryptoJS.AES.encrypt(full_name, "secret-key").toString();
        var encryptedEmail = CryptoJS.AES.encrypt(full_email, "secret-key").toString();
        var encryptedPassword = CryptoJS.AES.encrypt(full_password, "secret-key").toString();

        // Ajouter le nouvel utilisateur avec les données chiffrées
        var newUser = { name: encryptedName, email: encryptedEmail, password: encryptedPassword };
        users.push(newUser);

        // Écrire les données dans le stockage local
        localStorage.setItem("users", JSON.stringify(users));

        alert("User registered successfully! Please log in.");

        // Redirection facultative vers la page de connexion après l'inscription
        wrapper.classList.remove("active");
    });

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var loginEmail = document.getElementById("loginEmail").value;
        var loginPassword = document.getElementById("loginPassword").value;

        var users = JSON.parse(localStorage.getItem("users")) || [];

        var currentUser = users.find(user => {
            var decryptedEmail = CryptoJS.AES.decrypt(user.email, "secret-key").toString(CryptoJS.enc.Utf8);
            return decryptedEmail === loginEmail && CryptoJS.AES.decrypt(user.password, "secret-key").toString(CryptoJS.enc.Utf8) === loginPassword;
        });

        if (currentUser) {
            // Redirection vers la page index.html si les identifiants sont corrects
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});
