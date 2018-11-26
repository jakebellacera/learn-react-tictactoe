import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

class Board extends React.PureComponent {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        winner={this.props.winningLine.includes(i)}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRow(row) {
    const cols = [...Array(3).keys()];
    return (
      <div key={row} className="board-row">
        {cols.map((col) => this.renderSquare((row * cols.length) + col))}
      </div>
    );
  }

  render() {
    const rows = [...Array(this.props.squares.length / 3).keys()];
    return (
      <div>
        {rows.map((row) => this.renderRow(row))}
      </div>
    );
  }
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  winningLine: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Board;
