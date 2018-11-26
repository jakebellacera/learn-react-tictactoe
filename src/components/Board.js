import React from 'react';
import PropTypes from 'prop-types';
import { count } from '../lib/helpers';
import Square from './Square';

const NUM_ROWS = 3;
const NUM_COLS = 3;

const Board = ({move, currentMove, winningLine, onSquareClick}) => (
  <div className="game-board">
    {count(NUM_ROWS).map((row) => (
      <div key={row} className="board-row">
        {count(NUM_COLS).map(col => {
          const square = (row * NUM_COLS) + col;

          return (
            <Square
              key={square}
              value={move.squares[square]}
              winner={winningLine.includes(square)}
              onClick={(winningLine.length || move.squares[square]) ? null : (() => onSquareClick(square, currentMove + 1))}
            />
          );
        })}
      </div>
    ))}
  </div>
);

Board.propTypes = {
  move: PropTypes.object.isRequired,
  currentMove: PropTypes.number.isRequired,
  winningLine: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSquareClick: PropTypes.func.isRequired
};

export default Board;
