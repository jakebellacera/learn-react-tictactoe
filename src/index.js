import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const SORT = {
  ASC: "ASC",
  DESC: "DESC"
};

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      sortHistory: SORT.ASC,
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.nextMove();
    this.setState({
      history: history.concat([{
        squares,
        square: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  nextMove() {
    return this.state.xIsNext? 'X' : 'O';
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  // Returns the col / row for a square
  getSquareColRow(i) {
    const col = i % 3;
    const row = Math.ceil(i / 3);
    return [col === 0 ? 3 : col, row];
  }

  handleSortChange(event) {
    this.setState({ sortHistory: event.target.value });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // Display history of moves
    let moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} (${move % 2 !== 0 ? 'X' : 'O'}: ${this.getSquareColRow(step.square + 1).join(',')})` :
        'Go to game start';
      return (
        <li
          key={move}
          className={move === this.state.stepNumber ? 'current' : null}
        >
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    if (this.state.sortHistory === SORT.DESC) {
      moves = moves.reverse();
    }

    // Display the game status
    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = `Next player: ${this.nextMove()}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div className="game-info-sort">
            Sort history: 
            <select
              value={this.state.sortHistory}
              onChange={(event) => this.handleSortChange(event)}
            >
              <option value={SORT.ASC}>ASC</option>
              <option value={SORT.DESC}>DESC</option>
            </select>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// Calculate winner by determining if a line has been created
function calculateWinner(squares) {
  // Possible line permutations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  } 

  return null;
}
