import React from 'react';

export default function moveValidator(from, to, piece, board) {
    console.log('from', from, 'to', to, 'piece', piece, 'board', board);
    if (piece.includes('pawn')) {
        return validatePawnMove(from, to, piece, board);
    } else if (piece.includes('rook')) {
        return validateRookMove(from, to, board, piece);
    } else if (piece.includes('knight')) {
        return validateKnightMove(from, to, board, piece);
    } else if (piece.includes('bishop')) {
        return validateBishopMove(from, to, board, piece);
    } else if (piece.includes('queen')) {
        return validateQueenMove(from, to, board, piece);
    } else if (piece.includes('king')) {
        return validateKingMove(from, to, piece, board);
    }

    return false;
}

function validatePawnMove(from, to, piece, board) {
    if (to[0] < 0 || to[0] > 7 || to[1] < 0 || to[1] > 7) {
        return false;
    } else if (board[to[0]][to[1]] !== '') {
        const type = piece.includes('-w') ? '-w' : '-b';

        if (board[to[0]][to[1]].includes(type)) {
            return false;
        } else {
            const dir = piece.includes('-w') ? -1 : 1;
            if (((to[0] - from[0]) === dir) && (Math.abs(to[1] - from[1]) === 1)) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        if (from[1] !== to[1]) {
            return false;
        } else {
            const isFirstMove = piece.includes('-w') ? from[0] === 6 : from[0] === 1;
            const dir = piece.includes('-w') ? -1 : 1;

            if (isFirstMove) {
                if ((to[0] - from[0]) === dir) {
                    return true;
                } else if ((to[0] - from[0]) === dir * 2) {
                    if (board[from[0] + dir][from[1]] !== '') {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            } else {
                if ((to[0] - from[0]) === dir) {
                    return true;
                } else {    
                    return false;   
                }
            }
        }
    }
}

function validateRookMove(from, to, board, piece) {
    if (from[0] !== to[0] && from[1] !== to[1]) {
        return false; 
    }

    const [rowStep, colStep] = [Math.sign(to[0] - from[0]), Math.sign(to[1] - from[1])];
    let [row, col] = [from[0] + rowStep, from[1] + colStep];

    while (row !== to[0] || col !== to[1]) {
        if (board[row][col] !== '') {
            return false; 
        }
        row += rowStep;
        col += colStep;
    }

    return board[to[0]][to[1]].includes(piece.includes('-w') ? '-b' : '-w') || board[to[0]][to[1]] === '';
}

function validateKnightMove(from, to, board, piece) {
    const rowDiff = Math.abs(from[0] - to[0]);
    const colDiff = Math.abs(from[1] - to[1]);
    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
        return board[to[0]][to[1]].includes(piece.includes('-w') ? '-b' : '-w') || board[to[0]][to[1]] === '';
    } else {
        return false;
    }
}

function validateBishopMove(from, to, board, piece) {
    if (Math.abs(from[0] - to[0]) !== Math.abs(from[1] - to[1])) {
        return false; 
    }

    const rowStep = Math.sign(to[0] - from[0]);
    const colStep = Math.sign(to[1] - from[1]);
    let [row, col] = [from[0] + rowStep, from[1] + colStep];

    while (row !== to[0] || col !== to[1]) {
        if (board[row][col] !== '') {
            return false;
        }
        row += rowStep;
        col += colStep;
    }

    return board[to[0]][to[1]].includes(piece.includes('-w') ? '-b' : '-w') || board[to[0]][to[1]] === '';
}

function validateQueenMove(from, to, board, piece) {
    return validateRookMove(from, to, board, piece) || validateBishopMove(from, to, board, piece);
}

function validateKingMove(from, to, piece, board) {
    const rowDiff = Math.abs(from[0] - to[0]);
    const colDiff = Math.abs(from[1] - to[1]);
    return (rowDiff <= 1 && colDiff <= 1) && 
        (board[to[0]][to[1]].includes(piece.includes('-w') ? '-b' : '-w') || board[to[0]][to[1]] === '');
}
