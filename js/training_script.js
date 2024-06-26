const shapeBtn = document.getElementById("shapeBtn");
const kinematicBtn = document.getElementById("kinematicBtn");
const materialBtn = document.getElementById("materialBtn");

const modal = document.querySelector(".modal");
const shapeModal = document.getElementById("shapeModal");
const kinematicModal = document.getElementById("kinematicModal");
const materialModal = document.getElementById("materialModal");

var arrayGamemodeBtn = [];
const arrayBackBtn = document.getElementsByClassName("backBtn");

for (let i=0; i<3; i++) {
    arrayGamemodeBtn.push([]);
    for (let j=0; j<4; j++) {
        arrayGamemodeBtn[i].push(document.getElementById("BtnG"+(i+1)+"M"+(j+1)));
    }
}


/**
 * Hide all modal
 */
function hide_modal() {
    modal.classList.remove("show-modal");
    shapeModal.classList.remove("show-modal-content");
    kinematicModal.classList.remove("show-modal-content");
    materialModal.classList.remove("show-modal-content");
}




shapeBtn.addEventListener("click", function() {
    shapeModal.classList.toggle("show-modal-content");
    modal.classList.toggle("show-modal");
});

kinematicBtn.addEventListener("click", function() {
    kinematicModal.classList.toggle("show-modal-content");
    modal.classList.toggle("show-modal");
});

materialBtn.addEventListener("click", function() {
    materialModal.classList.toggle("show-modal-content");
    modal.classList.toggle("show-modal");
});




arrayGamemodeBtn[0][0].addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "./page/shape_game1.html";
    hide_modal();
});

arrayGamemodeBtn[0][1].addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "./page/shape_game2.html";
    hide_modal();
});

arrayGamemodeBtn[0][2].addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "./page/shape_game3.html";
    hide_modal();
});

arrayGamemodeBtn[0][3].addEventListener("click", function(event) {
    event.preventDefault();
    window.alert("Coming soon...");
})


arrayGamemodeBtn[1][0].addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "./page/kinematic_game1.html";
    hide_modal();
});

arrayGamemodeBtn[1][1].addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "./page/kinematic_game2.html";
    hide_modal();
});

arrayGamemodeBtn[1][2].addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "./page/kinematic_game3.html";
    hide_modal();
});

arrayGamemodeBtn[1][3].addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "./page/kinematic_game4.html";
    hide_modal();
});


arrayGamemodeBtn[2][0].addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "./page/material_game1.html";
    hide_modal();
});

arrayGamemodeBtn[2][1].addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "./page/material_game2.html";
    hide_modal();
});

arrayGamemodeBtn[2][2].addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "./page/material_game3.html";
    hide_modal();
});

arrayGamemodeBtn[2][3].addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "./page/material_game4.html";
    hide_modal();
});







for (let i=0; i<arrayBackBtn.length; i++) {
    arrayBackBtn[i].addEventListener("click", function () {
        hide_modal();
    });
}





