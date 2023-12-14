// GameSelectionPage.js
// import React, { useState } from 'react';

// const GameSelectionPage = ({ onSelectGame }) => {
//   const [selectedGame, setSelectedGame] = useState('');

//   const handleGameSelect = () => {
//     if (selectedGame === 'ticTacToe') {
//       onSelectGame('ticTacToe');
//     }
//     // Add more games as needed

//     // If you add more games, you can handle them similarly, e.g., onSelectGame('anotherGame');
//   };

//   return (
//     <div>
//       <h1>Choose a Game</h1>
//       <div>
//         <label>
//           <input
//             type="radio"
//             value="ticTacToe"
//             checked={selectedGame === 'ticTacToe'}
//             onChange={() => setSelectedGame('ticTacToe')}
//           />
//           Tic Tac Toe
//         </label>
//         {/* Add more game options as needed */}
//       </div>
//       <button onClick={handleGameSelect}>Start Game</button>
//     </div>
//   );
// };

// export default GameSelectionPage;

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
