const body = document.querySelector("body"),
      sidebar = document.querySelector(".sidebar"),
      toggle = document.querySelector(".toggle"),
      search = document.querySelector(".search-box"),
      modeSwitch = document.querySelector(".toggle-switch"),
      modeText = document.querySelector(".mode-text");



/**
 * redirect to the right rootfile depending if you are on local or github
 * @param {string} filename - The name of the file present on the root website
 */
function go2RootFile (filename) {
    let listDir = window.location.href.split("/").filter((v) => v != ""); 
    if (listDir.includes("cct_training")) { // if you are on github
        window.location.href = "/cct_training/" + filename;
    } else { // if you are on local
        window.location.href = "/" + filename;
    }
}



//check if user was previously in dark mode
if(localStorage.getItem('dark_mode') === 'true') {
    //switch to dark mode if the user was prevously in dark mode
    body.classList.add('dark');
}



toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

search.addEventListener("click", () => {
    sidebar.classList.remove("close");
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if(body.classList.contains("dark")){
        localStorage.setItem('dark_mode', true);
        modeText.innerText = "Light Mode"
    }else{
        localStorage.setItem('dark_mode', false);
        modeText.innerText = "Dark Mode"
    }
});



document.addEventListener("DOMContentLoaded", function() {
    const dashboardBtn = document.getElementById("dashboardBtn");
    
    dashboardBtn.addEventListener("click", function(event) {
        event.preventDefault();
        go2RootFile("index.html");
    })
});

document.addEventListener("DOMContentLoaded", function() {
    const trainingBtn = document.getElementById("trainingBtn");
    
    trainingBtn.addEventListener("click", function(event) {
        event.preventDefault();
        go2RootFile("training.html")
    })
});

document.addEventListener("DOMContentLoaded", function() {
    const logoutBtn = document.getElementById("logoutBtn");
    
    logoutBtn.addEventListener("click", function(event) {
        event.preventDefault();

        // Effacer les informations d'identification de l'utilisateur stockées localement
        localStorage.removeItem("currentUser");

        // Rediriger vers la page de connexion
        window.location.href = go2RootFile("login.html");
    });
});






