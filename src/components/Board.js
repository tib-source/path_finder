// import Square from "./Square"
import { useEffect } from "react";
const Board = ({ HTML_BOARD_ARRAY, mock }) => {
  const getRowElement = (rowIdx) => {
    const rows = document.querySelectorAll(".row");
    console.log(rows);
    return rows[rowIdx];
  };
  return (
    <>
      <div className="grid">
        {HTML_BOARD_ARRAY.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="row">
              {row.map((col, colIdx) => col)}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Board;
