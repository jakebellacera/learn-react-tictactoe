import React from 'react';
import PropTypes from 'prop-types';
import { SORT_ORDERS } from "../lib/constants";
import cn from 'classnames';

const HistoryList = ({moves, currentStep, onMoveChange, sortOrder}) => {
  let HistoryList = moves.map((step, move) => {
    const desc = move ?
      `Go to move #${move} (${step.squares[step.square]}: ${getSquareColRow(step.square + 1).join(',')})` :
      'Go to game start';

    return (
      <li
        key={move}
        className={cn({ current: move === currentStep })}
      >
        <button onClick={() => onMoveChange(move)}>
          {desc}
        </button>
      </li>
    );
  });

  if (sortOrder === SORT_ORDERS.DESC) {
    HistoryList = HistoryList.reverse();
  }

  return (
    <ol className="history-moves">
      {HistoryList}
    </ol>
  );
};

HistoryList.propTypes = {
  moves: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentStep: PropTypes.number.isRequired,
  onMoveChange: PropTypes.func,
  sortOrder: PropTypes.oneOf(Object.values(SORT_ORDERS)).isRequired
};

const getSquareColRow = (i) => {
  const col = i % 3;
  const row = Math.ceil(i / 3);
  return [col === 0 ? 3 : col, row];
};

export default HistoryList;
