# **Project Build: A Synthesized Prompt Plan**

This plan outlines the implementation of the **Game Tree Browser** project. It is divided into sequential work blocks, designed to be executed by a developer AI, followed by mandatory human verification steps.

## 1.0 Project Scaffolding and Setup

**[AI WORK BLOCK]** Started [x] Finished [x]

  * **PROMPT ID:** 1.1
  * **GOAL:** Create the complete directory structure and all necessary empty files for the project. Populate `index.html` with the basic structure and `style.css` with placeholder styles.

<!-- end list -->

```text
Based on the specification, create the full file and directory structure for the "Game Tree Browser" project.

1.  **Create Directories:**
    * `game-tree-browser/` (root)
    * `game-tree-browser/logic/`
    * `game-tree-browser/models/`

2.  **Create Empty Files (for now):**
    * `game-tree-browser/sketch.js`
    * `game-tree-browser/logic/tree_generator.js`
    * `game-tree-browser/logic/nim.js`
    * `game-tree-browser/logic/tictactoe.js`
    * `game-tree-browser/models/State.js`
    * `game-tree-browser/models/Move.js`

3.  **Populate `index.html`:**
    * Create `game-tree-browser/index.html`.
    * Set the document title to "Game Tree Browser".
    * Link to `style.css`, p5.js via CDN (https://cdn.jsdelivr.net/npm/p5@1.11.8/lib/p5.min.js), and all the JavaScript files you created in the correct order (`models`, `logic`, then `sketch.js`).
    * Add a `<h1>` with the project title.
    * Create a `div` to hold the game selection controls. Inside, add two buttons with IDs: `btn-nim` (text: "Explore Nim") and `btn-ttt` (text: "Explore Tic-Tac-Toe").
    * Create a `<main>` tag which will contain the p5.js canvas.

4.  **Populate `style.css`:**
    * Create `game-tree-browser/style.css`.
    * Add basic styles for the body to remove default margins.
    * Add simple styling for the buttons to make them clearly visible and clickable.
```

**[HUMAN ACTION REQUIRED]**

1.  Review the generated file and directory structure to ensure it matches the specification.
2.  Open the `index.html` file in your browser to confirm the title and buttons are visible.

## 2.0 Core Data Models

**[AI WORK BLOCK]** Started [x] Finished [x]

  * **PROMPT ID:** 2.1
  * **GOAL:** Implement the core data structures, `State` and `Move`, as JavaScript classes.

<!-- end list -->

```text
Using the confirmed vocabulary (`State`, `Move`), implement the data models as JavaScript classes in their respective files.

1.  **Implement `Move.js`:**
    * In `models/Move.js`, create a class named `Move` and assign it to `window.Move` for global access.
    * The constructor should accept `player` and `description`.
    * Assign these to `this.player` and `this.description`.

2.  **Implement `State.js`:**
    * In `models/State.js`, create a class named `State` and assign it to `window.State` for global access.
    * The constructor should accept a unique `id`.
    * Initialize all properties as defined in the technical specification: `id`, `playerTurn`, `moves`, `children`, `isTerminal`, `outcome`, `winner`, `x`, and `y`.
```

**[HUMAN ACTION REQUIRED]**

1.  Review the generated code in `models/State.js` and `models/Move.js`.
2.  Verify that the class properties match the technical specification exactly.
3.  Ensure the classes are exported correctly for use in other modules.

## 3.0 Game Logic Modules (Nim & Tic-Tac-Toe)

**[AI WORK BLOCK]** Started [x] Finished [x]

  * **PROMPT ID:** 3.1
  * **GOAL:** Implement the complete game logic for both `Nim` and `TicTacToe`. This is pure logic with no rendering or tree-building code.

<!-- end list -->

