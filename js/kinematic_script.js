const button1 = document.getElementById("gameBtn1"),
      button2 = document.getElementById("gameBtn2"),
      button3 = document.getElementById("gameBtn3"),
      button4 = document.getElementById("gameBtn4"),
      gameImg = document.getElementById("gameImg"),
      modal = document.getElementsByClassName("modal")[0],
      retryBtn = document.getElementById("retryBtn");



function random_int(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function array_sample(array, n) {
    let sample = [];
    let numbers = [];
    for (let i=0; i<array.length; i++) numbers.push(i);

    for (let i=0; i<n; i++) {
        let r = random_int(numbers.length);
        let index = numbers.indexOf(r);
        sample.push(array[numbers[r]]);
        numbers.splice(index, 1);
    }

    return sample;
}



class Game {
    constructor() {
        this.answer = "";
        this.score = 0;
        this.score_max = 0;
        this.buttons = [button1, button2, button3, button4];
        this.guessing = [];
        this.references = [];
    }

    async begin() {
        const response = await fetch("../assets/kinematic/image.json");
        var json_data = await response.json();
        this.references = json_data["name_file_fr"];

        this.score = 0;
        this.score_max = this.references.length;

        this.guessing = this.references.slice();
        shuffle(this.guessing);

        modal.classList.remove("show-modal");
        this.new_guess();
    }

    finish_game() {
        for (let i =0; i<4; i++) this.buttons[i].disabled = true;

        let modal_text = modal.getElementsByClassName("modal-content")[0].getElementsByTagName("h2")[0];
        modal_text.innerText = "Votre score est de ".concat(this.score,"/",this.score_max);
        modal.classList.toggle("show-modal");
    }

    add_point() {
        ++this.score;
    }

    new_guess() {
        //get the new guess
        let guess = this.guessing.shift();
        this.answer = guess["name"];

        //change the game image
        gameImg.src = "../assets/kinematic/".concat(guess["file"]);

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

    reply(n) {
        if (this.buttons[n].innerText == this.answer) this.add_point();

        for (let i =0; i<4; i++) {
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



var game = new Game;

button1.addEventListener("click", function(event) {
    console.log("Button 1 has been click");
    game.reply(0);
});

button2.addEventListener("click", function(event) {
    console.log("Button 2 has been click");
    game.reply(1);
});

button3.addEventListener("click", function(event) {
    console.log("Button 3 has been click");
    game.reply(2);
});

button4.addEventListener("click", function(event) {
    console.log("Button 4 has been click");
    game.reply(3);
});

retryBtn.addEventListener("click", function(event) {
    console.log("Retry button has been click");
    game.begin();
});

game.begin();


//var arr = [1,2,3,4,5,6];
//console.log(array_sample(arr, 3));