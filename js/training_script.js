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





// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 30, left: 30};
// append the svg object to the body of the page
const svg = d3.select("#graphDiv")
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const svghtml = svg.node();

//Read the data
d3.json("../test_data.json").then(
  // Now I can use this dataset:
  function(data) {
    console.log(data);
    // Add X axis --> it is a date format
    const x = d3.scalePoint()
      .range([ 0, svghtml.clientWidth])
      .domain([1,2,3,"D",5,6,7])
    svg.append("g")
      .attr("transform", "translate(0," + svghtml.clientHeight + ")")
      .call(d3.axisBottom(x));
    // Add Y axis
    const y = d3.scaleLinear()
      .domain( [0, 1.0])
      .range([ svghtml.clientHeight, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));
    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 4)
      .attr("d", d3.line()
        .x(d => x(d.occ))
        .y(d => y(d.value))
        )
    // Add the points
    svg.append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.occ))
        .attr("cy", d => y(d.value))
        .attr("r", 8)
        .attr("fill", "#69b3a2")
})