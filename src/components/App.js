import React, { useState } from "react";
import Board from "./Board";
import PathFinder from "./PathFinder";

function App() {
  const [update, setupdate] = useState({ counter: 0 });
  const min = 20;
  const max = 50;
  const path = new PathFinder(min, max);
  const [startNode, setStartNode] = useState(path.createNode(0, 10));
  const [endNode, setEndNode] = useState(path.createNode(1, 30));
  const mockTest = () => {
    console.log(startNode, endNode);
    path.breadthFirstSearch(startNode, endNode);
  };

  const handleReset = () => {
    path.resetBoard();
    setStartNode(path.createNode(0, 10));
    setEndNode(path.createNode(1, 30));
    return setupdate({
      counter: update.counter + 1,
    });
  };

  const handleInput = (node) => {
    if (node === "start") {
      setTimeout(() => {
        document.addEventListener("click", function handler(e) {
          const start = e.path[0];
          let [row, col] = start.id.split("-");
          if (start.id.split("-").length === 2) {
            start.classList.add("start");
            row = parseInt(row.substring(1));
            col = parseInt(col.substring(1));
            console.log(path.createNode(row, col));
            setStartNode(path.createNode(row, col));
          }

          document.removeEventListener("click", handler);
        });
      }, 10);
    } else {
      setTimeout(() => {
        document.addEventListener("click", function handler(e) {
          const end = e.path[0];
          let [row, col] = end.id.split("-");
          if (end.id.split("-").length === 2) {
            end.classList.add("active");
            row = parseInt(row.substring(1));
            col = parseInt(col.substring(1));
            setEndNode(path.createNode(row, col));
          }

          document.removeEventListener("click", handler);
        });
      }, 10);
    }
  };
  return (
    <div className="App">
      <header className="header">
        <h1>Path Finder</h1>
        <button id="start" onClick={mockTest}>
          Start
        </button>
        <button id="end" onClick={handleReset}>
          Reset
        </button>

        <div className="startEnd">
          <button className="nodeInput" onClick={() => handleInput("start")}>
            Set Start Node
          </button>
          <button className="nodeInput" onClick={() => handleInput("end")}>
            Set End Node
          </button>
        </div>
      </header>
      <Board mock={mockTest} HTML_BOARD_ARRAY={path.HTML_BOARD_ARRAY} />
    </div>
  );
}

export default App;
