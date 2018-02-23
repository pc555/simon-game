window.onload = function() {
    this.document.getElementById('start').onclick = startGame;
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
let answer;
function startGame(){
    answer = [];
    for(let i = 0; i < level; i++) {
        let color = Math.floor(Math.random() * 4);
        answer.push(color);        
    }     
    runQuestion(answer);
    level++;
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
                blinkButton(document.getElementById('yellowButton'), 'yellow', 'lightyellow');
                break;
        }
        await sleep(1000);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }