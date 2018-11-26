import React from 'react';
import GameBoard from '../containers/GameBoard';
import GameStatus from '../containers/GameStatus';
import OrderedHistory from '../containers/OrderedHistory';

const Game = () => (
  <div className="game">
    <GameBoard />
    <div className="game-info">
      <GameStatus />
      <OrderedHistory />
    </div>
  </div>
);

export default Game;
