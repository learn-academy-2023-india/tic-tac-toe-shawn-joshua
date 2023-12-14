// SnakepitGame.js
import React, { useEffect, useState, useCallback } from 'react';
import './SnakepitGame.css';

const SnakepitGame = () => {
  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
    };
  }, []);

  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleKeyPress = useCallback(
    (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
        default:
          break;
      }
    },
    [setDirection]
  );

  const moveSnake = useCallback(() => {
    const newSnake = snake.map((segment) => ({ ...segment }));
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    newSnake.unshift(head);

    // Check if the snake eats the food and update the score
    const ateFood = head.x === food.x && head.y === food.y;

    if (ateFood) {
      setFood(generateFood());
      setScore((prevScore) => prevScore + 1);

      // Increase the snake length by adding a new segment at the tail
      const tail = { ...newSnake[newSnake.length - 1] };
      newSnake.push(tail);
    }

    newSnake.pop();

    setSnake(newSnake);
  }, [direction, snake, food, generateFood, setFood, setScore, setSnake]);

  const checkCollision = useCallback(() => {
    const head = snake[0];

    if (head.x < 0 || head.x >= 10 || head.y < 0 || head.y >= 10) {
      setGameOver(true);
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        setGameOver(true);
        break;
      }
    }
  }, [snake]);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      if (!gameOver) {
        moveSnake();
        checkCollision();
      }
    }, 200);

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameOver, moveSnake, checkCollision, handleKeyPress]);

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const isSnakeSegment = snake.some((segment) => segment.x === col && segment.y === row);
        const isFood = food.x === col && food.y === row;

        grid.push(
          <div
            key={`${row}-${col}`}
            className={`grid-cell ${isSnakeSegment ? 'snake' : ''} ${isFood ? 'food' : ''}`}
          ></div>
        );
      }
    }
    return grid;
  };

  return (
    <div>
      <h2><center>Snakepit Game</center></h2>
      <div className="game-container">
        <div className="game-board">{renderGrid()}</div>
        <div className="game-info">
          <p>Score: {score}</p>
          {gameOver && <p>Game Over!</p>}
        </div>
      </div>
    </div>
  );
};

export default SnakepitGame;
