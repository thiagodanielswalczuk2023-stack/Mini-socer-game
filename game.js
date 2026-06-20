const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 80;
const BALL_RADIUS = 8;
const PADDLE_SPEED = 6;
const BALL_SPEED = 4;

const game = {
    playerScore: 0,
    aiScore: 0,
    gameState: 'idle', // idle, playing, paused
    gameRunning: false,
    
    // Player paddle (right side)
    playerPaddle: {
        x: CANVAS_WIDTH - 30,
        y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        dy: 0
    },
    
    // AI paddle (left side)
    aiPaddle: {
        x: 15,
        y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        dy: 0
    },
    
    // Ball
    ball: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        radius: BALL_RADIUS,
        dx: BALL_SPEED,
        dy: BALL_SPEED,
        speed: BALL_SPEED
    },
    
    // Mouse position
    mouseY: CANVAS_HEIGHT / 2,
    
    start() {
        if (this.gameState === 'playing') return;
        this.gameState = 'playing';
        this.gameRunning = true;
        this.ball.x = CANVAS_WIDTH / 2;
        this.ball.y = CANVAS_HEIGHT / 2;
        this.ball.dx = BALL_SPEED;
        this.ball.dy = BALL_SPEED;
        this.updateStatus('Game Started! Good luck!');
        this.draw();
    },
    
    reset() {
        this.playerScore = 0;
        this.aiScore = 0;
        document.getElementById('playerScore').textContent = '0';
        document.getElementById('aiScore').textContent = '0';
        this.gameState = 'idle';
        this.gameRunning = false;
        this.ball.x = CANVAS_WIDTH / 2;
        this.ball.y = CANVAS_HEIGHT / 2;
        this.ball.dx = BALL_SPEED;
        this.ball.dy = BALL_SPEED;
        this.updateStatus('Click "Start Game" to begin!');
        this.draw();
    },
    
    update() {
        if (this.gameState !== 'playing' || !this.gameRunning) return;
        
        // Update player paddle position based on mouse
        this.playerPaddle.y = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, 
                                                     this.mouseY - PADDLE_HEIGHT / 2));
        
        // AI paddle AI
        const aiCenter = this.aiPaddle.y + PADDLE_HEIGHT / 2;
        const ballCenter = this.ball.y;
        const difficulty = 3; // How well the AI follows the ball
        
        if (aiCenter < ballCenter - 10) {
            this.aiPaddle.y = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, 
                                       this.aiPaddle.y + difficulty);
        } else if (aiCenter > ballCenter + 10) {
            this.aiPaddle.y = Math.max(0, this.aiPaddle.y - difficulty);
        }
        
        // Update ball position
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;
        
        // Ball collision with top and bottom walls
        if (this.ball.y - BALL_RADIUS <= 0 || this.ball.y + BALL_RADIUS >= CANVAS_HEIGHT) {
            this.ball.dy = -this.ball.dy;
            this.ball.y = Math.max(BALL_RADIUS, Math.min(CANVAS_HEIGHT - BALL_RADIUS, this.ball.y));
        }
        
        // Ball collision with player paddle (right)
        if (this.ball.x + BALL_RADIUS >= this.playerPaddle.x &&
            this.ball.x - BALL_RADIUS <= this.playerPaddle.x + PADDLE_WIDTH &&
            this.ball.y >= this.playerPaddle.y &&
            this.ball.y <= this.playerPaddle.y + PADDLE_HEIGHT) {
            this.ball.dx = -this.ball.dx;
            this.ball.x = this.playerPaddle.x - BALL_RADIUS;
            // Add spin based on where ball hits paddle
            const hitPos = (this.ball.y - (this.playerPaddle.y + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2);
            this.ball.dy += hitPos * 3;
        }
        
        // Ball collision with AI paddle (left)
        if (this.ball.x - BALL_RADIUS <= this.aiPaddle.x + PADDLE_WIDTH &&
            this.ball.x + BALL_RADIUS >= this.aiPaddle.x &&
            this.ball.y >= this.aiPaddle.y &&
            this.ball.y <= this.aiPaddle.y + PADDLE_HEIGHT) {
            this.ball.dx = -this.ball.dx;
            this.ball.x = this.aiPaddle.x + PADDLE_WIDTH + BALL_RADIUS;
            // Add spin based on where ball hits paddle
            const hitPos = (this.ball.y - (this.aiPaddle.y + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2);
            this.ball.dy += hitPos * 3;
        }
        
        // Goal detection - AI scores (ball passes right paddle)
        if (this.ball.x > CANVAS_WIDTH) {
            this.aiScore++;
            document.getElementById('aiScore').textContent = this.aiScore;
            this.updateStatus('⚽ AI SCORED!');
            this.resetBall();
            
            if (this.aiScore >= 5) {
                this.updateStatus('🤖 AI WINS! Final Score: You ' + this.playerScore + ' - ' + this.aiScore + ' AI');
                this.gameRunning = false;
            }
        }
        
        // Goal detection - Player scores (ball passes left paddle)
        if (this.ball.x < 0) {
            this.playerScore++;
            document.getElementById('playerScore').textContent = this.playerScore;
            this.updateStatus('⚽ YOU SCORED!');
            this.resetBall();
            
            if (this.playerScore >= 5) {
                this.updateStatus('🏆 YOU WIN! Final Score: You ' + this.playerScore + ' - ' + this.aiScore + ' AI');
                this.gameRunning = false;
            }
        }
    },
    
    resetBall() {
        this.ball.x = CANVAS_WIDTH / 2;
        this.ball.y = CANVAS_HEIGHT / 2;
        this.ball.dx = (Math.random() > 0.5 ? 1 : -1) * BALL_SPEED;
        this.ball.dy = (Math.random() - 0.5) * BALL_SPEED * 2;
    },
    
    draw() {
        // Clear canvas
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Draw grass
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(0, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT / 2);
        
        // Draw center line
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(CANVAS_WIDTH / 2, 0);
        ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw goal areas
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(10, CANVAS_HEIGHT / 2 - 80, 20, 160);
        ctx.strokeRect(CANVAS_WIDTH - 30, CANVAS_HEIGHT / 2 - 80, 20, 160);
        
        // Draw player paddle (right)
        ctx.fillStyle = '#0066FF';
        ctx.fillRect(this.playerPaddle.x, this.playerPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 102, 255, 0.5)';
        
        // Draw AI paddle (left)
        ctx.fillStyle = '#FF3333';
        ctx.fillRect(this.aiPaddle.x, this.aiPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 51, 51, 0.5)';
        
        // Draw ball
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.ball.x, this.ball.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Draw game status text
        if (this.gameState === 'playing' && this.gameRunning) {
            ctx.fillStyle = '#000';
            ctx.font = 'bold 20px Arial';
            ctx.fillText('🔵 You: ' + this.playerScore, 20, 40);
            ctx.fillText('🔴 AI: ' + this.aiScore, CANVAS_WIDTH - 200, 40);
        }
    },
    
    updateStatus(message) {
        document.getElementById('status').textContent = message;
    }
};

// Mouse movement tracking
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    game.mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
});

// Touch support for mobile
canvas.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    game.mouseY = (touch.clientY - rect.top) * (canvas.height / rect.height);
    e.preventDefault();
});

// Game loop
function gameLoop() {
    game.update();
    game.draw();
    requestAnimationFrame(gameLoop);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Start game loop
gameLoop();
game.draw();