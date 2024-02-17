let gameSeq = [];
let userSeq = [];
let highScore = 0;

document.cookie = "highestScore=120";

let btns = ["one","two","three","four"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

document.addEventListener("keypress",function(){
    if(started==false){//because game should be started once only
        console.log("Game started");
        started = true;
        levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },150);
}

function levelUp(){
    userSeq = []; //every time I level up the game I have to make user seq empty so that user has to enter whole sequence from start.
    level++;
    h3.innerText = `Level ${level}`;

    let index = Math.floor(Math.random()*4);//choose a random color
    let randbtn = document.querySelector(`.${btns[index]}`)
    gameSeq.push(btns[index]);
    btnFlash(randbtn);//pass the random color to flash
}

function checkAns(idx){
    //the length of array in userSeq is equal to level of game
    if(userSeq[idx] == gameSeq[idx]){
        console.log("Same");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,500);
        }
    }else{
        highScore = Math.max(highScore,level-1);
        // let hs = highScore.toString();
        // localStorage.setItem('highestScore',JSON.stringify(highScore));
        // var value = localStorage.getItem('highestScore');
        h3.innerHTML = `Game Over! Your score was <b>${level-1}</b> <br>Highest Score: ${highScore} <br> Press any key to restart.`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },100);
        reset();
    }
}
function btnPress(){
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute('id');
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}