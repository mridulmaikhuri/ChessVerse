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
    const [lastMove, setLastMove] = React.useState(null);

    const checkEnPassant = (r_index, c_index) => {
        const { piece, rowIndex, colIndex } = selectedPiece;

        if (!piece.includes('pawn') || lastMove === null) return false;

        const {r_index: lastRowIndex, c_index: lastColIndex} = lastMove;
        if (rowIndex !== lastRowIndex || Math.abs(colIndex - lastColIndex) !== 1) return false;

        const dir = piece.includes('-w') ? -1 : 1;

        if ((c_index !== lastColIndex) && ((r_index - lastRowIndex) !== dir)) {
            return false;
        }

        return true;
    }

    const handleClick = (e, r_index, c_index) => {
        if (selectedPiece) {
            const newBoard = [...board];
            const { piece, rowIndex, colIndex } = selectedPiece;
            
            if (piece.includes(turn) && checkEnPassant(r_index, c_index)) {
                const {r_index: lastRowIndex, c_index: lastColIndex} = lastMove;
                newBoard[lastRowIndex][lastColIndex] = '';
                newBoard[rowIndex][colIndex] = '';
                newBoard[r_index][c_index] = piece;
                setLastMove(null);
                setTurn((turn) => (turn === '-w' ? '-b' : '-w'));
                setBoard(newBoard);
            } else if (piece.includes(turn) && moveValidator([rowIndex, colIndex], [r_index, c_index], piece, board)) {
                newBoard[rowIndex][colIndex] = '';
                newBoard[r_index][c_index] = piece;

                if ((piece.includes('pawn')) && (Math.abs(r_index - rowIndex) === 2)) {
                    setLastMove({r_index, c_index});
                } else {
                    setLastMove(null);
                }

                if (((piece === 'pawn-w') && (r_index === 0)) || ((piece === 'pawn-b') && (r_index === 7))) {
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
        if (selectedPiece) {
            const square = document.getElementById(`${r_index}${c_index}`);
            if ((r_index + c_index) % 2 === 0) {
                square.style.backgroundColor = 'rgb(71 85 105)';
            } else {
                square.style.backgroundColor = 'rgb(30 41 59)';
            }
        }
        e.target.style.opacity = '0.5';
        const piece = board[r_index][c_index];
        setSelectedPiece({ piece, rowIndex: r_index, colIndex: c_index });
    };

    const handleDrop = (e, r_index, c_index) => {
        e.preventDefault();

        if (selectedPiece) {
            const { piece, rowIndex, colIndex } = selectedPiece;
            const newBoard = [...board];

            if (piece.includes(turn) && checkEnPassant(r_index, c_index)) {
                const {r_index: lastRowIndex, c_index: lastColIndex} = lastMove;
                newBoard[lastRowIndex][lastColIndex] = '';
                newBoard[rowIndex][colIndex] = '';
                newBoard[r_index][c_index] = piece;
                setLastMove(null);
                setTurn((turn) => (turn === '-w' ? '-b' : '-w'));
                setBoard(newBoard);
            } else if (piece.includes(turn) && moveValidator([rowIndex, colIndex], [r_index, c_index], piece, board)) {
                newBoard[rowIndex][colIndex] = '';
                newBoard[r_index][c_index] = piece;

                if ((piece.includes('pawn')) && (Math.abs(r_index - rowIndex) === 2)) {
                    setLastMove({r_index, c_index});
                } else {
                    setLastMove(null);
                }

                if (((piece === 'pawn-w') && (r_index === 0)) || ((piece === 'pawn-b') && (r_index === 7))) {
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
                        <h2 className="text-xl font-bold text-black flex justify-center">Promote Pawn</h2>
                        <div className="flex justify-around mt-4 gap-4">
                            {['queen', 'rook', 'bishop', 'knight'].map((piece) => (
                                <Image src = {`/pieces-basic-svg/${piece}${promotionPiece.color}.svg`} alt = {piece} width = {70} height = {70} key={piece} onClick={() => handlePromotion(piece)} className="p-2 cursor-pointer hover:scale-110 border-black border-2 rounded-full hover:bg-blue-400" />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChessBoard;
