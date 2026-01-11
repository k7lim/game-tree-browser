let gameTree = null;
let cameraX;
let cameraY;
let zoomLevel = 1.0;

function preload() {
    // modules loaded via script tags
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    cameraX = width / 2;
    cameraY = 50;

    const btnNim = select('#btn-nim');
    const btnTTT = select('#btn-ttt');

    btnNim.mousePressed(() => {
        console.log("Generating Nim tree...");
        gameTree = generateGameTree(window.nimLogic, 6);
        console.log("Nim tree generated with", countNodes(gameTree), "nodes");
        loop();
    });
    btnTTT.mousePressed(() => {
        console.log("Generating TTT tree...");
        gameTree = generateGameTree(window.ticTacToeLogic, 5);
        console.log("TTT tree generated with", countNodes(gameTree), "nodes");
        loop();
    });

function countNodes(node) {
    let count = 1;
    for (const child of node.children) {
        count += countNodes(child);
    }
    return count;
}

    noLoop();
}

function draw() {
    background(240);
    push();
    translate(cameraX, cameraY);
    scale(zoomLevel);
    if (gameTree) {
        drawTree(gameTree);
    }
    pop();
}

function drawTree(state) {
    drawEdges(state);
    drawNodes(state);
}

function drawEdges(state) {
    for (const child of state.children) {
        stroke(child.playerTurn === 1 ? 'red' : 'blue');
        line(state.x, state.y, child.x, child.y);
        drawEdges(child);
    }
}

function drawNodes(state) {
    drawNode(state);
    for (const child of state.children) {
        drawNodes(child);
    }
}

function drawNode(state) {
    push();
    translate(state.x, state.y);
    const size = 40;
    strokeWeight(1);
    fill(255);
    stroke(0);
    ellipse(0, 0, size);
    
    // Draw outcome ring
    const blueAngle = state.outcome.blue * TWO_PI;
    strokeWeight(4);
    noFill();
    stroke('blue');
    arc(0, 0, size + 8, size + 8, 0, blueAngle);
    stroke('red');
    arc(0, 0, size + 8, size + 8, blueAngle, TWO_PI);
    
    if (state.isTerminal) {
        stroke('green');
        strokeWeight(2);
        noFill();
        ellipse(0, 0, size + 12);
    }
    
    // Draw game state visualization
    drawGameState(state, size);
    pop();
}

function drawGameState(state, size) {
    if (state.id.includes('-') && state.id.length > 5) {
        // Tic-tac-toe board
        drawTicTacToeBoard(state.id, size);
    } else {
        // Nim piles
        drawNimPiles(state.id, size);
    }
}

function drawTicTacToeBoard(id, size) {
    const board = id.split('');
    const cellSize = size / 4;
    
    stroke(0);
    strokeWeight(0.5);
    // Draw grid
    for (let i = 1; i < 3; i++) {
        line(-size/2 + i * cellSize, -size/2, -size/2 + i * cellSize, size/2);
        line(-size/2, -size/2 + i * cellSize, size/2, -size/2 + i * cellSize);
    }
    
    // Draw X's and O's
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(cellSize * 0.6);
    
    for (let i = 0; i < 9; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = -size/2 + col * cellSize + cellSize/2;
        const y = -size/2 + row * cellSize + cellSize/2;
        
        if (board[i] === 'X') {
            text('X', x, y);
        } else if (board[i] === 'O') {
            text('O', x, y);
        }
    }
}

function drawNimPiles(id, size) {
    const piles = id.split('-').map(Number);
    const maxPile = Math.max(...piles);
    const pileWidth = size / (piles.length + 1);
    
    fill(139, 69, 19); // Brown for sticks
    noStroke();
    
    for (let i = 0; i < piles.length; i++) {
        const x = -size/2 + (i + 1) * pileWidth;
        const height = (piles[i] / maxPile) * size * 0.7;
        rect(x - 2, size/2 - height, 4, height);
        
        // Draw count number
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(8);
        text(piles[i], x, size/2 + 8);
        fill(139, 69, 19);
    }
}

function mouseDragged() {
    cameraX += mouseX - pmouseX;
    cameraY += mouseY - pmouseY;
    loop();
}

function mouseWheel(event) {
    const zoomFactor = 1 - event.delta / 500;
    const beforeX = (mouseX - cameraX) / zoomLevel;
    const beforeY = (mouseY - cameraY) / zoomLevel;
    zoomLevel *= zoomFactor;
    const afterX = beforeX * zoomLevel;
    const afterY = beforeY * zoomLevel;
    cameraX = mouseX - afterX;
    cameraY = mouseY - afterY;
    loop();
    return false;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
