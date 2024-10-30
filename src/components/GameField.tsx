import { useState } from 'react';
import './style.scss';
import clsx from 'clsx';

const initialBoard = [
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
];

// true - cross wins, false - circle wins, null - no winner
const calculateWinner = (board: Array<boolean | null>): boolean | null => {
	const winningLines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (const line of winningLines) {
		if (board[line[0]] !== null && board[line[0]] === board[line[1]] && board[line[1]] === board[line[2]]) {
			return board[line[0]];
		}
	}

	return null;
};

function GameField() {
	const [isCrossMove, setIsCrossMove] = useState<boolean>(true);
	const [activeOuterCell, setActiveOuterCell] = useState<number | null>(null);
	const [board, setBoard] = useState<Array<Array<boolean | null>>>(initialBoard);
	const [gameState, setGameState] = useState<string>(`${isCrossMove ? 'Crosses' : 'Circles'} move`);

	const handleClick = (outer: number, inner: number) => {
		if ((activeOuterCell === outer || activeOuterCell === null) && board[outer][inner] === null) {
			setBoard((board) => {
				const newBoard = [...board];
				newBoard[outer][inner] = isCrossMove;

				const innerWinner = calculateWinner(newBoard[outer]);
				if (innerWinner !== null) {
					newBoard[outer] = [innerWinner];
				}

				const outerWinner = calculateWinner(
					newBoard.map((innerBoard) => (innerBoard.length > 1 ? null : innerBoard[0]))
				);
				if (outerWinner !== null) {
					setGameState(`${outerWinner ? 'Crosses' : 'Circles'} win!`);
				} else {
					setGameState(`${!isCrossMove ? 'Crosses' : 'Circles'} move`);
				}

				newBoard[inner].length < 9 ? setActiveOuterCell(null) : setActiveOuterCell(inner);

				return newBoard;
			});

			setIsCrossMove(!isCrossMove);
		}
	};

	return (
		<>
			<h1>{gameState}</h1>

			<div className='game-field'>
				{board.map((outerCell, i) => {
					return outerCell.length < 9 ? (
						<div className='outer' key={i}>
							<div className={clsx(outerCell[0] ? 'cross' : 'circle')}></div>
						</div>
					) : (
						<div className='outer' key={i}>
							{outerCell.map((innerCell, j) => {
								const isActive =
									(activeOuterCell === i || activeOuterCell === null) && innerCell === null && /move/.test(gameState);

								return (
									<div
										className={clsx('inner', { active: isActive })}
										key={`${i}-${j}`}
										onClick={() => handleClick(i, j)}
									>
										{innerCell !== null && <div className={clsx(innerCell ? 'cross' : 'circle')}></div>}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</>
	);
}

export default GameField;
