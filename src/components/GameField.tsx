import { useState } from 'react';
import './style.scss';
import clsx from 'clsx';

const initialBoard = [
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[false],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[true],
	[null, null, null, null, null, null, null, null, null],
];

function GameField() {
	const [isCrossMove, setIsCrossMove] = useState<boolean>(true);
	const [activeOuterCell, setActiveOuterCell] = useState<number | null>(null);
	const [board, setBoard] = useState<Array<Array<boolean | null>>>(initialBoard);

	const handleClick = (outer: number, inner: number) => {
		if ((activeOuterCell === outer || activeOuterCell === null) && board[outer][inner] === null) {
			setBoard((board) => {
				const newBoard = [...board];
				newBoard[outer][inner] = isCrossMove;
				return newBoard;
			});

			board[inner].length < 9 ? setActiveOuterCell(null) : setActiveOuterCell(inner);
			setIsCrossMove(!isCrossMove);
			
			// todo calculate if outer cell is won
		}
	};

	/* 	const calculateWinner = () => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
	}; */

	return (
		<>
			<h1>{isCrossMove ? 'Cross' : 'Circle'} moves</h1>

			<div className='game-field'>
				{board.map((outerCell, i) => {
					return outerCell.length < 9 ? (
						<div className='outer' key={i}>
							<div className={clsx(outerCell[0] ? 'cross' : 'circle')}></div>
						</div>
					) : (
						<div className='outer' key={i}>
							{outerCell.map((innerCell, j) => {
								const isActive = (activeOuterCell === i || activeOuterCell === null) && innerCell === null;

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
