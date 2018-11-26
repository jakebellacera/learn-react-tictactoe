import { connect } from 'react-redux'
import { setHistorySortOrder, HISTORY_SORT_ORDERS } from '../actions'
import History from '../components/History'

const sortMoves = (moves, order) => {
  switch (order) {
    case HISTORY_SORT_ORDERS.ASC:
      return moves.map((move, i) => ({ move, i }));
    case HISTORY_SORT_ORDERS.DESC:
      return moves.map((move, i) => ({ move, i })).reverse();
    default:
      throw new Error(`Unknown order: ${order}`);
  }
};

const mapStateToProps = state => ({
  moves: sortMoves(state.board.moves, state.historySortOrder),
  currentMove: state.board.currentMove,
  sortOrder: state.historySortOrder
});

const mapDispatchToProps = dispatch => ({
  changeOrder: order => dispatch(setHistorySortOrder(order))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
