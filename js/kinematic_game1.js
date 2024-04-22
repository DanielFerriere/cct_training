import {GameImg2C} from "./game_script.js";

const button1 = document.getElementById("gameBtn1");
const button2 = document.getElementById("gameBtn2");
const button3 = document.getElementById("gameBtn3");
const button4 = document.getElementById("gameBtn4");
const gameImg = document.getElementById("gameImg");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const retryBtn = document.getElementById("retryBtn");





var game = new GameImg2C( "../assets/kinematic", gameImg, button1, button2, button3, button4, modal, modalContent, retryBtn);

game.begin();

