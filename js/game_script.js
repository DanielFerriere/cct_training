import * as utils from "./utils_script.js";





class Game {

    constructor(imagesDir, modal, modalContent, retryBtn) {
        this.answer = "";
        this.score = 0;
        this.score_max = 0;
        this.guessing = [];
        this.references = [];

        this.imagesDir = imagesDir;

        this.modal = modal;
        this.modalContent = modalContent;
        this.retryBtn = retryBtn;

        var self = this;
        retryBtn.addEventListener("click", function(event) {
            console.log("Retry button has been click");
            self.begin();
        });
    }


    add_point() {
        ++this.score;
    }

    async begin() {
        const response = await fetch(this.imagesDir + "/image.json");
        var json_data = await response.json();
        this.references = json_data["name_file_fr"];

        this.score = 0;
        this.score_max = this.references.length;

        this.guessing = this.references.slice();
        utils.shuffle(this.guessing);

        this.modal.classList.remove("show-modal");
        this.modalContent.classList.remove("show-modal-content");
        this.new_guess();
    }

    finish_game() {
        let textModal = this.modalContent.querySelector("h2");
        textModal.innerText = "Votre score est de ".concat(this.score,"/",this.score_max);
        this.modalContent.classList.toggle("show-modal-content");

        this.modal.classList.toggle("show-modal");
    }

    new_guess() {}
    reply() {}
}



class GameImg2Choice extends Game {

    constructor(imagesDir, gameImg, button1, button2, button3, button4, modal, modalContent, retryBtn) {
        super(imagesDir, modal, modalContent, retryBtn);

        this.gameImg = gameImg;
        this.buttons = [button1, button2, button3, button4];

        var self = this;
        button1.addEventListener("click", function(event) {
            console.log("Button 1 has been click");
            self.reply(0);
        });
        
        button2.addEventListener("click", function(event) {
            console.log("Button 2 has been click");
            self.reply(1);
        });
        
        button3.addEventListener("click", function(event) {
            console.log("Button 3 has been click");
            self.reply(2);
        });
        
        button4.addEventListener("click", function(event) {
            console.log("Button 4 has been click");
            self.reply(3);
        });
    }


    new_guess() {
        //get the new guess
        let guess = this.guessing.shift();
        this.answer = guess["name"];

        //change the game image
        this.gameImg.src = this.imagesDir + "/".concat(guess["file"]);

        //get the texte for the button
        let options = utils.array_sample(this.references.map((elt) => elt["name"]).filter((elt) => elt != this.answer), 3);
        options.push(this.answer);
        utils.shuffle(options);

        //resore button state
        for (let i=0; i<4; i++) {
            this.buttons[i].disabled = false;
            this.buttons[i].classList.remove("right");
            this.buttons[i].classList.remove("wrong");
        }

        //change buttons texte
        for (let i=0; i<4; i++) {
            this.buttons[i].innerText = options[i];
        }
    }

    reply(n) {
        if (this.buttons[n].innerText == this.answer) this.add_point();

        for (let i=0; i<4; i++) {
            this.buttons[i].disabled = true;
            if (this.buttons[i].innerText == this.answer) {
                this.buttons[i].classList.toggle("right");
            } else if (i == n) {
                this.buttons[i].classList.toggle("wrong");
            }
        }

        if (this.guessing.length == 0) {
            this.finish_game();
            return;
        }

        setTimeout(() => {
            this.new_guess();
        }, 2000);
    }
}



class GameImg2Word extends Game {

    constructor(imagesDir, gameImg, gameForm, gameInput, sendBtn, modal, modalContent, retryBtn) {
        super(imagesDir, modal, modalContent, retryBtn);

        this.gameImg = gameImg;
        this.gameForm = gameForm;
        this.gameInput = gameInput;
        this.sendBtn = sendBtn;

        var self = this;
        gameForm.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log("Response get submit");
            self.reply();
        });
    }


    new_guess() {
        //get the new guess
        let guess = this.guessing.shift();
        this.answer = guess["name"];

        //change the game image
        this.gameImg.src = this.imagesDir + "/".concat(guess["file"]);

        //resore input state
        this.gameInput.value = "";
        this.gameInput.disabled = false;
        this.sendBtn.disabled = false;
        this.gameInput.classList.remove("right");
        this.gameInput.classList.remove("wrong");
    }

    reply() {
        this.gameInput.disabled = true;
        this.sendBtn.disabled = true;

        if (this.gameInput.value.toLowerCase() == this.answer.toLowerCase()) {
            this.add_point();
            this.gameInput.classList.toggle("right");
        } else {
            this.gameInput.classList.toggle("wrong");
        }

        if (this.guessing.length == 0) {
            this.finish_game();
            return;
        }

        setTimeout(() => {
            this.new_guess();
        }, 2000);
    }
}



class GameWord2Img extends Game {

    constructor(imagesDir, gameGuess, button1, button2, button3, button4, modal, modalContent, retryBtn) {
        super(imagesDir, modal, modalContent, retryBtn);

        this.gameGuess = gameGuess;
        this.buttons = [button1, button2, button3, button4];
        this.buttons_image = this.buttons.map((elt) => elt.querySelector("img"));

        var self = this;
        button1.addEventListener("click", function(event) {
            console.log("Button 1 has been click");
            self.reply(0);
        });
        
        button2.addEventListener("click", function(event) {
            console.log("Button 2 has been click");
            self.reply(1);
        });
        
        button3.addEventListener("click", function(event) {
            console.log("Button 3 has been click");
            self.reply(2);
        });
        
        button4.addEventListener("click", function(event) {
            console.log("Button 4 has been click");
            self.reply(3);
        });
    }