```text
Implement the game logic for Nim and Tic-Tac-Toe in their respective files. Each file should export an object containing the required functions. This logic must correctly manage game rules and `TurnTaking`.

**1. Implement `nim.js`:**
   * The initial state for Nim is typically a set of piles (e.g., `[1, 3, 5, 7]`). The state `id` should be a string representation like `"1-3-5-7"`.
   * Create a `nimLogic` object and assign it to `window.nimLogic` for global access, with the following methods:
     * `getInitialState()`: Returns a new `State` object for the start of the game.
     * `getPossibleMoves(state)`: Takes a `State` object. Returns an array of `Move` objects representing all valid moves from that state. A move is taking some number of items from a single pile.
     * `isTerminal(state)`: Takes a `State` object. Returns `true` if the game is over (all piles are empty), otherwise `false`.
     * `getWinner(state)`: Takes a terminal `State`. Returns the winner (the player who made the last move). Player 1 or 2.
     * `getNextState(state, move)`: Takes a `State` and a `Move`. Returns a new `State` object that results from applying the move.

**2. Implement `tictactoe.js`:**
   * The state `id` should be a string representation like `"X-O--X---"`.
   * Create a `ticTacToeLogic` object and assign it to `window.ticTacToeLogic` for global access, with the following methods:
     * `getInitialState()`: Returns a new `State` object for the start of the game (empty board).
     * `getPossibleMoves(state)`: Takes a `State`. Returns an array of `Move` objects representing placing the current player's mark in any empty square.
     * `isTerminal(state)`: Takes a `State`. Returns `true` if there is a win (3 in a row) or a draw (board is full), otherwise `false`.
     * `getWinner(state)`: Takes a terminal `State`. Returns `1` if Player 1 ('X') won, `2` if Player 2 ('O') won, or `0` for a draw. Returns `null` if not terminal.
     * `getNextState(state, move)`: Takes a `State` and a `Move`. Returns a new `State` object that results from applying the move.
```

**[HUMAN ACTION REQUIRED]**

1.  Review the generated code in `logic/nim.js` and `logic/tictactoe.js`.
2.  Critically assess the game rule implementations. Are all winning, losing, and draw conditions correctly identified?
3.  Is the `TurnTaking` logic handled correctly in the `getNextState` functions (i.e., does `playerTurn` switch from 1 to 2 and vice-versa)?
4.  Commit the work: `git commit -m "feat(logic): implement core game logic for nim and ttt"`

## 4.0 Game Tree Generation and Analysis

**[AI WORK BLOCK]** Started [x] Finished [x]

  * **PROMPT ID:** 4.1
  * **GOAL:** Implement the logic to generate a complete `GameTree` from a given game logic module and then analyze it to determine the win/loss `Odds` for every `State`.

<!-- end list -->

```text
In `logic/tree_generator.js`, implement the `generateGameTree` function. This function is the core algorithmic engine of the application. It should be pure, non-visual JavaScript.

1.  **Create the generateGameTree function and assign it to window.generateGameTree for global access.**
2.  **`generateGameTree(gameLogic)` function:**
    * This function accepts a `gameLogic` object (`nimLogic` or `ticTacToeLogic`).
    * **Part A: Tree Construction (BFS)**
        1.  Initialize a `root` node by calling `gameLogic.getInitialState()`.
        2.  Create a queue and add the `root` to it.
        3.  Create a `Map` (e.g., `discoveredStates`) to store states you've already processed, using the state `id` as the key. Add the root to this map.
        4.  Loop while the queue is not empty:
            * Dequeue the `currentState`.
            * Check if `currentState` is terminal using `gameLogic.isTerminal()`. If so, set its `isTerminal` flag, determine the `winner` using `gameLogic.getWinner()`, and continue to the next iteration.
            * If not terminal, get all possible moves using `gameLogic.getPossibleMoves(currentState)`.
            * For each `move`, generate the `nextState` using `gameLogic.getNextState(currentState, move)`.
            * If the `nextState.id` is NOT in your `discoveredStates` map, add it to the map and the queue.
            * Link the parent and child: add the `move` to `currentState.moves` and the (potentially already discovered) state object to `currentState.children`.
    * **Part B: Outcome Analysis (Bottom-up Pass)**
        1.  This part calculates the `outcome` property (`Odds`). Create a helper function, perhaps `calculateOutcomes(state)`.
        2.  This function should be recursive with memoization (or iterative, starting from all terminal nodes).
        3.  For a terminal `State`: if player 1 won, `outcome` is `{ blue: 1, red: 0 }`. If player 2 won, `{ blue: 0, red: 1 }`. For a draw, `{ blue: 0.5, red: 0.5 }`.
        4.  For a non-terminal `State`:
            * Recursively call `calculateOutcomes` on all its children.
            * If it's Player 1's turn, they will choose the move leading to the child state with the *highest* blue value. That value becomes the parent's `outcome`.
            * If it's Player 2's turn, they will choose the move leading to the child state with the *highest* red value (lowest blue value). That value becomes the parent's `outcome`.
    * **Part C: Layout Calculation (Simple Tree Layout)**
        1.  Perform a simple Depth-First Search (DFS) traversal of the tree to assign `x` and `y` coordinates for rendering. A simple hierarchical layout is sufficient. Calculate the depth of each node and the breadth at each level to inform positions.
    * **Return Value:** The function should return the fully processed `root` node of the `GameTree`.
```

