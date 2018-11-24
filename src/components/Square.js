import React from 'react';
import cn from 'classnames';

export default function Square(props) {
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
