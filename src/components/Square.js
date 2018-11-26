import React from 'react';
import cn from 'classnames';

const Square = ({ winner, value, onClick }) => (
  <button
    className={cn({square: true, winner})}
    onClick={onClick}
  >
    {value}
  </button>
);

export default React.memo(Square);
