export default class PathFinder {
  constructor(M_ROWS, M_COLS) {
    this.M_COLS = M_COLS
    this.M_ROWS = M_ROWS
    this.BOARD_ARRAY = []
    this.HTML_BOARD_ARRAY = []
    this.createBoard(this.M_ROWS, this.M_COLS)
  }


  createNode(row, col) {
    return {
      row: row,
      col: col,
      previousNode: null,
      isWall: false,
    }
  }

  createBoard(MaxRows = 20, MaxCols = 50) {
    const M_ROWS = MaxRows,
      M_COLS = MaxCols

    for (let row = 0; row < M_ROWS; row++) {
      const Column = []
      const htmlColumn = []
      for (let col = 0; col < M_COLS; col++) {
        let node = this.createNode(row, col)
        Column.push(node)
        htmlColumn.push(<div className="box" id={`r${row}-c${col}`} onClick={() => this.highlightNeighbours(node)}></div>)
      }
      this.BOARD_ARRAY.push(Column)
      this.HTML_BOARD_ARRAY.push(htmlColumn)
    }
  }

  resetBoard() {
    this.createBoard()
    this.HTML_BOARD_ARRAY.forEach(elem => {

      elem.classList.remove('active')
    })
  }
  getNeighbourNode(node, direction, vertical = false) {
    try {
      let Node;
      if (!vertical) {
        Node = this.BOARD_ARRAY[node.row + direction][node.col]
      } else {
        Node = this.BOARD_ARRAY[node.row][node.col + direction]
      }

      return Node
    } catch (e) {
      return ""
    }
  }

  getNeighbours(node) {
    let neighbours = []
    let directions = [1, -1, "U", "D"]
    for (let direction in directions) {
      let neighbour
      switch (directions[direction]) {
        case 1:
          neighbour = this.getNeighbourNode(node, +1)
          neighbours.push(neighbour)
          break

        case -1:
          neighbour = this.getNeighbourNode(node, -1)
          neighbours.push(neighbour)
          break

        case "U":
          neighbour = this.getNeighbourNode(node, -1, true)
          neighbours.push(neighbour)
          break

        case "D":
          neighbour = this.getNeighbourNode(node, 1, true)
          neighbours.push(neighbour)
          break
        default:
          break
      }
    }
    return neighbours
  }

  highlightNeighbours(node) {
    let neighbours = this.getNeighbours(node);
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


  // came from 

  // makeQueue() {
  //   return {
  //     list: [],
  //     get: () => {
  //       return this.list.pop()
  //     },
  //     put: (item) => {
  //       this.list.unshift(item)
  //     },
  //     empty: () => {
  //       return this.list.length === 0
  //     }
  //   }
  // }
  delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  getPath(node) {
    return null
  }

  breadthFirstSearch(startNode, endNode, id = false) {
    let node;
    let row;
    let col;
    if (id) {
      node = startNode.split("-")
      row = node[0].substring(1)
      col = node[1].substring(1)
      node = this.BOARD_ARRAY[row][col]
    }
    node = startNode
    let htmlCur = document.querySelector(`#r${node.row}-c${node.col}`)
    htmlCur.classList.add('start')

    this.frontier = [] // queue to keep track of this.frontier nodes
    this.visited = [] // list to keep track of this.visited Nodes 
    this.cameFrom = {} //


    this.frontier.push(node)
    this.cameFrom[node] = null

    while (!this.frontier.length === 0) {
      let current = this.frontier.shift()

      let neighbours = this.getNeighbours(current)
      neighbours.forEach(newNode => {
        setTimeout(() => this.highlightNeighbours(current), 100)
        if (current.row === endNode.row && current.col === endNode.col) {
          let htmlCur = document.querySelector(`#r${current.row}-c${current.col}`)
          setTimeout(() => htmlCur.classList.add('active'), 100)

        }
        if (newNode === "" || typeof newNode === 'undefined') { return }
        if (!this.visited.includes(newNode)) {
          this.frontier.push(newNode)
          this.visited.push(newNode)
          this.cameFrom[newNode] = current
          newNode.previousNode = current
        }
      })

    }


  }
}