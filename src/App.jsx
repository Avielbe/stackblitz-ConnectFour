import React, { useState } from 'react';
import './style.css';

function BoardGame({ currentPlayer, setCurrentPlayer, board, setBoard, rows }) {
  
  const handleClick = (col) => {
    let newBoard = [...board];
    for (let row = rows - 1; row >= 0; row--) {
      if (board[row][col] === 'empty') {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        if (checkForWin(newBoard) === currentPlayer) {
          alert(`${currentPlayer} wins!`);
        }
        setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
        break;
      }
    }
  };

  
  return (
    <div>
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <Cell key={j} color={cell} onClick={() => handleClick(j)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Cell({color, onClick}) {
  return (
    <div className={`cell ${color}`} onClick={onClick}></div>
  );
};

function Player ({color}){
  return(
    <div className={`player ${color}`}> {color}</div>
  )
};


function GameInfo({ onUndo, onRestart }) {
  return (
    <div>
      <h1>Connect Four</h1>
      <button onClick={onUndo}>Undo</button>
      <button onClick={onRestart}>Restart</button>
      
      <div className="player red">Red Player Wins: 0</div>
      <div className="player yellow">Yellow Player Wins: 0</div>

    </div>
  );
}

function GameStatus({currentPlayer, winner}){
  return(
    <div className={`status-square ${currentPlayer}`}>
      <h3>Current Turn: <Player color={currentPlayer} /></h3>
      {winner && <h3>Winner: <Player color={winner} /></h3>}

    </div>
  )
};
function checkForWin(board) {
  const rows = board.length;
  const cols = board[0].length;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, 1], [-1, 1], [1, -1]];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] !== 'empty') {
        for (let [dx, dy] of directions) {
          let i;
          for (i = 0; i < 4; i++) {
            let x = row + i * dx;
            let y = col + i * dy;
            if (x < 0 || y < 0 || x >= rows || y >= cols || board[x][y] !== board[row][col]) {
              break;
            }
          }
          if (i === 4) {
            return board[row][col];
          }
        }
      }
    }
  }
  return null;
}

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [winner, setWinner] = useState(null);
  const rows = 6;
  const cols = 7;
  const emptyBoard = Array(rows).fill().map(() => Array(cols).fill('empty'));
  const [board, setBoard] = useState(emptyBoard);

  const handleRestart = () => {
    // TODO: Implement restart game logic
    setBoard(emptyBoard);
    setCurrentPlayer('red');
  };

  const handleUndo = () => {
    // TODO: Implement undo move logic
  };

  return (
    <div className="App">
    <GameInfo currentPlayer={currentPlayer} onRestart={handleRestart} onUndo={handleUndo} />
    <BoardGame currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} board={board} setBoard={setBoard} rows={rows} setWinner={setWinner} />
    <GameStatus currentPlayer={currentPlayer} winner={winner} />
  </div>
  );
}
