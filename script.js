const board = Array.from(
  { length: 9 },
  () => Array(9).fill(0)
);
fillBoard(board);

let unsolvedArr = board.map(el => el.slice());
let unsolvedBoard = removeRandomNums((unsolvedArr));

let activeCellId = null;
// let invalidCellId = null;

let setActiveCell = (cellEl) => {
  // if (invalidCellId && cellEl.id != invalidCellId) return;

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
    console.log(board, unsolvedBoard)
  });
});
document.addEventListener('keydown', (event) => {
  if (/^[1-9]$/.test(event.key)) {   // Accepts digits 1-9
    const activeCell = document.getElementById(activeCellId);
    let valid = isValidNum(board, activeCellId, parseInt(event.key));
    activeCell.textContent = event.key;
    activeCell.classList.remove('empty');
    if (valid) {
      const [row, col] = activeCellId.split('-').slice(1).map(Number);

      activeCell.classList.remove('invalid');
      activeCell.classList.add('filled');
      // inactiveCellId = null;
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => cell.classList.remove('disabled'))
      unsolvedBoard[row - 1][col - 1] = event.key;
      checkSolved();

    } else {
      activeCell.classList.add('invalid');
      activeCell.classList.remove('filled');
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.id != activeCellId && cell.classList.add('disabled')
      });
      // invalidCellId = activeCellId;
    }
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => {
      if (cell.textContent == activeCell.textContent) cell.classList.add('active');
      else cell.classList.remove('active');
    })
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
      console.log(activeCellId)
      const [row, col] = activeCellId.split('-').slice(1).map(Number);

      const activeCell = document.getElementById(activeCellId);
      activeCell.textContent = numberEl.textContent;
      unsolvedBoard[row - 1][col - 1] = numberEl.textContent;
      checkSolved();
      activeCell.classList.remove('empty');

      let valid = isValidNum(board, activeCellId, numberEl.textContent);

      if (valid) {
        activeCell.classList.remove('invalid');
        activeCell.classList.add('filled');
        invalidCellId = null;
      } else {
        activeCell.classList.add('invalid');
        activeCell.classList.remove('filled');
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
          cell.classList.remove('diabled');
          cell.id != activeCellId && cell.classList.add('disabled') && console.log(cell.id, cell.classList)
        });


      }




      cells.forEach(cell => {
        cell.classList.remove('active')
        if (cell.textContent == activeCell.textContent) {
          cell.classList.add('active')
        }
      })
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

// console.log(board);



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

        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

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

console.log(board);



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

console.log(unsolvedBoard)

function fillBoardEl(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.getElementById(`cell-${row + 1}-${col + 1}`);
      cell.textContent = board[row][col];
      if (board[row][col] === 0) {
        cell.classList.add('empty');
      }
      else {
        cell.classList.add('disabled')
      }
    }
  }
}

fillBoardEl(unsolvedBoard);


function isValidNum(board, activeCellId, num) {
  const [row, col] = activeCellId.split('-').slice(1).map(Number);
  if (board[row - 1][col - 1] === num) return true;
  return false;
}

// TODO: highlight all same num. DONE
// TODO: restrict next move if invalid.  DONE
// TODO: check winner. INCOMPLETE
// TODO: tell which number is done INCOMPLETE

function checkSolved() {
  let solved = true;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] != unsolvedBoard[i][j]) {
        solved = false;
        break
      }
    }
  }
  const boardEl = document.getElementById('board')
  if (solved) {
    boardEl.style.pointerEvents = 'none'
    alert("sudoku solved")
  }

}