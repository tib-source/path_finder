import React, { useState } from "react";
import Board from "./Board";
import PathFinder from "./PathFinder";

function App() {
  const [update, setupdate] = useState({ counter: 0 })
  const path = new PathFinder(20, 50)

  const mockTest = () => {
    path.breadthFirstSearch(path.createNode(12, 20), path.createNode(1, 29))
  }


  const handleReset = () => {
    path.createBoard()
    return setupdate({
      counter: update.counter + 1
    })
  }
  return (
    <div className="App">
      <header className="header">
        <h1>Path Finder</h1>
        <button id='start' onClick={mockTest}>Start</button>
        <button id='end' onClick={handleReset}>Reset</button>
      </header>
      <Board mock={mockTest} HTML_BOARD_ARRAY={path.HTML_BOARD_ARRAY} />
    </div>
  );
}

export default App;
