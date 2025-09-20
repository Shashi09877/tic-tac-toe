const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restart = document.getElementById('restart');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Click event for cells
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    if(board[index] === '' && !isGameOver) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add('marked');
      setTimeout(() => cell.classList.remove('marked'), 300);
      checkWinner();
      if(!isGameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
        message.className = currentPlayer === 'X' ? 'x-turn' : 'o-turn';
      }
    }
  });
});

// Restart button
restart.addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
  currentPlayer = 'X';
  isGameOver = false;
  message.textContent = "Player X's turn";
  message.className = "x-turn";
});

// Check winner function
function checkWinner() {
  for(let combo of winningCombos) {
    const [a,b,c] = combo;
    if(board[a] && board[a] === board[b] && board[a] === board[c]) {
      combo.forEach(i => cells[i].classList.add('win'));
      message.textContent = `Player ${board[a]} wins!`;
      isGameOver = true;
      confetti();
      return;
    }
  }
  if(!board.includes('')) {
    message.textContent = "It's a draw!";
    isGameOver = true;
  }
}

// Confetti animation
function confetti() {
  for(let i=0; i<50; i++){
    const div = document.createElement('div');
    div.className = 'confetti';
    div.style.left = Math.random()*100 + 'vw';
    div.style.background = `hsl(${Math.random()*360},100%,50%)`;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }
}
