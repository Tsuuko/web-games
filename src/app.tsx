import { useOthelloGame } from './hooks/useOthelloGame'
import { Board } from './components/Board'
import { GameInfo } from './components/GameInfo'
import { GameControls } from './components/GameControls'
import './app.css'

export function App() {
  const { gameState, makeMove, passTurn, resetGame, blackCount, whiteCount } =
    useOthelloGame('black')

  const isPlayerTurn =
    gameState.gameStatus === 'playing' &&
    gameState.currentPlayer === gameState.humanPlayer

  return (
    <div class="game-container">
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
  )
}
