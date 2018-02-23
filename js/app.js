window.onload = function() {
    redButton = document.getElementById('redButton');
    this.document.getElementById('start').onclick = startGame;
}

let redButton;//document.getElementById('redButton');
//blinkButton(redButton);
function blinkButton(button, orgColor, lightColor) {    
    console.log('hi');
    setTimeout(() => {
        button.style.backgroundColor = lightColor;
        setTimeout(() => {
            button.style.backgroundColor = orgColor;
        }, 500);        
    }, 500);
}

let answer = [];
function startGame(){
    if(answer.length == 0) {
        
    }    
}
//setInterval(function(){blinkButton(redButton, 'hello');}, 10000);