    new_guess() {
        //get the new guess
        let guess = this.guessing.shift();
        this.answer = guess["name"];

        //change the game image
        this.gameGuess.innerText = this.answer;

        //get the texte for the button
        let options = utils.array_sample(this.references.filter((elt) => elt != guess), 3);
        options.push(guess);
        utils.shuffle(options);

        //resore button state
        for (let i=0; i<4; i++) {
            this.buttons[i].disabled = false;
            this.buttons[i].classList.remove("right");
            this.buttons[i].classList.remove("wrong");
        }

        //change buttons images and value
        for (let i=0; i<4; i++) {
            this.buttons_image[i].src = this.imagesDir + "/".concat(options[i]["file"]);
            this.buttons[i].value = options[i]["name"];
        }
    }

    reply(n) {
        if (this.buttons[n].value == this.answer) this.add_point();

        for (let i=0; i<4; i++) {
            this.buttons[i].disabled = true;
            if (this.buttons[i].value == this.answer) {
                this.buttons[i].classList.toggle("right");
            } else if (i == n) {
                this.buttons[i].classList.toggle("wrong");
            }
        }

        if (this.guessing.length == 0) {
            this.finish_game();
            return;
        }

        setTimeout(() => {
            this.new_guess();
        }, 2000);
    }
}





class GameKinematicPlan extends Game {
    constructor(plansDir, guessText, svgDiv, gameForm, gameInput, sendBtn, modal, modalContent, retryBtn) {
        super(plansDir, modal, modalContent, retryBtn);

        this.plansDir = plansDir;

        this.guessText = guessText;
        this.svgDiv = svgDiv;
        this.gameForm = gameForm;
        this.gameInput = gameInput;
        this.sendBtn = sendBtn;

        this.kinematic_group = [];
        this.kinematic_link = [];


        this.svg = d3.select(svgDiv).append("svg")
            .attr("width", "100%")
            .attr("height", "100%");

        let htmlsvg = this.svg.node();

        this.svg_height = htmlsvg.clientHeight;
        this.svg_width = htmlsvg.clientWidth;
        this.img_height = 0;
        this.img_width = 0;

        this.g = this.svg.append("g");

        this.img = this.g.append("image");

        this.zoom = d3.zoom();

        this.svg.call(this.zoom);


        var self = this;
        gameForm.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log("Response get submit");
            self.reply();
        });
    }

    zoomingTo(bound) {
        let [[x0, y0], [x1, y1]] = bound;
    
        this.svg.transition().duration(750).call(
            this.zoom.transform,
            d3.zoomIdentity
                .translate(this.svg_width / 2, this.svg_height / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / this.svg_width, (y1 - y0) / this.svg_height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        );
    }

    async begin() {
        const response = await fetch(this.plansDir + "/info_plan.json");
        var json_data = await response.json();
        var all_plan = json_data["fr"];

        this.references = all_plan[utils.random_int(all_plan.length)];
        this.kinematic_group = this.references["kinematic"]["group"];
        this.kinematic_link = this.references["kinematic"]["link"];

        this.score = 0;
        this.score_max = this.kinematic_link.length;

        this.guessing = this.kinematic_link.slice();
        utils.shuffle(this.guessing);


        this.img_height = this.references["height"];
        this.img_width = this.references["width"];

        this.img.attr("href", this.plansDir + "/" + this.references["file_color"])
            .attr("height", this.img_height)
            .attr("width", this.img_width);

        this.zoom.scaleExtent([Math.min(this.svg_height/this.img_height, this.svg_width/this.img_width), 8])
            .on("zoom", (event) => {
                const {transform} = event;
                this.g.attr("transform", transform);
            });


        this.modal.classList.remove("show-modal");
        this.modalContent.classList.remove("show-modal-content");
        this.new_guess();
    }

    new_guess() {
        //get the new guess
        let guess = this.guessing.shift();
        this.answer = guess["name"];

        //change the guessText
        let color_group1 = "";
        let color_group2 = "";
        for (let i = 0; i<this.kinematic_group.length; i++) {
            let group = this.kinematic_group[i];
            
            if (group["name"] == guess["relate_group"][0]) {
                color_group1 = group["color"];
            } else if (group["name"] == guess["relate_group"][1]) {
                color_group2 = group["color"];
            }
        }
        
        this.guessText.innerText = "Quel est la liaison entre le groupe " + color_group1 + "/" + color_group2 + " ?";

        //zoom to the new guess
        this.zoomingTo(guess["bound"]);

        //resore input state
        this.gameInput.value = "";
        this.gameInput.disabled = false;
        this.sendBtn.disabled = false;
        this.gameInput.classList.remove("right");
        this.gameInput.classList.remove("wrong");
    }

    reply() {
        this.gameInput.disabled = true;
        this.sendBtn.disabled = true;

        if (this.answer.toLowerCase().split("/").includes(this.gameInput.value.toLowerCase())) {
            this.add_point();
            this.gameInput.classList.toggle("right");
        } else {
            this.gameInput.classList.toggle("wrong");
        }

        if (this.guessing.length == 0) {
            this.finish_game();
            return;
        }

        setTimeout(() => {
            this.new_guess();
        }, 2000);
    }


}



export {GameImg2Choice, GameImg2Word, GameWord2Img, GameKinematicPlan};