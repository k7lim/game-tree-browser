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
        gameTree = generateGameTree(window.nimLogic);
        loop();
    });
    btnTTT.mousePressed(() => {
        gameTree = generateGameTree(window.ticTacToeLogic);
        loop();
    });

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
    const size = 30;
    strokeWeight(1);
    fill(255);
    stroke(0);
    ellipse(0, 0, size);
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
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(state.id, 0, 0);
    pop();
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
