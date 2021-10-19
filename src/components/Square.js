import React from "react";

const Square = ({ col, row }) => {
  return (
    <div className="box"><small>{row}-{col}</small></div>
  )
}

export default Square
