import React from 'react';
import { connect } from 'react-redux'
import { calculateWinner, determineNextPlayer } from '../lib/helpers';

const GameStatus = ({currentMove}) => {
  let {winner} = calculateWinner(currentMove.squares);
  let status;

  if (winner) {
    status = 'Winner: ' + winner;
  } else if (canMove(currentMove)) {
    status = `Next player: ${canMove(currentMove)}`;
  } else {
    status = 'Draw! No more moves.';
  }

  return (
    <div>{status}</div>
  )
}

const canMove = (move) => {
  const canMove = move.squares.includes(null);
  return canMove ? determineNextPlayer(move.squares[move.square]) : false;
}

const mapStateToProps = state => ({
  currentMove: state.board.moves[state.board.currentMove],
});

export default connect(mapStateToProps)(GameStatus);
