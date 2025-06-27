function generateGameTree(gameLogic) {
    const root = gameLogic.getInitialState();
    const queue = [root];
    const discovered = new Map();
    discovered.set(root.id, root);

    while (queue.length > 0) {
        const current = queue.shift();
        if (gameLogic.isTerminal(current)) {
            current.isTerminal = true;
            current.winner = gameLogic.getWinner(current);
            continue;
        }
        const moves = gameLogic.getPossibleMoves(current);
        for (const move of moves) {
            const nextState = gameLogic.getNextState(current, move);
            let child = discovered.get(nextState.id);
            if (!child) {
                child = nextState;
                discovered.set(child.id, child);
                queue.push(child);
            }
            current.moves.push(move);
            current.children.push(child);
        }
    }

    const memo = new Map();
    function calculateOutcomes(state) {
        if (memo.has(state.id)) return memo.get(state.id);
        let outcome;
        if (state.isTerminal) {
            if (state.winner === 1) outcome = { blue: 1, red: 0 };
            else if (state.winner === 2) outcome = { blue: 0, red: 1 };
            else outcome = { blue: 0.5, red: 0.5 };
        } else {
            const childOutcomes = state.children.map(c => calculateOutcomes(c));
            if (state.playerTurn === 1) {
                outcome = childOutcomes.reduce((best, o) => o.blue > best.blue ? o : best, {blue: -1, red:0});
            } else {
                outcome = childOutcomes.reduce((best, o) => o.red > best.red ? o : best, {blue:1, red:-1});
            }
        }
        state.outcome = { blue: outcome.blue, red: outcome.red };
        memo.set(state.id, state.outcome);
        return state.outcome;
    }

    calculateOutcomes(root);

    const levelCounts = {};
    function assignCoords(node, depth) {
        levelCounts[depth] = (levelCounts[depth] || 0) + 1;
        node.x = levelCounts[depth] * 80;
        node.y = depth * 100;
        node.children.forEach(child => assignCoords(child, depth + 1));
    }
    assignCoords(root, 0);

    return root;
}

window.generateGameTree = generateGameTree;
