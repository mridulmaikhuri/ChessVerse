export default function moveValidator(from, to, piece, board) {
    console.log('from', from, 'to', to, 'piece', piece, 'board', board);
    if (piece.includes('pawn')) {
        return validatePawnMove(from, to, piece, board);
    } else if (piece.includes('rook')) {

    } else if (piece.includes('knight')) {

    } else if (piece.includes('bishop')) {

    } else if (piece.includes('queen')) {

    } else if (piece.includes('king')) {

    }

    return true;
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