import React from 'react';
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

export default Board;
