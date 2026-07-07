let activeCellId = null;

let setActiveCell = (cellEl) => {
    activeCellId = cellEl.id;
    const allCells = document.querySelectorAll('.cell');
    allCells.forEach((cell) => {
        cell.classList.remove('active');
    });
    cellEl.classList.add('active');
}

const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        setActiveCell(cell);
        highlightCells(cell);
    });
});
document.addEventListener('keypress', (event) => {
    if (/^[1-9]$/.test(event.key)) {   // Accepts digits 1-9
        const activeCell = document.getElementById(activeCellId);
        activeCell.textContent = event.key;
        activeCell.classList.remove('empty');
    }
});
document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('cell') && !event.target.classList.contains('num-btn')) {
        activeCellId = null;
        const allCells = document.querySelectorAll('.cell');
        allCells.forEach((cell) => {
            cell.classList.remove('highlight');
            cell.classList.remove('active');
        });
    }
});

document.querySelectorAll('.num-btn').forEach((numberEl) => {
    numberEl.addEventListener('click', () => {
        if (activeCellId) {
            const activeCell = document.getElementById(activeCellId);
            activeCell.textContent = numberEl.textContent;
            activeCell.classList.remove('empty');
        }
    })
});


function highlightCells(cellEl) {// cell-1-2
    const allCells = document.querySelectorAll('.cell');
    allCells.forEach((cell) => {
        cell.classList.remove('highlight');
    });

    let [_, x, y] = cellEl.id.split('-');
    for (let j = 1; j <= 9; j++) {
        const cell = document.getElementById(`cell-${x}-${j}`);
        if (cell) {
            cell.classList.add('highlight');
        }
    }
    for (let j = 1; j <= 9; j++) {
        const cell = document.getElementById(`cell-${j}-${y}`);
        if (cell) {
            cell.classList.add('highlight');
        }
    }
    cellEl.parentElement.querySelectorAll('.cell').forEach((cell) => {
        if (cell !== cellEl) {
            cell.classList.add('highlight');
        }
    });
}

const board = Array.from(
  { length: 9 },
  () => Array(9).fill(0)
);

fillBoard(board);

console.log(board);

function isValid(board, row, col, num) {
  // row
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) return false;
  }

  // column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }

  // 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }

  return true;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function fillBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {

      if (board[row][col] === 0) {

        const nums = shuffle([1,2,3,4,5,6,7,8,9]);

        for (const num of nums) {

          if (isValid(board, row, col, num)) {

            board[row][col] = num;

            if (fillBoard(board)) {
              return true;
            }

            board[row][col] = 0;
          }
        }

        return false;
      }
    }
  }

  return true;
}

let unsolvedBoard = removeRandomNums(board);
function removeRandomNums(board) {
  for (let i = 0; i < 40; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== 0) {
      board[row][col] = 0;
    }
  }
  return board;
}

function fillBoardEl(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.getElementById(`cell-${row + 1}-${col + 1}`);
      cell.textContent = board[row][col];
      if (board[row][col] === 0) {
        cell.classList.add('empty');
      }
    }
  }
}

fillBoardEl(unsolvedBoard);