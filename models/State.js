class State {
    constructor(id) {
        this.id = id;
        this.playerTurn = 1;
        this.moves = [];
        this.children = [];
        this.isTerminal = false;
        this.outcome = { blue: 0.5, red: 0.5 };
        this.winner = null;
        this.x = 0;
        this.y = 0;
    }
}

window.State = State;
