"use client";
import Image from 'next/image';
import React from 'react';

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

    const [selectedPiece, setSelectedPiece] = React.useState(null);
    const files = Array.from({ length: 8 }, (_, index) => String.fromCharCode(65 + index));
    const ranks = Array.from({ length: 8 }, (_, index) => index + 1);

    const handleClick = (e, r_index, c_index) => {
        if (selectedPiece) {
            const newBoard = [...board];
            const { piece, rowIndex, colIndex } = selectedPiece;
            newBoard[rowIndex][colIndex] = '';
            newBoard[r_index][c_index] = piece;
            setBoard(newBoard);
            setSelectedPiece(null);
        } else if (board[r_index][c_index] !== '') {
            e.target.style.opacity = '0.5';
            const piece = board[r_index][c_index];
            setSelectedPiece({ piece, rowIndex: r_index, colIndex: c_index });
        }
    };

    const handleDragStart = (e, r_index, c_index) => {
        e.dataTransfer.setData('text', e.target.id); // Pass the ID of the dragged element
        e.target.style.opacity = '0.5';
        const piece = board[r_index][c_index];
        setSelectedPiece({ piece, rowIndex: r_index, colIndex: c_index });
    }

    const handleDrop = (e, r_index, c_index) => {
        e.preventDefault();

        const piece_id = e.dataTransfer.getData('text');
        const piece = document.getElementById(piece_id);

        if (piece) {
            // Get the piece type from the ID
            const pieceType = piece.id;

            // Create a copy of the current board
            const newBoard = [...board];

            // Place the piece on the new square
            newBoard[r_index][c_index] = pieceType;

            // Clear the original square if a piece was selected
            if (selectedPiece) {
                newBoard[selectedPiece.rowIndex][selectedPiece.colIndex] = '';
            }

            // Update the board state
            setBoard(newBoard);

            // Reset selectedPiece since the piece has been moved
            setSelectedPiece(null);
        }
    }

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
                                <div key={r_index} className='flex'>
                                    {
                                        row.map((item, c_index) => (
                                            <div
                                                key={c_index}
                                                className={`w-[10vh] h-[10vh] flex justify-center items-center ${(r_index + c_index) % 2 === 0 ? 'bg-slate-600' : 'bg-slate-800'} cursor-pointer`}
                                                onClick={(e) => handleClick(e, r_index, c_index)}
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => handleDrop(e, r_index, c_index)} // Pass indices to drop handler
                                            >
                                                {item !== '' ?
                                                    <Image
                                                        src={`/pieces-basic-svg/${item}.svg`}
                                                        alt={item}
                                                        width={80}
                                                        height={80}
                                                        id={item} // Use piece type as ID
                                                        className='hover:scale-110'
                                                        onDragStart={(e) => handleDragStart(e, r_index, c_index)}
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
        </div>
    );
}

export default ChessBoard;
