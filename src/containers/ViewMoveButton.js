import React from 'react'
import { connect } from 'react-redux'
import { viewMove } from '../actions'

const ViewMoveButton = ({ move, index, dispatch }) => {
  const label = index ?
    `Go to move #${index} (${move.squares[move.square]}: ${getSquareColRow(move.square + 1).join(',')})` :
    'Go to game start';
  
  return (
    <button onClick={e => dispatch(viewMove(index))}>
      {label}
    </button>
  )
};

const getSquareColRow = (i) => {
  const col = i % 3;
  const row = Math.ceil(i / 3);
  return [col === 0 ? 3 : col, row];
};

export default connect()(ViewMoveButton);
