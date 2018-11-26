import React from 'react';
import PropTypes from 'prop-types';
import { SORT_ORDERS } from "../lib/constants";
import cn from 'classnames';

class History extends React.PureComponent {
  // Returns the col / row for a square
  getSquareColRow(i) {
    const col = i % 3;
    const row = Math.ceil(i / 3);
    return [col === 0 ? 3 : col, row];
  }

  render() {
    let moves = this.props.moves.map((step, move) => {
      const desc = move ?
        `Go to move #${move} (${move % 2 !== 0 ? 'X' : 'O'}: ${this.getSquareColRow(step.square + 1).join(',')})` :
        'Go to game start';

      const classNames = cn({
        current: move === this.props.currentStep
      });

      return (
        <li
          key={move}
          className={classNames}
        >
          <button onClick={() => this.props.onMoveChange(move)}>{desc}</button>
        </li>
      );
    });

    if (this.props.sortOrder === SORT_ORDERS.DESC) {
      moves = moves.reverse();
    }

    return (
      <div className="history">
        <div className="history-sort">
          Sort history: 
          <select
            value={this.props.sortOrder}
            onChange={(event) => this.props.onSortOrderChange(event.target.value)}
          >
            <option value={SORT_ORDERS.ASC}>ASC</option>
            <option value={SORT_ORDERS.DESC}>DESC</option>
          </select>
        </div>
        <ol className="history-moves">{moves}</ol>
      </div>
    );
  }
}

History.propTypes = {
  currentStep: PropTypes.number.isRequired,
  moves: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortOrder: PropTypes.oneOf(Object.values(SORT_ORDERS)).isRequired,
  onSortOrderChange: PropTypes.func,
  onMoveChange: PropTypes.func
};

export default History;
