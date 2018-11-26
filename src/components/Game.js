import React from 'react';
import Board from './Board';
import History from './History';

class Game extends React.PureComponent {
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

export default Game;
