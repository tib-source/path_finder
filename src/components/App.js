import React from "react";
import Square from "./Square";


function App() {

  const M_ROWS = 20,
    M_COLS = 50,
    GRID = []

  for (let row = 0; row < M_ROWS; row++) {
    const Column = []
    for (let col = 0; col < M_COLS; col++) {
      Column.push(<div className='box'></div>)
    }
    GRID.push(Column)
  }
  console.log(GRID)


  return (
    <div className="App">
      <h1>Hello</h1>
      <div className="grid">
        {GRID.map(row => {
          return (<div className='row'>{row}</div>)
        })}
      </div>
    </div>
  );
}

export default App;
