function parseId(id) {
    return id.split('-').map(Number);
}

function idFromPiles(piles) {
    return piles.join('-');
}

const nimLogic = {
    getInitialState() {
        const piles = [1, 3, 5, 7];
        const state = new State(idFromPiles(piles));
        state.piles = piles;
        state.playerTurn = 1;
        return state;
    },

    getPossibleMoves(state) {
        const moves = [];
        state.piles = state.piles || parseId(state.id);
        state.piles.forEach((count, index) => {
            for (let take = 1; take <= count; take++) {
                moves.push(new Move(state.playerTurn, `take ${take} from pile ${index}`));
            }
        });
        return moves;
    },

    isTerminal(state) {
        state.piles = state.piles || parseId(state.id);
        return state.piles.every(p => p === 0);
    },

    getWinner(state) {
        if (!this.isTerminal(state)) return null;
        return state.playerTurn === 1 ? 2 : 1;
    },

    getNextState(state, move) {
        const piles = (state.piles || parseId(state.id)).slice();
        const match = /take (\d+) from pile (\d+)/.exec(move.description);
        if (match) {
            const take = parseInt(match[1], 10);
            const index = parseInt(match[2], 10);
            piles[index] -= take;
        }
        const next = new State(idFromPiles(piles));
        next.piles = piles;
        next.playerTurn = state.playerTurn === 1 ? 2 : 1;
        return next;
    }
};

window.nimLogic = nimLogic;
