console.log("Welcome to Tic Tac Toe");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameoverSound = new Audio("gameover.mp3");
let turn = "X";
let gameover = false; // Fix: Declare gameover globally

// Function to change turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],  // Row 1
        [3, 4, 5, 5, 15, 0], // Row 2
        [6, 7, 8, 5, 25, 0], // Row 3
        [0, 3, 6, -5, 15, 90], // Column 1
        [1, 4, 7, 5, 15, 90], // Column 2
        [2, 5, 8, 15, 15, 90], // Column 3
        [0, 4, 8, 5, 15, 45], // Diagonal 1
        [2, 4, 6, 5, 15, 135] // Diagonal 2
    ];

    wins.forEach(e => {
        if (
            (boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[0]].innerText !== "")
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won ";
            gameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.width = "20vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            gameoverSound.play(); // Play game over sound
        }
    });
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !gameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!gameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Add onclick listener to reset button
document.getElementById('reset').addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    gameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});
