import React from 'react';
import PropTypes from 'prop-types';
import { SORT_ORDERS } from "../lib/constants";
import MoveList from "./History/MoveList";

const History = ({moves, currentStep, sortOrder, onSortOrderChange, onMoveChange}) => (
  <div className="history">
    <div className="history-sort">
      Sort history: 
      <select
        value={sortOrder}
        onChange={(event) => onSortOrderChange(event.target.value)}
      >
        <option value={SORT_ORDERS.ASC}>ASC</option>
        <option value={SORT_ORDERS.DESC}>DESC</option>
      </select>
    </div>
    <MoveList
      moves={moves}
      sortOrder={sortOrder}
      currentStep={currentStep}
      onMoveChange={onMoveChange}
    /> 
  </div>
);

History.propTypes = {
  moves: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentStep: PropTypes.number.isRequired,
  sortOrder: PropTypes.oneOf(Object.values(SORT_ORDERS)).isRequired,
  onSortOrderChange: PropTypes.func,
  onMoveChange: PropTypes.func
};

export default History;
