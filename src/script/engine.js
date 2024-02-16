const state = {
    view:{
squares: document.querySelectorAll(".square"),
enemy: document.querySelector(".enemy"),
timeleft: document.querySelector("#time"),
score: document.querySelector("#score")
    },
    values: {
        timerID: null,
        
        gamespeed: 750,
        hitposition: 0,
        result: 0,
        currentTime: 61
    },
    actions :{
        countdownTimeID: setInterval(countDown, 1000),
    }
}
function countDown(){
    state.values.currentTime--
    state.view.timeleft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countdownTimeID)
        clearInterval(state.values.timerID)
        alert("Parabéns, você acertou o fantasmatico: "+ state.values.result + " vezes!")
        location.reload()}
}

function playaudio(audioname, volume){
    let audio = new Audio(`./src/audio/${audioname}.mp3`)
    audio.volume = volume;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    });
    let randomNum = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNum];
    state.values.hitposition = randomSquare.id
    randomSquare.classList.add("enemy")
}

function moveEnemy(){
    state.values.timerID = setInterval(randomSquare, state.values.gamespeed)
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitposition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitposition = null;
                playaudio("whosh", 0.2);
            }
        
        })
    })
}

function init() {
 alert("Não deixe o Fantasmatico tomar controle do Ominitrix")
 moveEnemy();
 addListenerHitbox();
}



init();
