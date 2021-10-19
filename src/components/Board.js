import Square from "./Square"
import { useEffect } from "react"
const Board = (props) => {
  const BOARD_ARRAY = []

  const createNode = (row, col) => {
    return {
      row: row,
      col: col,
      previousNode: null,
      isWall: false,
    }
  }

  const createBoard = (MaxRows = 20, MaxCols = 50) => {
    const M_ROWS = MaxRows,
      M_COLS = MaxCols

    for (let row = 0; row < M_ROWS; row++) {
      const Column = []
      for (let col = 0; col < M_COLS; col++) {
        Column.push(createNode(row, col))
      }
      BOARD_ARRAY.push(Column)
    }
  }

  createBoard()

  function getNeighbourNode(node, direction, vertical = false) {
    try {
      let Node;
      if (!vertical) {
        Node = BOARD_ARRAY[node.row + direction][node.col]
      } else {
        Node = BOARD_ARRAY[node.row][node.col + direction]
      }

      return Node
    } catch (e) {
      return ""
    }
  }

  const getNeighbours = (node) => {
    let neighbours = []
    let directions = [1, -1, "U", "D"]
    for (let direction in directions) {
      let neighbour
      switch (directions[direction]) {
        case 1:
          neighbour = getNeighbourNode(node, +1)
          neighbours.push(neighbour)
          break

        case -1:
          neighbour = getNeighbourNode(node, -1)
          neighbours.push(neighbour)
          break

        case "U":
          neighbour = getNeighbourNode(node, -1, true)
          neighbours.push(neighbour)
          break

        case "D":
          neighbour = getNeighbourNode(node, 1, true)
          neighbours.push(neighbour)
          break
        default:
          break
      }
    }
    return neighbours
  }

  console.log(getNeighbours(createNode(0, 12)))
  // came from 

  return (
    <div className="grid">
      {
        BOARD_ARRAY.map((row, rowIdx) => {
          return (<div className='row'>{row.map((col, colIdx) => <Square col={colIdx} row={rowIdx}></Square>)}</div>)
        })
      }
    </div>
  )
}


export default Board