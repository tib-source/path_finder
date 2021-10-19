import React from "react";

const Square = ({ col, row, Board, highlightNeighbours }) => {
  return (
    <div onClick={() => highlightNeighbours(Board[row][col])} className="box"></div>
  )
}

export default Square
