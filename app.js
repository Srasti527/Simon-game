
// const API_URL = "https://simon-game-nine-sigma.vercel.app";

// let gameSeq = [];
// let userSeq = [];
// let btns = ["yellow", "red", "purple", "green"];
// let started = false;
// let level = 0;
// let btn_el = document.querySelector("#btn_el");
// let highScore = 0;
// let h2 = document.querySelector("h2");
// let h1 = document.querySelector("h1");

// // Start game when Start button clicked
// btn_el.addEventListener("click", function (){
//     if(!started){
//         started = true;
//         levelUp();
//         updateLeaderboard(); // refresh leaderboard on game start
//     }
// });

// function gameFlash(btn){
//     btn.classList.add("flash");
//     setTimeout(function (){
//         btn.classList.remove("flash");
//     }, 250);
// }

// function userFlash(btn){
//     btn.classList.add("userflash");
//     setTimeout(function(){
//         btn.classList.remove("userflash");
//     }, 250);
// }

// function levelUp(){
//     userSeq = [];
//     level++;
//     h2.innerText = `Level ${level}`;

//     let randIdx = Math.floor(Math.random()*4);
//     let randColor = btns[randIdx];
//     let randBtn = document.querySelector(`.${randColor}`);
//     gameSeq.push(randColor);
//     gameFlash(randBtn);
// }

// function checkAns(idx){
//     if(userSeq[idx] === gameSeq[idx]){
//         if(userSeq.length === gameSeq.length){
//             setTimeout(levelUp, 1000);
//         }
//     } else {
//         if(level > highScore){
//             highScore = level;
//         }
//         saveScore(level);
//         h2.innerHTML = `Game Over 😢 <br> Your Score: <b>${level}</b> <br><span style="font-size:16px;">Click Start to Play Again</span>`; 
//         h1.innerText = `Simon Says Game | High Score: ${highScore}`;
//         document.querySelector("body").style.backgroundColor = "red";
//         setTimeout(function (){
//             document.querySelector("body").style.backgroundColor = "#D6CA98";
//         }, 150);

//         reset();
//     }
// }

// function btnPress(){
//     let btn = this;
//     userFlash(btn);
//     let userColor = btn.getAttribute("id");
//     userSeq.push(userColor);
//     checkAns(userSeq.length-1);
// }

// // Add event listeners to game buttons
// let allBtns = document.querySelectorAll(".btn")
// for(let btn of allBtns){
//     btn.addEventListener("click", btnPress);
// }

// function reset(){
//     started = false;
//     gameSeq = [];
//     userSeq = [];
//     level = 0;
// }

// // Save score to backend
// function saveScore(score){
//     let nameInput = document.getElementById("playerName");
//     let name = nameInput ? nameInput.value : "Player";

//    fetch(`${API_URL}/score`, {
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body: JSON.stringify({name, score})
//     }).then(updateLeaderboard); // refresh leaderboard after saving
// }

// // Fetch leaderboard and show on page
// async function updateLeaderboard(){
//     try {
//         const res = await fetch(`${API_URL}/leaderboard`);
//         const data = await res.json();
//         const ul = document.getElementById("leaderboard");
//         ul.innerHTML = "";
//         data.forEach(entry => {
//             const li = document.createElement("li");
//             li.innerText = `${entry.name}: ${entry.score}`;
//             ul.appendChild(li);
//         });
//     } catch(err){
//         console.error("Failed to fetch leaderboard", err);
//     }
// }

// // Update leaderboard on page load
// window.addEventListener("DOMContentLoaded", () => {
//     updateLeaderboard();
// });
// app.js - Full Stack Simon Game with Backend Leaderboard

const API_URL = "https://simon-game-nine-sigma.vercel.app";

let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let btn_el = document.querySelector("#btn_el");
let highScore = 0;
let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");

// Start game when button clicked
btn_el.addEventListener("click", function (){
    if(!started){
        started = true;
        levelUp();
    }
});

// Flash effect for game sequence
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

// Flash effect for user press
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

// Generate next level
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

// Check user's answer
function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        if(level > highScore) highScore = level;

        saveScore(level); // save to backend leaderboard

        h2.innerHTML = `Game Over 😢 <br> Your Score: <b>${level}</b> <br><span style="font-size:16px;">Click Start to Play Again</span>`; 
        h1.innerText = `Simon Says Game | High Score: ${highScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => document.querySelector("body").style.backgroundColor = "#D6CA98", 150);

        reset();
    }
}

// Handle user button press
function btnPress(){
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Add click listeners to game buttons
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

// Reset game
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Save score to backend
function saveScore(score){
    let nameInput = document.getElementById("playerName");
    let name = nameInput ? nameInput.value.trim() : "Player";

    fetch(`${API_URL}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score })
    }).then(updateLeaderboard); // update leaderboard automatically
}

// Fetch leaderboard from backend
async function updateLeaderboard(){
    const res = await fetch(`${API_URL}/leaderboard`);
    const data = await res.json();
    const ul = document.getElementById("leaderboard");
    ul.innerHTML = "";
    data.forEach(entry => {
        const li = document.createElement("li");
        li.innerText = `${entry.name}: ${entry.score}`;
        ul.appendChild(li);
    });
}

// Initial leaderboard fetch
updateLeaderboard();