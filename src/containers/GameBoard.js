import { connect } from 'react-redux'
import { calculateWinner } from '../lib/helpers';
import { playMove } from '../actions';
import Board from '../components/Board';

const mapStateToProps = state => ({
  move: state.board.moves[state.board.currentMove],
  currentMove: state.board.currentMove,
  winningLine: calculateWinner(state.board.moves[state.board.currentMove].squares).line
});

const mapDispatchToProps = dispatch => ({
  onSquareClick: (square, index) => dispatch(playMove(square, index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
