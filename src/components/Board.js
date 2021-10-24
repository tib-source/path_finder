// import Square from "./Square"
import { useEffect } from "react"
const Board = (props) => {

  return (
    <>
      <button onClick={() => breadthFirstSearch(createNode(12, 20), createNode(1, 29))}>search</button>
    <div className="grid">
      {
        HTML_BOARD_ARRAY.map((row, rowIdx) => {
          return (<div className='row'>{row.map((col, colIdx) => col)}</div>)
        })
      }
    </div>
    </>
  )
}


export default Board