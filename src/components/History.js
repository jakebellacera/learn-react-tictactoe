import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class History extends React.PureComponent {
  constructor(props) {
    super(props);

    // set class constant to symbolize possible sort orders
    this.SORT = {
      ASC: "ASC",
      DESC: "DESC"
    };

    this.state = {
      sortOrder: this.SORT.ASC
    }
  }

  // Returns the col / row for a square
  getSquareColRow(i) {
    const col = i % 3;
    const row = Math.ceil(i / 3);
    return [col === 0 ? 3 : col, row];
  }

  handleSortChange(event) {
    this.setState({ sortOrder: event.target.value });
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
          <button onClick={() => this.props.onHistoryChange(move)}>{desc}</button>
        </li>
      );
    });

    if (this.state.sortOrder === this.SORT.DESC) {
      moves = moves.reverse();
    }

    return (
      <div className="history">
        <div className="history-sort">
          Sort history: 
          <select
            value={this.state.sortHistory}
            onChange={(event) => this.handleSortChange(event)}
          >
            <option value={this.SORT.ASC}>ASC</option>
            <option value={this.SORT.DESC}>DESC</option>
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
  onHistoryChange: PropTypes.func.isRequired
};

export default History;
