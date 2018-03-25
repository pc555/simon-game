// Global variable to store current level, best game level and current answer array
let level = 1;
let bestLevel = 1;
let answer;


// Change button color to make blink visual effect
// function blinkButton(button) {
// 	button.classList.add(button.getAttribute('data-light'));
// }

function updateGameStatus(status) {
	document.getElementById('status').innerHTML = status;
}

function updateLevelText() {
	bestLevel = Math.max(level, bestLevel);
	document.getElementById('level').innerHTML = `Current Level: ${level}&nbsp;&nbsp;&nbsp;Best Level: ${bestLevel}`;
}

async function runQuestion(answerArr) {
	for (const color of answerArr) {
		const button = document.querySelector(`button[data-key="${color}"`);
		button.classList.add(button.getAttribute('data-light'));
		await sleep(1000);
	}
	document.getElementById('start').disabled = false;
}

function startGame() {
	updateLevelText();
	updateGameStatus('');
	document.getElementById('start').disabled = true;
	answer = [];
	for (let i = 0; i < level; i++) {
		const color = Math.floor(Math.random() * 4);
		answer.push(color);
	}
	runQuestion(answer);
}

function checkAnswer() {
	if (answer === undefined || answer.length === 0) {
		updateGameStatus('Please click start to play the game!');
		return;
	}

	const ans = answer.splice(0, 1);

	if (this.getAttribute('data-key') === String(ans)) {
		if (answer.length === 0) {
			level += 1;
			updateGameStatus(`Good Job! Click Start to begin level ${level} challenge!`);
		}
	} else {
		level = 1; // reset level
		answer = [];
		updateGameStatus('Game Over!! Click Start to restart the game!');
		updateLevelText();
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


window.onload = function () {
	document.getElementById('start').onclick = startGame;

	// Add transitionend to all buttons that need to change color back to original color
	document.querySelectorAll('button[data-light]').forEach((button) => {
		button.addEventListener('transitionend', (e) => {
			e.target.classList.remove(button.getAttribute('data-light'));
		});
		button.addEventListener('click', checkAnswer);
	});
};
