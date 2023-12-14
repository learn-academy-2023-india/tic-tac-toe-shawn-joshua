// App.js
import React, { useState } from 'react';
import Square from './components/Square';
import PlayerNamesPage from './components/PlayerNamesPage';
import GameSelectionPage from './components/GameSelectionPage'; // Import the GameSelectionPage
import Header from './components/Header';
import ReactPlayer from 'react-player';
import SnakepitGame from './components/SnakepitGame'; // Import the SnakepitGame
import './App.css';

const App = () => {
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [namesSubmitted, setNamesSubmitted] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleNamesSubmit = (name1, name2) => {
    setPlayerOneName(name1);
    setPlayerTwoName(name2);
    setNamesSubmitted(true);
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setNamesSubmitted(false); // Reset namesSubmitted when a new game is selected
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (winner || squares[index]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? playerOneName : playerTwoName;
    setSquares(newSquares);

    const gameWinner = calculateWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const renderSquare = (index) => {
    return <Square value={squares[index]} onClick={() => handleClick(index)} />;
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setNamesSubmitted(false);
    setSelectedGame('');
  };

  return (
    <div className="App">
    <Header />
      {!selectedGame ? ( // Render GameSelectionPage if no game is selected
        <GameSelectionPage onSelectGame={handleGameSelect} />
      ) : !namesSubmitted ? ( // Render PlayerNamesPage if names are not submitted
        <PlayerNamesPage onSubmit={handleNamesSubmit} />
      ) : (
        // Render the selected game
        <>
          {selectedGame === 'ticTacToe' ? ( // Check the selected game
            <div>
              <center><h1>Tic Tac Toe</h1></center>
              <div className="status">
                <center>
                  {winner
                    ? `Congratulations, ${winner === playerOneName ? playerOneName : playerTwoName} wins!`
                    : `Next player: ${xIsNext ? playerOneName : playerTwoName}`}
                </center>
              </div>
              <div className="board">
                <div className="board-row">
                  {renderSquare(0)}
                  {renderSquare(1)}
                  {renderSquare(2)}
                </div>
                <div className="board-row">
                  {renderSquare(3)}
                  {renderSquare(4)}
                  {renderSquare(5)}
                </div>
                <div className="board-row">
                  {renderSquare(6)}
                  {renderSquare(7)}
                  {renderSquare(8)}
                </div>
              </div>
              {winner && (
                <>
                  <ReactPlayer url="https://www.youtube.com/embed/dQw4w9WgXcQ" controls />
                  <button onClick={resetGame}>Play Again</button>
                </>
              )}
            </div>
          ) : selectedGame === 'snakepit' ? ( // Check if the selected game is Snakepit
            <SnakepitGame />
          ) : null}
        </>
      )}
    </div>
  );
};

export default App;
