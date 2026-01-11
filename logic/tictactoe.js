function checkWin(board, mark) {
    const lines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return lines.some(line => line.every(i => board[i] === mark));
}

const ticTacToeLogic = {
    getInitialState() {
        const board = '---------';
        const state = new State(board);
        state.board = board;
        state.playerTurn = 1;
        return state;
    },

    getPossibleMoves(state) {
        state.board = state.board || state.id;
        const moves = [];
        [...state.board].forEach((c, i) => {
            if (c === '-') {
                moves.push(new Move(state.playerTurn, `place at ${i}`));
            }
        });
        return moves;
    },

    isTerminal(state) {
        state.board = state.board || state.id;
        if (checkWin(state.board, 'X') || checkWin(state.board, 'O')) return true;
        return !state.board.includes('-');
    },

    getWinner(state) {
        state.board = state.board || state.id;
        if (checkWin(state.board, 'X')) return 1;
        if (checkWin(state.board, 'O')) return 2;
        if (!state.board.includes('-')) return 0;
        return null;
    },

    getNextState(state, move) {
        state.board = state.board || state.id;
        const match = /place at (\d+)/.exec(move.description);
        let index = 0;
        if (match) index = parseInt(match[1], 10);
        const mark = state.playerTurn === 1 ? 'X' : 'O';
        const boardArr = [...state.board];
        boardArr[index] = mark;
        const board = boardArr.join('');
        const next = new State(board);
        next.board = board;
        next.playerTurn = state.playerTurn === 1 ? 2 : 1;
        return next;
    }
};

window.ticTacToeLogic = ticTacToeLogic;
