import reducer from './board';

describe('boards reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      moves: [{
        squares: Array(9).fill(null),
        square: null
      }],
      currentMove: 0
    });
  });

  it('should handle PLAY_MOVE', () => {
    // Playing a move appends it to the end
    expect(
      reducer(undefined, {
        type: 'PLAY_MOVE',
        square: 1,
        index: 1
      })
    ).toEqual({
      moves: [
        {
          squares: Array(9).fill(null),
          square: null
        },
        {
          squares: Object.assign([...Array(9).fill(null)], {1: 'X'}),
          square: 1
        }
      ],
      currentMove: 1
    });

    // Playing a move at a previous index removes moves after it
    expect(
      reducer({
        moves: [
          {
            squares: Array(9).fill(null),
            square: null
          },
          {
            squares: Object.assign([...Array(9).fill(null)], {1: 'X'}),
            square: 1
          },
          {
            squares: Object.assign([...Array(9).fill(null)], {2: '0'}),
            square: 2
          }
        ]
      }, {
        type: 'PLAY_MOVE',
        square: 3,
        index: 1
      })
    ).toEqual({
      moves: [
        {
          squares: Array(9).fill(null),
          square: null
        },
        {
          squares: Object.assign([...Array(9).fill(null)], {3: 'X'}),
          square: 3
        }
      ],
      currentMove: 1
    });
  });

  it('should handle VIEW_MOVE', () => {
    // Only the currentMove index should change
    expect(
      reducer({
        moves: [
          {
            squares: Array(9).fill(null),
            square: null
          },
          {
            squares: Object.assign([...Array(9).fill(null)], {1: 'X'}),
            square: 1
          }
        ],
        currentMove: 2
      }, {
        type: 'VIEW_MOVE',
        index: 1
      })
    ).toEqual({
      moves: [
        {
          squares: Array(9).fill(null),
          square: null
        },
        {
          squares: Object.assign([...Array(9).fill(null)], {1: 'X'}),
          square: 1
        }
      ],
      currentMove: 1
    });
  });
});
