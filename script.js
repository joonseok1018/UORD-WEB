function calculateReward(current, choice) {
    if (current === 1 || current === 9) return 1.0;
    if (current === 2 || current === 8)
        return ((choice === "DOWN" && current === 8) || (choice === "UP" && current === 2)) ? 1.04 : 25.0;
    if (current === 3 || current === 7)
        return ((choice === "DOWN" && current === 7) || (choice === "UP" && current === 3)) ? 1.06 : 10.0;
    if (current === 4 || current === 6)
        return ((choice === "DOWN" && current === 6) || (choice === "UP" && current === 4)) ? 1.1 : 5.0;
    if (current === 5) return 1.3;
    return 0;
}


let wallet = 100;
let betAmount = 5;
let round, balance, currentNumber;

const walletText = document.getElementById('wallet');
const roundText = document.getElementById('round');
const currentText = document.getElementById('current');
const balanceText = document.getElementById('balance');
const downRewardText = document.getElementById('downReward');
const upRewardText = document.getElementById('upReward');
const resultText = document.getElementById('result');
const fixedBalanceText = document.getElementById('balanceFixed');

const downBtn = document.getElementById('downBtn');
const upBtn = document.getElementById('upBtn');
const giveUpBtn = document.getElementById('giveUpBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const startBtn = document.getElementById('startBtn');
const betInput = document.getElementById('betAmount');

function updateDisplay() {
    let rewardDown = calculateReward(currentNumber, "DOWN");
    let rewardUp = calculateReward(currentNumber, "UP");

    roundText.textContent = `Round: ${round}`;
    currentText.textContent = `Current Number: ${currentNumber}`;
    balanceText.textContent = `Balance: $${(balance).toFixed(2)}`;
    downRewardText.textContent = `DOWN reward: $${(balance * rewardDown).toFixed(2)}`;
    upRewardText.textContent = `UP reward: $${(balance * rewardUp).toFixed(2)}`;
    fixedBalanceText.textContent = (balance).toFixed(2);
    walletText.textContent = wallet.toFixed(2);
}

function nextNumber() {
    let pool;
    if (currentNumber === 2) {
        pool = [1, 1, 1, 3, 4, 5, 6, 7, 8, 9];
    } else if (currentNumber === 8) {
        pool = [1, 2, 3, 4, 5, 6, 7, 9, 9, 9];
    } else if (currentNumber === 3) {
        pool = [1, 1, 2, 2, 4, 5, 6, 7, 8, 9];
    } else if (currentNumber === 7) {
        pool = [1, 2, 3, 4, 5, 6, 8, 8, 9, 9];
    } else {
        pool = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    let newNumber;
    do {
        newNumber = pool[Math.floor(Math.random() * pool.length)];
    } while (newNumber === currentNumber);
    return newNumber;
}

function handleChoice(choice) {
    const next = nextNumber();
    const reward = calculateReward(currentNumber, choice);

    if ((choice === "DOWN" && next < currentNumber) || (choice === "UP" && next > currentNumber)) {
        balance *= reward;
        currentNumber = next;
        round++;

        if (round > 5) {
            wallet += balance;
            resultText.textContent = `🎉 You survived 5 rounds! You won $${balance.toFixed(2)}!`;
            updateDisplay();
            disableButtons();
            playAgainBtn.style.display = 'inline-block';
        } else {
            resultText.textContent = `Correct! New number is ${next}`;
            updateDisplay();
        }
    } else {
        resultText.textContent = `Wrong! Number was ${next}. You lost your bet.`;
        balance = 0;
        updateDisplay();
        disableButtons();
        playAgainBtn.style.display = 'inline-block';
    }
}

function disableButtons() {
    downBtn.disabled = true;
    upBtn.disabled = true;
    giveUpBtn.disabled = true;
}

function enableButtons() {
    downBtn.disabled = false;
    upBtn.disabled = false;
    giveUpBtn.disabled = false;
}

function startGame() {
    betAmount = parseFloat(betInput.value);
    if (betAmount > wallet || betAmount <= 0) {
        alert("Invalid bet amount.");
        return;
    }
    wallet -= betAmount;
    round = 1;
    balance = betAmount;
    currentNumber = Math.floor(Math.random() * 9) + 1;
    resultText.textContent = '';
    enableButtons();
    startBtn.disabled = true;
    betInput.disabled = true;
    playAgainBtn.style.display = 'none';
    updateDisplay();
}

downBtn.addEventListener('click', () => handleChoice("DOWN"));
upBtn.addEventListener('click', () => handleChoice("UP"));
giveUpBtn.addEventListener('click', () => {
    wallet += balance;
    resultText.textContent = `You gave up. You kept $${balance.toFixed(2)}.`;
    updateDisplay();
    disableButtons();
    playAgainBtn.style.display = 'inline-block';
});
playAgainBtn.addEventListener('click', () => {
    betInput.disabled = false;
    startBtn.disabled = false;
    playAgainBtn.style.display = 'none';
});
startBtn.addEventListener('click', () => {
    betInput.disabled = true;
    startBtn.disabled = true;
    startGame();
});

updateDisplay();
disableButtons();
