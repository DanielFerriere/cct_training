(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.gamemode = global.gamemode || {})));
}(this, function (exports) { 
    'use strict';


    //utils function

    /**
     * Returns a random int between 0 (included) and max (not included)
     * @param {Number} max - The max int possible (not included)
     * @returns {Number} - A random int between 0 (included) and max (not included)
     */
    function random_int(max) {
        return Math.floor(Math.random() * max);
    }
    
    /**
     * Suffle an array
     * @param {Object[]} array - The array to shuffle
     */
    function shuffle(array) {
        let currentIndex = array.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
            // Pick a remaining element...
            let randomIndex = random_int(currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    }
    
    /**
     * Returns an sample of array of length n if n<array.length else array.length
     * @param {Object[]} array - The initial array
     * @param {Number} n - Number of element from array we want to return
     * @returns {Object[]} - Sample of array with n element or array.length if n > array.length
     */
    function array_sample(array, n) {
        let sample = [];
        let numbers = [];
        for (let i=0; i<array.length; i++) numbers.push(i);
    
        //built the sample
        for (let i=0; i<Math.min(n, array.length); i++) {
            //get randomly the index of an number
            let index = random_int(numbers.length);
            //push an array object of index of numbers[index] into sample 
            sample.push(array[numbers[index]]);
            //erase the used number
            numbers.splice(index, 1);
        }
    
        return sample;
    }

    /**
     * Normalize string, get rid of accents and multiple space
     * @param {String} string - The string to normalize
     * @returns {String} - The normalize string
     */
    function normalize_str(string) {
        return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ +(?= )/g,'');
    }




    //game mode class

    class Game {
        /**
         * Create a basic base for gamemode
         * @param {Object} guessRemain - Document object, refer to how many guess done
         * @param {Object} modal - Document object, refer to modal pop up
         * @param {Object} modalContent - Document object, refer to the content of an modal
         * @param {Object} retryBtn - Document object, refer to an retry button, for retry game
         */
        constructor(guessRemain, modal, modalContent, retryBtn) {
            this.answer = "";
            this.score = 0;
            this.score_max = 0;
            this.guessing = [];
            this.references = [];
            
            this.guessRemain = guessRemain;

            this.modal = modal;
            this.modalContent = modalContent;
            this.retryBtn = retryBtn;
            
            //add event for retry button
            var self = this;
            retryBtn.addEventListener("click", function(event) {
                event.preventDefault();
                console.log("Retry button has been click");
                self.begin();
            });
        }
    
        /**
         * Add one point to score
         */
        add_point() {
            ++this.score;
        }

        /**
         * End up game
         */
        finish_game() {
            let textModal = this.modalContent.querySelector("h2");
            textModal.innerText = "Votre score est de ".concat(this.score,"/",this.score_max);
            this.modalContent.classList.toggle("show-modal-content");
    
            this.modal.classList.toggle("show-modal");
        }

        /**
         * Change the current number of guess done display
         */
        change_guessRemain() {}
        
        /**
         * Begin game
         */
        async begin() {}
        
        /**
         * Start a new guess
         */
        new_guess() {}
        reply() {}
    }



    class GameImg extends Game {
        /**
         * Create a base for image gamemode
         * @param {String} imagesDir - images directory for game, REQUIRE an image.json file in the dirrectory
         * @param {Object} guessRemain - Document object, refer to how many guess done
         * @param {Object} modal - Document object, refer to modal pop up
         * @param {Object} modalContent - Document object, refer to the content of an modal
         * @param {Object} retryBtn - Document object, refer to an retry button, for retry game
         */
        constructor(imagesDir, guessRemain, modal, modalContent, retryBtn) {
            super(guessRemain, modal, modalContent, retryBtn);
    
            this.imagesDir = imagesDir;
        }


        change_guessRemain() {
            this.guessRemain.innerText = "".concat(this.references.length-this.guessing.length, "/", this.references.length);
        }

    
        async begin() {
            //get the images reference and name
            const response = await fetch(this.imagesDir + "/image.json");
            var json_data = await response.json();
            this.references = json_data["name_file_fr"];
    
            this.score = 0;
            this.score_max = this.references.length;
    
            this.guessing = this.references.slice();
            shuffle(this.guessing);
            
            //hide modal
            this.modal.classList.remove("show-modal");
            this.modalContent.classList.remove("show-modal-content");
            this.new_guess();
        }

        new_guess() {}
        reply() {}
    }



    class GamePlan extends Game {
        /**
         * Create a base for plan gamemode
         * @param {String} plansDir - plans directory for game, REQUIRE an info_plan.json file in the dirrectory
         * @param {Object} guessText - Document object, refer to an indication for the guess
         * @param {Object} svgDiv - Document object, refer to svg div where plan are gonna be display
         * @param {Object} gameForm - Document object, refer to the object containing gameInput and sendBtn
         * @param {Object} gameInput - Document object, refer to the input box for the player guess
         * @param {Object} sendBtn - Document object, refer to the playser guess send button
         * @param {Object} guessRemain - Document object, refer to how many guess done
         * @param {Object} modal - Document object, refer to modal pop up
         * @param {Object} modalContent - Document object, refer to the content of an modal
         * @param {Object} retryBtn - Document object, refer to an retry button, for retry game
         */
        constructor(plansDir, guessText, svgDiv, gameForm, gameInput, sendBtn, guessRemain, modal, modalContent, retryBtn) {
            super(guessRemain, modal, modalContent, retryBtn);
    
            this.plansDir = plansDir;
    
            this.guessText = guessText;
            this.svgDiv = svgDiv;
            this.gameForm = gameForm;
            this.gameInput = gameInput;
            this.sendBtn = sendBtn;

            this.img_height = 0;
            this.img_width = 0;

            //create an d3 svg object
            this.svg = d3.select(svgDiv).append("svg")
                .attr("width", "100%")
                .attr("height", "100%");
            
            //get the document object of d3 svg object this.svg
            this.htmlsvg = this.svg.node();
            
            //prepare some d3 variable 
            this.g = this.svg.append("g");
    
            this.img = this.g.append("image");
    
            this.zoom = d3.zoom();
    
            this.svg.call(this.zoom);

            
            //add event for submit player guess
            var self = this;
            gameForm.addEventListener("submit", function(event) {
                event.preventDefault();
                console.log("Response get submit");
                self.reply();
            });
        }

        /**
         * Zoom to a specific place of this.svg
         * @param {Number[][]} bound - The bound of box arrond the things to zoom
         */
        zoomingTo(bound) {
            let [[x0, y0], [x1, y1]] = bound;
        
            this.svg.transition().duration(750).call(
                this.zoom.transform,
                d3.zoomIdentity
                    .translate(this.htmlsvg.clientWidth / 2, this.htmlsvg.clientHeight / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / this.htmlsvg.clientWidth, (y1 - y0) / this.htmlsvg.clientHeight)))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
            );
        }

        /**
         * Handle the plauer reply
         */
        reply() {
            this.gameInput.disabled = true;
            this.sendBtn.disabled = true;
    
            if (normalize_str(this.answer).toLowerCase().split("/").includes(normalize_str(this.gameInput.value).toLowerCase())) {
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

        change_guessRemain() {}

        async begin() {}

        new_guess() {}
    }
    
    
    


    class GameImg2Choice extends GameImg {
    
        constructor(imagesDir, gameImg, button1, button2, button3, button4, guessRemain, modal, modalContent, retryBtn) {
            super(imagesDir, guessRemain, modal, modalContent, retryBtn);
    
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
            this.change_guessRemain();
    
            //change the game image
            this.gameImg.src = this.imagesDir + "/".concat(guess["file"]);
    
            //get the texte for the button
            let options = array_sample(this.references.map((elt) => elt["name"]).filter((elt) => elt != this.answer), 3);
            options.push(this.answer);
            shuffle(options);
    
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
        
        /**
         * Handle the plauer reply
         * @param {int} n - The button number
         */
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
    
    
    
    class GameImg2Word extends GameImg {
    
        constructor(imagesDir, gameImg, gameForm, gameInput, sendBtn, guessRemain, modal, modalContent, retryBtn) {
            super(imagesDir, guessRemain, modal, modalContent, retryBtn);
    
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
            this.change_guessRemain();
    
            //change the game image
            this.gameImg.src = this.imagesDir + "/".concat(guess["file"]);
    
            //resore input state
            this.gameInput.value = "";
            this.gameInput.disabled = false;
            this.sendBtn.disabled = false;
            this.gameInput.classList.remove("right");
            this.gameInput.classList.remove("wrong");
        }
        
        /**
         * Handle the plauer reply
         */
        reply() {
            this.gameInput.disabled = true;
            this.sendBtn.disabled = true;
    
            if (normalize_str(this.answer).toLowerCase().split("/").includes(normalize_str(this.gameInput.value).toLowerCase())) {
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
    
    
    
    class GameWord2Img extends GameImg {
    
        constructor(imagesDir, gameGuess, button1, button2, button3, button4, guessRemain, modal, modalContent, retryBtn) {
            super(imagesDir, guessRemain, modal, modalContent, retryBtn);
    
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
            this.change_guessRemain();
    
            //change the game image
            this.gameGuess.innerText = this.answer;
    
            //get the texte for the button
            let options = array_sample(this.references.filter((elt) => elt != guess), 3);
            options.push(guess);
            shuffle(options);
    
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
        
        /**
         * Handle the plauer reply
         * @param {int} n - The button number
         */
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
    
    
    
    
    
    class GameKinematicPlan extends GamePlan {
        constructor(plansDir, guessText, svgDiv, gameForm, gameInput, sendBtn, guessRemain, modal, modalContent, retryBtn) {
            super(plansDir, guessText, svgDiv, gameForm, gameInput, sendBtn, guessRemain, modal, modalContent, retryBtn);

            this.kinematic_group = [];
            this.kinematic_link = [];
        }


        change_guessRemain() {
            this.guessRemain.innerText = "".concat(this.kinematic_link.length-this.guessing.length, "/", this.kinematic_link.length);
        }
    
        async begin() {
            const response = await fetch(this.plansDir + "/info_plan.json");
            var json_data = await response.json();
            var all_plan = json_data["fr"];
            
            //basicly get all the necessary data
            this.references = all_plan[random_int(all_plan.length)];
            this.kinematic_group = this.references["kinematic"]["group"];
            this.kinematic_link = this.references["kinematic"]["link"];
    
            this.score = 0;
            this.score_max = this.kinematic_link.length;
    
            this.guessing = this.kinematic_link.slice();
            shuffle(this.guessing);
    
    
            this.img_height = this.references["height"];
            this.img_width = this.references["width"];
    
            this.img.attr("href", this.plansDir + "/" + this.references["file_color"])
                .attr("height", this.img_height)
                .attr("width", this.img_width);
    
            this.zoom.scaleExtent([Math.min(this.htmlsvg.clientHeight/this.img_height, this.htmlsvg.clientWidth/this.img_width), 8])
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
            this.change_guessRemain();
    
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

    }



    class GameMaterialPlan extends GamePlan {
        constructor(plansDir, guessText, svgDiv, gameForm, gameInput, sendBtn, guessRemain, modal, modalContent, retryBtn) {
            super(plansDir, guessText, svgDiv, gameForm, gameInput, sendBtn, guessRemain, modal, modalContent, retryBtn);
    
            this.pieces = [];
        }


        change_guessRemain() {
            this.guessRemain.innerText = "".concat(this.pieces.length-this.guessing.length, "/", this.pieces.length);
        }
    
        async begin() {
            const response = await fetch(this.plansDir + "/info_plan.json");
            var json_data = await response.json();
            var all_plan = json_data["fr"];
            
            //basicly get all the necessary data
            this.references = all_plan[random_int(all_plan.length)];
            this.pieces = this.references["piece"].filter((elt) => elt["material"] != "");
    
            this.score = 0;
            this.score_max = this.pieces.length;
    
            this.guessing = this.pieces.slice();
            shuffle(this.guessing);
    
    
            this.img_height = this.references["height"];
            this.img_width = this.references["width"];
    
            this.img.attr("href", this.plansDir + "/" + this.references["file_blank"])
                .attr("height", this.img_height)
                .attr("width", this.img_width);
    
            this.zoom.scaleExtent([Math.min(this.htmlsvg.clientHeight/this.img_height, this.htmlsvg.clientWidth/this.img_width), 8])
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
            this.answer = guess["material"];
            this.change_guessRemain();
    
            //change the guessText
            if (guess["name"] != "") {
                this.guessText.innerText = "Quel est le matériaux de la pièce " + guess["num"]  + " ?";
            } else {
                this.guessText.innerText = "Quel est le matériaux de la pièce " + guess["name"] + " " + guess["num"]  + " ?";
            }
            
            //zoom to the new guess
            this.zoomingTo(guess["bound"]);
    
            //resore input state
            this.gameInput.value = "";
            this.gameInput.disabled = false;
            this.sendBtn.disabled = false;
            this.gameInput.classList.remove("right");
            this.gameInput.classList.remove("wrong");
        }
    
    }




    //make the class callable from script tags
    exports.GameImg2Choice = GameImg2Choice;
    exports.GameImg2Word = GameImg2Word;
    exports.GameWord2Img = GameWord2Img;
    exports.GameKinematicPlan = GameKinematicPlan;
    exports.GameMaterialPlan = GameMaterialPlan;
}));