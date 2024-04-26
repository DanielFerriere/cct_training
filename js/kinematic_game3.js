import {GameWord2Img} from "./game_script.js";

const gameGuess = document.getElementById("gameGuess");
const button1 = document.getElementById("gameBtn1");
const button2 = document.getElementById("gameBtn2");
const button3 = document.getElementById("gameBtn3");
const button4 = document.getElementById("gameBtn4");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const retryBtn = document.getElementById("retryBtn");





var game = new GameWord2Img( "../assets/kinematic", gameGuess, button1, button2, button3, button4, modal, modalContent, retryBtn);

game.begin();

