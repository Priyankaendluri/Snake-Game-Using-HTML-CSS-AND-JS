const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400; // Size of the canvas
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 160, y: 160 }];
let direction = { x: gridSize, y: 0 };
let food = { x: 80, y: 80 };
let score = 0;
let gameOver = false;

// Game loop
function gameLoop() {
  if (gameOver) {
    alert("Game Over! Score: " + score);
    return;
  }

  setTimeout(() => {
    clearCanvas();
    updateSnakePosition();
    checkCollision();
    drawFood();
    drawSnake();
    gameLoop();
  }, 100); // Update every 100ms
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
  ctx.fillStyle = "#00FF00"; // Snake color
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

// Update snake position
function updateSnakePosition() {
  let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    snake.unshift(head);
    score += 10;
    generateFood();
  } else {
    snake.unshift(head);
    snake.pop();
  }
}

// Draw food
function drawFood() {
  ctx.fillStyle = "#FF0000"; // Food color
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Generate new food location
function generateFood() {
  let x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  let y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  food = { x, y };
}

// Check for collisions
function checkCollision() {
  let head = snake[0];

  // Collision with walls
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    gameOver = true;
  }

  // Collision with self
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
    }
  }
}

// Listen for keyboard events to change direction
document.addEventListener("keydown", event => {
  if (event.key === "ArrowUp" && direction.y === 0) {
    direction = { x: 0, y: -gridSize };
  } else if (event.key === "ArrowDown" && direction.y === 0) {
    direction = { x: 0, y: gridSize };
  } else if (event.key === "ArrowLeft" && direction.x === 0) {
    direction = { x: -gridSize, y: 0 };
  } else if (event.key === "ArrowRight" && direction.x === 0) {
    direction = { x: gridSize, y: 0 };
  }
});

// Start the game
gameLoop();

