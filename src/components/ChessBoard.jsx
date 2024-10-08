"use client";
import Image from 'next/image';
import React from 'react';
import moveValidator from './moveValidator';

function ChessBoard() {
    const [board, setBoard] = React.useState([
        ['rook-b', 'knight-b', 'bishop-b', 'queen-b', 'king-b', 'bishop-b', 'knight-b', 'rook-b'],
        ['pawn-b', 'pawn-b', 'pawn-b', 'pawn-b', 'pawn-b', 'pawn-b', 'pawn-b', 'pawn-b'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['pawn-w', 'pawn-w', 'pawn-w', 'pawn-w', 'pawn-w', 'pawn-w', 'pawn-w', 'pawn-w'],
        ['rook-w', 'knight-w', 'bishop-w', 'queen-w', 'king-w', 'bishop-w', 'knight-w', 'rook-w'],
    ]);

    const [turn, setTurn] = React.useState('-w');
    const [selectedPiece, setSelectedPiece] = React.useState(null);
    const [promotionPiece, setPromotionPiece] = React.useState(null);
    const files = Array.from({ length: 8 }, (_, index) => String.fromCharCode(65 + index));
    const ranks = Array.from({ length: 8 }, (_, index) => index + 1);

    const handleClick = (e, r_index, c_index) => {
        if (selectedPiece) {
            const newBoard = [...board];
            const { piece, rowIndex, colIndex } = selectedPiece;

            if (piece.includes(turn) && moveValidator([rowIndex, colIndex], [r_index, c_index], piece, board)) {
                newBoard[rowIndex][colIndex] = '';
                newBoard[r_index][c_index] = piece;

                // Check for promotion
                if ((piece.includes('-w') && r_index === 0) || (piece.includes('-b') && r_index === 7)) {
                    setPromotionPiece({ rowIndex: r_index, colIndex: c_index, color: piece.includes('-w') ? '-w' : '-b' });
                } else {
                    setBoard(newBoard);
                    setSelectedPiece(null);
                    setTurn((turn) => (turn === '-w' ? '-b' : '-w'));
                }
            } else {
                setSelectedPiece(null);
            }

            const square = document.getElementById(`${rowIndex}${colIndex}`);
            if ((rowIndex + colIndex) % 2 === 0) {
                square.style.backgroundColor = 'rgb(71 85 105)';
            } else {
                square.style.backgroundColor = 'rgb(30 41 59)';
            }
        } else if (board[r_index][c_index] !== '') {
            const square = document.getElementById(`${r_index}${c_index}`);
            if ((r_index + c_index) % 2 === 0) {
                square.style.backgroundColor = 'rgb(100 116 139)';
            } else {
                square.style.backgroundColor = 'rgb(51 65 85)';
            }
            const piece = board[r_index][c_index];
            setSelectedPiece({ piece, rowIndex: r_index, colIndex: c_index });
        }
    };

    const handleDragStart = (e, r_index, c_index) => {
        e.target.style.opacity = '0.5';
        const piece = board[r_index][c_index];
        setSelectedPiece({ piece, rowIndex: r_index, colIndex: c_index });
    };

    const handleDrop = (e, r_index, c_index) => {
        e.preventDefault();

        if (selectedPiece) {
            const { piece, rowIndex, colIndex } = selectedPiece;

            if (piece.includes(turn) && moveValidator([rowIndex, colIndex], [r_index, c_index], piece, board)) {
                const newBoard = [...board];
                newBoard[rowIndex][colIndex] = '';
                newBoard[r_index][c_index] = piece;

                // Check for promotion
                if ((piece.includes('-w') && r_index === 0) || (piece.includes('-b') && r_index === 7)) {
                    setPromotionPiece({ rowIndex: r_index, colIndex: c_index, color: piece.includes('-w') ? '-w' : '-b' });
                } else {
                    setBoard(newBoard);
                    setSelectedPiece(null);
                    setTurn((turn) => (turn === '-w' ? '-b' : '-w'));
                }
            } else {
                setSelectedPiece(null);
            }
        }
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1';
    };

    const handlePromotion = (newPiece) => {
        const { rowIndex, colIndex, color } = promotionPiece;
        const newBoard = [...board];
        newBoard[rowIndex][colIndex] = `${newPiece}${color}`;
        setBoard(newBoard);
        setSelectedPiece(null);
        setPromotionPiece(null); 
        setTurn((turn) => (turn === '-w' ? '-b' : '-w'));
    };

    return (
        <div>
            <div className='flex gap-2'>
                <div className='h-[80vh]'>
                    {
                        ranks.map((item, index) => (
                            <div key={index} className='h-[10vh] flex items-center text-xl'>
                                {item}
                            </div>
                        ))
                    }
                </div>
                <div>
                    <div className='w-[80vh] h-[80vh]'>
                        {
                            board.map((row, r_index) => (
                                <div key={r_index} className='flex cursor-pointer'>
                                    {
                                        row.map((item, c_index) => (
                                            <div
                                                id={`${r_index}${c_index}`}
                                                key={c_index}
                                                className={`w-[10vh] h-[10vh] flex justify-center items-center ${(r_index + c_index) % 2 === 0 ? 'bg-slate-600' : 'bg-slate-800'}`}
                                                onClick={(e) => handleClick(e, r_index, c_index)}
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => handleDrop(e, r_index, c_index)}
                                            >
                                                {item !== '' ? 
                                                    <Image
                                                        src={`/pieces-basic-svg/${item}.svg`}
                                                        alt={item}
                                                        width={80}
                                                        height={80}
                                                        id={item}
                                                        className='hover:scale-110'
                                                        onDragStart={(e) => handleDragStart(e, r_index, c_index)}
                                                        onDragEnd={handleDragEnd}
                                                        draggable="true"
                                                    />
                                                    : null}
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className='w-[80vh] flex'>
                        {
                            files.map((item, index) => (
                                <div key={index} className='w-[10vh] text-xl flex justify-center'>
                                    {item}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {promotionPiece && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded">
                        <h2 className="text-lg font-bold">Promote Pawn</h2>
                        <div className="flex justify-around mt-4">
                            {['queen', 'rook', 'bishop', 'knight'].map((piece) => (
                                <button key={piece} onClick={() => handlePromotion(piece)} className="p-2 bg-blue-500 text-white rounded">
                                    {piece.charAt(0).toUpperCase() + piece.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChessBoard;
