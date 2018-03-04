//Global variable to store current level, best game level and current answer array
let level = 1;
let bestLevel = 1;
let answer;

window.onload = function() {
    document.getElementById('start').onclick = startGame;
    
    //Add transitionend to all buttons that need to change color back to original color
    document.querySelectorAll('button[data-light]').forEach(button => {
        button.addEventListener('transitionend', (e) => {
            e.target.classList.remove(button.getAttribute('data-light'));
    })
        button.addEventListener('click', checkAnswer);
    })
}

//Change button color to make blink visual effect
function blinkButton(button) {
    button.classList.add(button.getAttribute('data-light'));
}

function startGame(){
    updateLevelText();
    updateGameStatus('');
    document.getElementById('start').disabled = true;
    answer = [];
    for(let i = 0; i < level; i++) {
        let color = Math.floor(Math.random() * 4);
        answer.push(color);        
    }     
    runQuestion(answer);
}

function checkAnswer(){
    if(answer == undefined || answer.length == 0) {
        updateGameStatus('Please click start to play the game!');
        return;
    }

    let ans = answer.splice(0, 1);

    if(this.getAttribute('data-key') === String(ans)){ 
        if(answer.length == 0) {
            level++;            
            updateGameStatus('Good Job! Click Start to begin level ' + level + ' challenge!');
        }
    }
    else {
        level = 1; //reset level
        answer = [];
        updateGameStatus('Game Over!! Click Start to restart the game!');
    }
}

function updateLevelText() {    
    bestLevel = Math.max(level, bestLevel);
    document.getElementById('level').innerHTML = `Current Level: ${level}&nbsp;&nbsp;&nbsp;Best Level: ${bestLevel}`;
}

function updateGameStatus(status) {
    document.getElementById('status').innerHTML = status;
}

async function runQuestion(answer) { 
    for(let color of answer) {
        let button = document.querySelector(`button[data-key="${color}"`);
        button.classList.add(button.getAttribute('data-light'));
        await sleep(1000);
    }
    document.getElementById("start").disabled = false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}