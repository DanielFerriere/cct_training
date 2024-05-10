import {GameKinematicPlan} from "./game_script.js";

const guessText = document.getElementById("guessText");
const gameDiv = document.querySelector(".plan-div");
const gameForm = document.getElementById("gameForm");
const gameInput = document.getElementById("gameInput");
const sendBtn = document.getElementById("sendBtn");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const retryBtn = document.getElementById("retryBtn");





var game = new GameKinematicPlan( "../assets/plan", guessText, gameDiv, gameForm, gameInput, sendBtn, modal, modalContent, retryBtn);

game.begin();















/*
//const img = document.getElementById("gameImg");
//const htmlsvg = document.querySelector("svg");



//var width = 500;
//var height = 500;
var imgheight = 4966 ;
var imgwidth = 3511;

const svg = d3.select(".plan-div").append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

const htmlsvg = svg.node();

var height = htmlsvg.clientHeight;
var width = htmlsvg.clientWidth;

const g = svg.append("g");

const img = g.append("image");

    
img.attr("href", "../assets/test_plan.jpg")
    .attr("height", imgheight)
    .attr("width", imgwidth);

const zoom = d3.zoom();
    

svg.call(zoom);

zoom.scaleExtent([Math.min(height/imgheight, width/imgwidth), 8])
    //.translateExtent([[0,0], [imgheight, imgwidth]])
    .on("zoom", zoomed);




function clicked() {
    let x0 = 600;
    let y0 = 1000;
    let x1 = 900;
    let y1 = 1300;

    svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
    );
}


function zoomed(event) {
    const {transform} = event;
    g.attr("transform", transform);
}

setTimeout(clicked, 2000);
//clicked();
*/