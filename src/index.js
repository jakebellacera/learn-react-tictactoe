import React from 'react';
import ReactDOM from 'react-dom';
import cn from "classnames";
import './index.css';

function Square(props) {
  const classNames = cn({
    square: true,
    winner: props.winner
  });

  return (
    <button
      className={classNames}
      onClick={props.onClick}
    >
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

class History extends React.Component {
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
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
    const canMove = this.state.history[this.state.stepNumber].squares.includes(null);
    return canMove ? this.state.xIsNext? 'X' : 'O' : false;
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);

    // Display the game status
    let status;

    if (result.winner) {
      status = 'Winner: ' + result.winner;
    } else if (this.nextMove()) {
      status = `Next player: ${this.nextMove()}`;
    } else {
      status = 'Draw! No more moves.';
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningLine={result.line}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <History
            moves={history}
            currentStep={this.state.stepNumber}
            onHistoryChange={(move) => this.jumpTo(move)}
          />
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

  let line = [];
  let winner = false;

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = squares[a];
      line = lines[i];
    }
  } 

  return {
    winner,
    line
  };
}
