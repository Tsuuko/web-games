import { Board } from './components/Board';
import { GameControls } from './components/GameControls';
import { GameInfo } from './components/GameInfo';
import { useOthelloGame } from './hooks/useOthelloGame';
import './othello.css';

export function OthelloPage() {
  const { gameState, makeMove, passTurn, resetGame, blackCount, whiteCount } =
    useOthelloGame('black');

  const isPlayerTurn =
    gameState.gameStatus === 'playing' &&
    gameState.currentPlayer === gameState.humanPlayer;

  return (
    <div class="page-container">
      <div class="othello-game-container">
        <h1>オセロ</h1>
        <GameInfo
          blackCount={blackCount}
          whiteCount={whiteCount}
          currentPlayer={gameState.currentPlayer}
          humanPlayer={gameState.humanPlayer}
          gameStatus={gameState.gameStatus}
        />
        <Board
          board={gameState.board}
          validMoves={gameState.validMoves}
          onCellClick={makeMove}
          isPlayerTurn={isPlayerTurn}
        />
        <GameControls
          onReset={resetGame}
          gameStatus={gameState.gameStatus}
          mustPass={gameState.mustPass}
          onPass={passTurn}
          gameResult={gameState.gameResult}
        />
      </div>
    </div>
  );
}
