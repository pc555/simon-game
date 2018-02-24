window.onload = function() {
    this.document.getElementById('start').onclick = startGame;
    document.getElementById('redButton').onclick = checkAnswer;
    document.getElementById('blueButton').onclick = checkAnswer;
    document.getElementById('yellowButton').onclick = checkAnswer;
    document.getElementById('greenButton').onclick = checkAnswer;
}

function blinkButton(button, orgColor, lightColor) {
    setTimeout(() => {
        button.style.backgroundColor = lightColor;
        setTimeout(() => {
            button.style.backgroundColor = orgColor;
        }, 500);        
    }, 500);
}

let level = 1;
let bestLevel = 1;
let answer;
function startGame(){
    updateLevelText();
    updateGameStatus('');
    document.getElementById('start').disabled = true;
    console.log(document.getElementById('start').disabled);
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
    let correct = false;
    //console.log(this.id);
    switch(this.id) {
        case 'redButton':
            correct = ans == 0;
            break;
        case 'greenButton':
            correct = ans == 1;
            break;
        case 'blueButton':
            correct = ans == 2;
            break;
        case 'yellowButton':
            correct = ans == 3;
            break;
    }

    if(correct){ 
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
    //console.log(answer);
    for(let color of answer) {
        switch(color) {            
            case 0:
                blinkButton(document.getElementById('redButton'), 'red', 'lightsalmon');
                break;
            case 1:
                blinkButton(document.getElementById('greenButton'), 'green', 'lightgreen');
                break;
            case 2:
                blinkButton(document.getElementById('blueButton'), 'blue', 'lightblue');
                break;
            case 3:
                blinkButton(document.getElementById('yellowButton'), 'gold', 'lightgoldenrodyellow');
                break;
        }
        await sleep(1000);
    }
    document.getElementById("start").disabled = false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}