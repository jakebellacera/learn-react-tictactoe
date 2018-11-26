// Creates an array of integers that count from 0 to n. This is useful for
// iterating n times.
export function count(n) {
  return [...Array(n).keys()];
}

// Determine who plays next depending on who played last
export function determineNextPlayer(previousPlayer) {
  return previousPlayer === 'X' ? 'O' : 'X';
}

// Determine if an array of squares has a winning line
export function calculateWinner(squares) {
  // Possible line permutations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
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
