import React from 'react'

function ChessBoard() {
    const array = Array.from({ length: 64 }, (_, index) => index);
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
                    <div className='w-[80vh] h-[80vh] grid grid-cols-8'>
                        {
                            array.map((item, index) => {
                                const isBlack = (Math.floor(index / 8) + index % 8) % 2 === 1;
                                return (
                                    <div key={index} className={`w-full h-full ${isBlack ? 'bg-yellow-600' : 'bg-white'}`}>

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