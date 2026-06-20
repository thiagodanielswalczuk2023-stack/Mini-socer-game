# ⚽ Mini Soccer Game

A fun and interactive mini soccer game built with HTML5 Canvas and Vanilla JavaScript!

## 🎮 Features

- **Play vs AI**: Challenge an intelligent AI opponent
- **Smooth Controls**: Move your paddle with your mouse
- **Ball Physics**: Realistic ball movement and collision detection
- **Scoring System**: First to 5 goals wins!
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Modern gradient design with smooth animations
- **Real-time Updates**: Live score tracking and game status

## 📋 How to Play

### Game Controls

1. **Move Your Paddle**: Move your mouse up and down to control your paddle (right side)
2. **Hit the Ball**: Use your paddle to hit the ball and score goals
3. **Defend Your Goal**: Block the AI's shots from reaching your goal
4. **Win**: First player to score 5 goals wins the match!

### Game Rules

- The ball bounces off the top and bottom walls
- Each paddle can hit the ball multiple times
- Scoring at either end ends the round and resets the ball
- The game tracks scores and declares a winner at 5 goals
- You can reset the score and play again anytime

## 🚀 How to Run

### Online
Visit: [Mini Soccer Game](https://thiagodanielswalczuk2023-stack.github.io/Mini-socer-game/)

### Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/thiagodanielswalczuk2023-stack/Mini-socer-game.git
   cd Mini-socer-game
   ```

2. Open `index.html` in your web browser

3. Click "Start Game" and enjoy!

## 📁 Files

- **index.html** - Game interface and styling
- **game.js** - Game logic, physics, and AI
- **README.md** - This file

## 🛠️ Technologies Used

- **HTML5** - Game structure
- **CSS3** - Styling and animations
- **JavaScript (Vanilla)** - Game logic and physics
- **Canvas API** - Game rendering

## 🤖 AI Difficulty

The AI opponent uses a simple but effective algorithm:
- Tracks the ball position
- Moves its paddle to intercept the ball
- Adjusts difficulty based on ball movement
- Provides a challenging but fair gameplay experience

## 🎯 Tips to Win

1. **Hit at angles** - Aim for the edges of your paddle to create spin
2. **Watch the AI** - Learn the AI's pattern and predict its moves
3. **Defense first** - Keep your paddle centered to block more shots
4. **Practice timing** - Hit the ball when it's at the edge of your paddle for more speed
5. **Aim high and low** - Alternate between hitting high and low on the AI's paddle

## 🔧 Customization

You can customize the game by editing `game.js`:

```javascript
// Change AI difficulty (higher = better AI)
const difficulty = 3; // Try 1-5

// Change ball speed
const BALL_SPEED = 4; // Try 3-6

// Change winning score
if (this.playerScore >= 5) // Change 5 to your desired number
```

## 📊 Future Improvements

- [ ] Sound effects
- [ ] Multiple difficulty levels
- [ ] Multiplayer mode (2 players on same device)
- [ ] Power-ups and special abilities
- [ ] Paddle animations
- [ ] Leaderboard system
- [ ] Mobile-optimized controls
- [ ] Different game modes

## 🐛 Troubleshooting

**Game won't start?**
- Make sure JavaScript is enabled in your browser
- Try refreshing the page
- Clear your browser cache

**Paddle not moving?**
- Move your mouse over the game canvas
- Check that your mouse is working properly
- For mobile, make sure touch is enabled

**Ball stuck?**
- Click "Reset Score" to restart
- Click "Start Game" to begin a new match

## 📝 License

MIT License - Feel free to use, modify, and distribute!

## 👨‍💻 Author

Created by **thiagodanielswalczuk2023-stack**

---

**Enjoy the game and have fun! ⚽🎮**
