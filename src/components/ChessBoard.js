"use client"
import Image from 'next/image';
import React from 'react'

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
        ]
    );
    const files = Array.from({ length: 8 }, (_, index) => String.fromCharCode(65 + index));
    const ranks = Array.from({ length: 8 }, (_, index) => index + 1);

    return (
        <div>
            <div className='flex gap-2'>
                <div className='h-[80vh]'>
                    {
                        ranks.map((item, index) => {
                            return (
                                <div key={index} className='h-[10vh] flex items-center text-xl'>
                                    {item}
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <div className='w-[80vh] h-[80vh]'>
                        {
                            board.map((row, r_index) => {
                                return (
                                    <div key={r_index} className='flex'>
                                        {
                                            row.map((item, c_index) => {
                                                return (
                                                    <div key={c_index} className={`w-[10vh] h-[10vh] flex justify-center items-center ${(r_index + c_index) % 2 === 0 ? 'bg-slate-600' : 'bg-slate-800'} cursor-pointer`}>
                                                        {(item !== '') ? <Image src={`/pieces-basic-svg/${item}.svg`} alt={item} width={80} height={80} className='hover:scale-110'/> : ''}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w-[80vh] flex'>
                        {
                            files.map((item, index) => {
                                return (
                                    <div key={index} className='w-[10vh] text-xl flex justify-center'>
                                        {item}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChessBoard