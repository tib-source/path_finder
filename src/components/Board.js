// import Square from "./Square"
import { useEffect } from "react"
const Board = (props) => {
  const BOARD_ARRAY = []
  const HTML_BOARD_ARRAY = []

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
      const htmlColumn = []
      for (let col = 0; col < M_COLS; col++) {
        let node = createNode(row, col)
        Column.push(node)
        htmlColumn.push(<div className="box" id={`r${row}-c${col}`} onClick={() => highlightNeighbours(node)}></div>)
      }
      BOARD_ARRAY.push(Column)
      HTML_BOARD_ARRAY.push(htmlColumn)
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

  const highlightNeighbours = (node) => {
    let neighbours = getNeighbours(node);
    for (let i = 0; i < 4; i++) {
      let curr = neighbours[i]
      if (curr === "" || typeof curr === 'undefined') {
        continue
      } else {
        let row = curr.row
        let col = curr.col
        let node = document.getElementById(`r${row}-c${col}`)
        node.classList.add("highlight")
      }
    }
  }
  console.log(getNeighbours(createNode(0, 12)))
  // came from 

  const makeQueue = () => {
    return {
      list: [],
      get: () => {
        return this.list.pop()
      },
      put: (item) => {
        this.list.unshift(item)
      },
      empty: () => {
        return this.list.length === 0
      }
    }
  }
  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const getPath = (node) => {

  }

  const breadthFirstSearch = (startNode, endNode, id = false) => {
    let node;
    let row;
    let col;
    if (id) {
      node = startNode.split("-")
      row = node[0].substring(1)
      col = node[1].substring(1)
      node = BOARD_ARRAY[row][col]
    }
    node = startNode

    let frontier = [] // queue to keep track of frontier nodes
    let visited = [] // list to keep track of visited Nodes 
    let cameFrom = {} //


    frontier.push(node)
    cameFrom[node] = null

    while (!frontier.length == 0) {
      let current = frontier.shift()
      if (current.row == endNode.row && current.col == endNode.col) {
        let htmlCur = document.querySelector(`#r${current.row}-c${current.col}`)
        htmlCur.classList.add('active')
      }
      let neighbours = getNeighbours(current)
      neighbours.forEach(newNode => {
        setTimeout(() => highlightNeighbours(current), 100)
        if (newNode === "" || typeof newNode === 'undefined') { return }
        if (!visited.includes(newNode)) {
          frontier.push(newNode)
          visited.push(newNode)
          cameFrom[newNode] = current
          newNode.previousNode = current
        }
      })

    }


  }
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