# 🎮 Up or Down – Wallet-Based Number Prediction Game

A simple yet exciting web game where players predict whether the next number will be **UP** or **DOWN** to grow their balance. Includes game money (wallet) and probability-weighted logic for realism.

## 🚀 How to Play

- The game generates a random number between **1 and 9**.
- You predict whether the next number will be **UP** (greater) or **DOWN** (smaller).
- If you guess correctly, your **balance increases** based on risk!
- If you guess wrong, your **bet is lost**.
- You can **GIVE UP** any time and keep your current balance.
- Survive **5 rounds** to win the full reward.

## 💰 Wallet System

- You start with **$100** in your wallet.
- Each game requires a bet. You can't bet more than your wallet.
- Winning rewards go **back into your wallet**.
- You lose the bet if you guess wrong or fail to survive all 5 rounds.

## 🧠 Risk / Reward Structure

| Current Number | Safe Bet | Riskier Bet | Multiplier |
|----------------|----------|-------------|------------|
| 2 or 8         | 1.04x    | 25.0x       | High risk  |
| 3 or 7         | 1.06x    | 10.0x       | Medium     |
| 4 or 6         | 1.10x    | 5.0x        | Medium     |
| 5              | -        | -           | Always 1.3x |
| 1 or 9         | -        | -           | Always 1.0x |

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)


