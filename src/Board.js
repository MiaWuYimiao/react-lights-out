import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for( var i = 0; i<nrows; i++) {
      initialBoard[i] = [];
      for( var j = 0; j<ncols; j++) {
        initialBoard[i][j] = Math.random() < chanceLightStartsOn;
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // return board.every(row => row.every(cell => !cell))
    for (var i = 0; i < nrows; i++) {
      for (var j = 0; j < ncols; j++) {
        if(board[i][j]) return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      // const boardCopy = oldBoard.map(row => [...row]);
      var boardCopy = [];
      for (var i = 0; i < nrows; i++) {
        boardCopy[i] = oldBoard[i].slice();
      }

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y-1, x, boardCopy);
      flipCell(y+1, x, boardCopy);
      flipCell(y, x-1, boardCopy);
      flipCell(y, x+1, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if(hasWon()) {
    return (
      <div>
        You win!
      </div>
    )
  }

  // make table board
  return (
    <div className="Board">
      <h1>{nrows}x{ncols} LightsOut</h1>
      <table>
        <tbody>
        {board.map( (rows, indexr) => {
            return (
              <tr key={indexr}>
                {rows.map( (cell, indexc) => {
                  let coord = `${indexr}-${indexc}`;
                  return (
                    <Cell key={coord} flipCellsAroundMe={() => flipCellsAround(coord)} isLit={cell} />
                  )})
                }
              </tr>
            )
          }
        )}
        </tbody>
      </table>
      <button onClick={createBoard}>New Game</button>
    </div>
);
}

export default Board;
