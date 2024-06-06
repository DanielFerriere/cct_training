// Sélectionnez le bouton AFK
const afkButton = document.getElementById('afkButton');

const MotusButton = document.getElementById('MotusButton');

MotusButton.addEventListener('click', function(){
    window.location.href = 'motus.html';
});

// Ajouter un gestionnaire d'événements clic au bouton AFK
afkButton.addEventListener('click', function() {
    window.location.href = 'afk.html';
});

document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour mettre à jour l'affichage de la date et de l'heure en fonction du format sélectionné
    function updateDateTimeDisplay() {
        var dateTimeFormat = document.getElementById("dateTimeFormat").value;
        var dateTimeDisplay = document.getElementById("dateTimeDisplay");
        var currentDate = new Date();

        // Choix du format de date et d'heure
        var options = {};
        switch(dateTimeFormat) {
            case "fullDate":
                options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                break;
            case "time":
                options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
                break;
            case "custom":
                options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
                break;
            default:
                break;
        }

        // Formatage de la date et de l'heure
        var formattedDateTime = currentDate.toLocaleString('fr-FR', options);
        
        // Mise à jour de l'affichage
        dateTimeDisplay.textContent = formattedDateTime;
    }

    // Écouteur d'événement pour détecter le changement de sélection dans la liste déroulante
    document.getElementById("dateTimeFormat").addEventListener("change", updateDateTimeDisplay);

    // Appel initial de la fonction pour afficher la date et l'heure lors du chargement de la page
    updateDateTimeDisplay();
});
