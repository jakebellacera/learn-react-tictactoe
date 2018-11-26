const initialState = {
  moves: [{
    squares: Array(9).fill(null),
    square: null
  }],
  currentMove: 0
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAY_MOVE':
      return {
        ...state,
        moves: [
          ...state.moves.slice(0, action.index < 1 ? 1 : action.index),
          {
            squares: Object.assign(
              state.moves.slice(0, action.index < 1 ? 1 : action.index).slice(-1)[0].squares.slice(0, 9),
              {[action.square]: action.index % 2 !== 0 ? 'X' : 'O'}
            ),
            square: action.square
          }
        ],
        currentMove: action.index < 1 ? 1 : action.index
      };
    case 'VIEW_MOVE':
      return {
        ...state,
        currentMove: action.index
      }
    default:
      return state;
  }
};

export default board;
