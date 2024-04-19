const body = document.querySelector("body"),
      sidebar = document.querySelector(".sidebar"),
      toggle = document.querySelector(".toggle"),
      search = document.querySelector(".search-box"),
      modeSwitch = document.querySelector(".toggle-switch"),
      modeText = document.querySelector(".mode-text");


      
toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

search.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if(body.classList.contains("dark")){
        modeText.innerText = "Light Mode"
    }else{
        modeText.innerText = "Dark Mode"
    }
})



document.addEventListener("DOMContentLoaded", function() {
    const dashboardBtn = document.getElementById("dashboardBtn");
    
    dashboardBtn.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "index.html";
    })
});

document.addEventListener("DOMContentLoaded", function() {
    const trainingBtn = document.getElementById("trainingBtn");
    
    trainingBtn.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "training.html";
    })
});

document.addEventListener("DOMContentLoaded", function() {
    const logoutBtn = document.getElementById("logoutBtn");
    
    logoutBtn.addEventListener("click", function(event) {
        event.preventDefault();

        // Effacer les informations d'identification de l'utilisateur stockées localement
        localStorage.removeItem("currentUser");

        // Rediriger vers la page de connexion
        window.location.href = "login.html";
    });
});

