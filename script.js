let difficulty = 0;
let cellContent = ['','','','','','','','',''];
let unmarkedCells = [0,1,2,3,4,5,6,7,8];
let turn = true, isGameOver = false;
const winCases = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
]


// function render() {
// 	const cells = document.querySelectorAll('.cell');
// 	let i=0;
// 	cells.forEach( cell => {
// 		cell.innerHTML = cellContent[i++];
// 	})
// }

// if winning position return the winner else return null
function isWin() {
	for(let i=0; i<8;i++) {
		let player = turn ? 'X' : 'O' ;
		let count = 0;
		for(let j=0;j<3;j++) {
			if(cellContent[winCases[i][j]] === player)
				++count;
		}
		if(count === 3) 
			return 1;
	}

	return 0;

};

function isDraw() {
	if (!unmarkedCells.length)
		return 1;
	else
		return 0;
};

function updateStatus() {
	const winner = (isWin() ? (turn ? 'You' : 'Computer')  : null);
	const status = document.querySelector('.status');
	turn = !turn;
	if(winner){
		status.innerHTML = winner + ' won the game!<br />' + '<button class="btn" onclick = "reset()">New Game</button>' ;
		isGameOver = true;
	}
	else if(isDraw()) {
		status.innerHTML = 'Draw     '+ '<button onclick = "reset()">New Game</button>' ;
		isGameOver = true;
	}
	else {
		if(turn)
			status.innerHTML = 'Your Turn';
		else
			status.innerHTML = 'Computer\'s turn';
	}

};

function mark(cellNumber) {
	const cell = document.querySelector(`.unmarked[data-value="${cellNumber}"]`);
	cell.classList.remove('unmarked');
	cell.classList.add('marked');
	cellContent[cellNumber-1] = turn ? 'X' : 'O' ;
	cell.innerHTML = turn ? 'X' : 'O' ;
	unmarkedCells = [];
	for(let i=0; i<9; i++) {
		if(cellContent[i] === '') 
			unmarkedCells.push(i);
	}
};

function handleClick(cellNumber) {
	if(isGameOver) return;
	if(!turn) return;
	if(cellContent[cellNumber-1]!=='') return;
	mark(cellNumber)
	updateStatus();
	if(!isGameOver)
		setTimeout(makeMove, 1200);
};

function makeMove() {
	if(isGameOver) return;
	if(difficulty>0 && cellContent[4] === '') {
		mark(5);
		updateStatus();
		return;
	}	
	else if(difficulty>1) {
		for(let i=0; i<8;i++) {
			let countX = 0, countO = 0;
			for(let j=0;j<3;j++) {
				if(cellContent[winCases[i][j]] === 'X')
					++countX;
				if(cellContent[winCases[i][j]] === 'O')
					++countO;
			}
			if(countO === 2) {
				for(let j=0; j<3;j++)
					if(cellContent[winCases[i][j]] === '') {
						mark(winCases[i][j]+1);
						updateStatus();
						return;
					}
			}
			else if(countX === 2) {
				for(let j=0; j<3;j++)
					if(cellContent[winCases[i][j]] === '') {
						mark(winCases[i][j]+1);
						updateStatus();
						return;
					}
			}
		}
	}
	
	let i,cellNumber;
	do {
		i = Math.floor( Math.random()*(unmarkedCells.length) )
		cellNumber = unmarkedCells[i];
	}while(cellContent[cellNumber] !== '');
	mark(cellNumber+1);
	updateStatus();
};

function reset() {
	cellContent = ['','','','','','','','',''];
	unmarkedCells = [0,1,2,3,4,5,6,7,8];
	turn = true; 
	isGameOver = false;
	document.querySelector('.status').innerHTML = 'Your Turn';
	const cells = document.querySelectorAll('.marked');
	cells.forEach( cell => {
		cell.classList.remove('marked');
		cell.classList.add('unmarked');
		cell.innerHTML = '';
	});

};

function changeDifficulty(value) {
	difficulty = value;
}