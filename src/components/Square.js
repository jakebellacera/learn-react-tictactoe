import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Square = ({ value, winner, onClick }) => (
  <button
    className={cn({square: true, winner})}
    onClick={onClick}
  >
    {value}
  </button>
);

Square.propTypes = {
  value: PropTypes.string.isRequired,
  winner: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default React.memo(Square);
