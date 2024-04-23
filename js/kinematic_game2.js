import {GameImg2Word} from "./game_script.js";

const gameImg = document.getElementById("gameImg");
const gameForm = document.getElementById("gameForm");
const gameInput = document.getElementById("gameInput");
const sendBtn = document.getElementById("sendBtn");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const retryBtn = document.getElementById("retryBtn");



var game = new GameImg2Word( "../assets/kinematic", gameImg, gameForm, gameInput, sendBtn, modal, modalContent, retryBtn);

game.begin();

