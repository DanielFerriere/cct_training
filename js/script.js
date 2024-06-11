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
        go2RootFile("login.html");
    });
});




document.addEventListener('DOMContentLoaded', function () {
    let timeout;

    // Fonction de redirection vers la page AFK après 100 minutes d'inactivité
    function startInactivityTimer() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            window.location.href = 'afk.html';
        }, 6000000); // 100 min
    }

    // Remise à zéro du timer en cas d'activité de l'utilisateur
    function resetTimer() {
        clearTimeout(timeout);
        startInactivityTimer();
    }

    // Événements pour détecter l'activité de l'utilisateur
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keypress', resetTimer);
    document.addEventListener('click', resetTimer);
    document.addEventListener('scroll', resetTimer);
    document.addEventListener('keydown', resetTimer);

    startInactivityTimer();

     // Fonction de recherche et de mise en évidence des résultats dans la barre de navigation
    async function searchInPages(query) {
        const pages = [
            { name: 'Dashboard', url: 'index.html', element: document.querySelector('.nav-link a[href="#"]') },
            { name: 'Learning', url: 'learning.html', element: document.querySelector('.nav-link a[href="#"]') },
            { name: 'Exercising', url: 'training.html', element: document.querySelector('.nav-link a[href="./training.html"]') },
            { name: 'Leaderboard', url: 'leaderboard.html', element: document.querySelector('.nav-link a[href="#"]') },
            { name: 'Settings', url: 'settings.html', element: document.querySelector('.nav-link a[href="./settings.html"]') }
        ];

        pages.forEach(page => {
            page.element.style.backgroundColor = ''; 
        });

        for (const page of pages) {
            try {
                const response = await fetch(page.url);
                const text = await response.text();
                if (text.toLowerCase().includes(query.toLowerCase())) {
                    page.element.style.backgroundColor = '#55209b';
                    page.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } catch (error) {
                console.error(`Error fetching ${page.url}:`, error);
            }
        }
    }

    const searchBox = document.querySelector('.search-box input');
    searchBox.addEventListener('input', function () {
        const query = searchBox.value;
        if (query.length > 0) {
            searchInPages(query);
        }
    });
});
