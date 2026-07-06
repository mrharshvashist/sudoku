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