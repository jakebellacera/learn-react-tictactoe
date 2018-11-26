import React from 'react';
import PropTypes from 'prop-types';
import { HISTORY_SORT_ORDERS as SORT_ORDERS } from '../actions';
import ViewMoveButton from '../containers/ViewMoveButton';
import cn from 'classnames';

const History = ({moves, currentMove, sortOrder, changeOrder}) => (
  <div className="history">
    <div className="history-sort">
      Sort history: 
      <select
        value={sortOrder}
        onChange={(event) => changeOrder(event.target.value)}
      >
        <option value={SORT_ORDERS.ASC}>ASC</option>
        <option value={SORT_ORDERS.DESC}>DESC</option>
      </select>
    </div>
    <ol className="history-moves">
      {moves.map(({ move, i }) => (
        <li key={i} className={cn({ current: i === currentMove })}>
          <ViewMoveButton move={move} index={i} />
        </li>
      ))}
    </ol>
  </div>
);

History.propTypes = {
  moves: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentMove: PropTypes.number.isRequired,
  sortOrder: PropTypes.oneOf(Object.values(SORT_ORDERS)).isRequired,
  changeOrder: PropTypes.func.isRequired
};

export default History;
