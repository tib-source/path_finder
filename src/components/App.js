import React from "react";
import Board from "./Board";


function App() {

  return (
    <div className="App">
      <header className="header">
        <h1>Path Finder</h1>
        <button id='start'>Start</button>
      </header>
      <Board />
    </div>
  );
}

export default App;
