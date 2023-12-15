// PlayerNamesPage.js
import React, { useState } from 'react';

const PlayerNamesPage = ({ onSubmit }) => {
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');

  const handleSubmit = () => {
    if (playerOneName.trim() !== '' && playerTwoName.trim() !== '') {
      onSubmit(playerOneName, playerTwoName);
    } else {
      alert('Please enter names for both players.');
    }
  };

  return (
    <div>
      <h2>Enter Player Names</h2>
      <label>Player One: </label>
      <input
        type="text"
        value={playerOneName}
        onChange={(e) => setPlayerOneName(e.target.value)}
      />
      <br />
      <label>Player Two: </label>
      <input
        type="text"
        value={playerTwoName}
        onChange={(e) => setPlayerTwoName(e.target.value)}
      />
      <br />
      <center><button onClick={handleSubmit}>Start Game</button></center>
    </div>
  );
};

export default PlayerNamesPage;