**[HUMAN ACTION REQUIRED]**

1.  Review the generated code in `logic/tree_generator.js`.
2.  Verify the correctness of the Breadth-First Search (BFS) for tree discovery.
3.  Verify the correctness of the bottom-up pass for calculating state outcomes (`Odds`). This is the most complex part of the logic; pay close attention to the min/max logic based on whose turn it is.
4.  Commit the work: `git commit -m "feat(logic): implement game tree generator and analyzer"`

## 5.0 Visualization and Interaction

**[AI WORK BLOCK]** Started [x] Finished [x]

  * **PROMPT ID:** 5.1
  * **GOAL:** Implement the p5.js sketch to handle rendering the `GameTree` and all user interactions (game selection, panning, zooming).

<!-- end list -->

```text
In `sketch.js`, write the p5.js code to visualize and interact with the generated `GameTree`.

1.  **Global Variables:**
    * Declare globals: `gameTree = null;`, `cameraX`, `cameraY`, `zoomLevel = 1.0;`.

2.  **`preload()` function:**
    * Leave this empty - all modules are loaded via script tags in HTML.

3.  **`setup()` function:**
    * Create the canvas to fill the window.
    * Initialize `cameraX = width / 2;` and `cameraY = 50;`.
    * Get the button elements from the DOM.
    * Attach `mousePressed` event listeners to each button.
        * The Nim button's listener should call `gameTree = generateGameTree(window.nimLogic);` and then `loop();`.
        * The Tic-Tac-Toe button's listener should call `gameTree = generateGameTree(window.ticTacToeLogic);` and then `loop();`.
    * Call `noLoop()` at the end of `setup()` to prevent drawing until a game is selected.

4.  **`draw()` function:**
    * Set a background color.
    * Apply camera transforms: `translate(cameraX, cameraY);` and `scale(zoomLevel);`.
    * If `gameTree` is not null, call a drawing function `drawTree(gameTree)`.

5.  **`drawTree(rootState)` function:**
    * This function should recursively traverse the tree.
    * First, draw all the edges (lines between parent and child `State` nodes). The line color could reflect the player who made the move.
    * Then, draw all the nodes on top of the edges. Call a `drawNode(state)` function for this.

6.  **`drawNode(state)` function:**
    * Use the `state.x` and `state.y` for positioning.
    * Draw a circle for the node body.
    * Use the `p5.arc()` function to draw the `outcome` as a two-color ring around the node (e.g., blue for Player 1's win probability, red for Player 2's). The proportion of the arc for each color should match `state.outcome.blue` and `state.outcome.red`.
    * If the state is terminal, indicate the winner (e.g., by changing the node's border color).
    * (Optional but recommended) Draw a simplified representation of the game state (e.g., the numbers for Nim piles or the X/O grid for Tic-Tac-Toe) inside the node.

7.  **Interaction Functions:**
    * `mouseDragged()`: Update `cameraX` and `cameraY` based on `mouseX - pmouseX` and `mouseY - pmouseY` to enable panning. Call `loop()`.
    * `mouseWheel(event)`: Adjust `zoomLevel` based on `event.delta`. Implement logic to zoom towards the mouse cursor's position. Prevent default browser behavior. Call `loop()`. After updating zoom, call `noLoop()`.

8.  **`windowResized()` function:**
    * Implement this p5 function to resize the canvas when the browser window changes.
```

**[HUMAN ACTION REQUIRED]**

1.  Thoroughly review the generated p5.js code in `sketch.js`.
2.  **Final User Acceptance Test:**
      * Open `index.html` in your web browser.
      * Click the "Explore Nim" button. Does the Nim game tree appear?
      * Click the "Explore Tic-Tac-Toe" button. Does the Tic-Tac-Toe game tree appear?
      * Test panning by clicking and dragging the mouse.
      * Test zooming using the mouse wheel.
      * Visually inspect the nodes. Do the colored `outcome` rings correctly represent the strategic value of the states (e.g., are forced-win states fully colored for the winning player)?
      * Verify that terminal nodes (wins/losses/draws) are clearly marked.
3.  Commit the final work: `git commit -m "feat(viz): implement p5js rendering and interaction"`