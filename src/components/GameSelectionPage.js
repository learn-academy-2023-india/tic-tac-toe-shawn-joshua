// GameSelectionPage.js
import React from 'react';

const GameSelectionPage = ({ onSelectGame }) => {
  return (
    <div>
      <h2>Choose Your Game</h2>
      <button onClick={() => onSelectGame('ticTacToe')}>Play Tic Tac Toe</button>
      <button onClick={() => onSelectGame('snakepit')}>Play Snakepit</button>
      {/* Add more buttons for additional games as needed */}
    </div>
  );
};

export default GameSelectionPage;
