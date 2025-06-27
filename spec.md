
#### **1. Project Overview**

  * **Project Name:** Game Tree Browser
  * **Objective:** An offline-first, browser-based educational tool to visualize the complete game-state trees for the games of Nim and Tic-Tac-Toe.
  * **Core User Experience:** The user selects a game and is presented with a static, fully explorable visualization of that game's entire tree of possible states. The user can pan and zoom to navigate the tree.
  * **Educational Goal:** To cultivate strategic thinking by allowing a user to see how initial moves affect future outcomes and to recognize patterns in winning vs. losing states.

#### **2. Technology Stack**

  * **Language:** JavaScript (ES6+)
  * **Rendering Library:** **p5.js**.
  * **Deployment:** A static `index.html` file that can be opened directly in any modern web browser. No web server is required.

**\<rationale\>**
The choice of p5.js is ideal. It directly addresses the primary technical challenge—the interactive visualization—with a simple, intuitive, and well-documented API. It's built on the HTML Canvas, providing good performance. Most importantly, it fulfills the user's goal of creating a learning tool for his daughter. This stack has zero external dependencies beyond the p5.js library itself, making it robust, fast, and perfect for offline use.
**\</rationale\>**

#### **3. Data Models**

These should be implemented as simple JavaScript Classes or factory functions. They contain only data and game-specific logic, with no rendering code.

```javascript
// In a file like 'models/State.js'

class State {
    constructor(id) {
        this.id = id; // A unique string representation, e.g., "1-3-5-7" for Nim or "X-O--X---" for TTT.
        this.playerTurn = 1; // Or 2
        this.moves = []; // An array of Move objects leading from this State.
        this.children = []; // An array of child State objects.
        this.isTerminal = false; // Is this a final state (win/loss/draw)?

        // --- Populated by the analysis step ---
        this.outcome = { blue: 0.5, red: 0.5 }; // Win probability for Player 1 (Blue) and Player 2 (Red)
        this.winner = null; // 1, 2, or 0 for a draw, if terminal.

        // --- For rendering ---
        this.x = 0; // Position on the canvas
        this.y = 0;
    }
}

class Move {
    constructor(player, description) {
        this.player = player; // 1 or 2
        this.description = description; // e.g., "Take 2 from Pile 3" or "Place X at (1,1)"
    }
}
```

#### **4. Application Architecture & File Structure**

A clean separation between game logic and rendering logic is paramount for testability and readability.

**Recommended File Structure:**

```
/game-tree-browser/
|-- index.html              # The main HTML file to launch the app
|-- sketch.js               # The main p5.js file for all rendering and UI logic
|-- style.css               # Basic styling for the page
|
|
|-- /logic/
|   |-- tree_generator.js   # Logic to generate and analyze the game tree
|   |-- nim.js              # Rules, move generation, and win conditions for Nim
|   |-- tictactoe.js        # Rules, move generation, and win conditions for Tic-Tac-Toe
|
|-- /models/
|   |-- State.js            # The data model for a State (node)
|   |-- Move.js             # The data model for a Move (edge)

```

**Execution Flow:**

1.  **`index.html`**:

      * Loads p5.js via CDN, `style.css`, and finally `sketch.js`.
      * Contains the `<main>` tag where the p5.js canvas will be created.
      * Should include simple HTML buttons or a dropdown to allow the user to select "Nim" or "Tic-Tac-Toe".

2.  **`sketch.js` (p5.js Logic):**

      * Defines global variables for the `gameTree`, `cameraX`, `cameraY`, and `zoomLevel`.
      * **`setup()` function:**
          * Creates the canvas (`createCanvas(windowWidth, windowHeight)`).
          * Attaches event listeners to the HTML buttons. When a button is clicked:
            1.  Call the `generateGameTree` function from `tree_generator.js`, passing in the chosen game's logic module (`nim` or `tictactoe`).
            2.  Store the returned tree of `State` objects in the global `gameTree` variable.
            3.  Optionally call `noLoop()` if you only want to redraw when the user interacts.
      * **`draw()` function:**
          * Clears the canvas: `background(240)`.
          * Applies camera transformations: `translate(cameraX, cameraY)` and `scale(zoomLevel)`.
          * If `gameTree` exists, iterate through it and draw the edges (lines) first, then the nodes (circles) on top.
          * Each node's drawing function will:
              * Draw the circle.
              * Draw the colored ring based on the `state.outcome` property. p5.js's `arc()` function is perfect for this.
              * Draw a simplified visual representation of the game state inside the circle.
      * **Interaction Functions (`mousePressed`, `mouseDragged`, `mouseWheel`):**
          * These p5.js functions will update the `cameraX`, `cameraY`, and `zoomLevel` variables to allow panning and zooming. Call `loop()` if `noLoop()` was used.

3.  **`tree_generator.js` (Core Logic):**

      * This is pure, non-visual JavaScript.
      * **`generateGameTree(gameLogic)` function:**
        1.  Creates the `rootState` using `gameLogic.getInitialState()`.
        2.  Uses a queue (Breadth-First Search) to discover all possible states. For each state, use `gameLogic.getPossibleMoves()` to find its children. Store all unique states in a map or set to avoid redundant calculations.
        3.  After the tree is built, perform a second, bottom-up pass to calculate the win probabilities (`outcome` property) for each `State`, starting from the terminal nodes.
