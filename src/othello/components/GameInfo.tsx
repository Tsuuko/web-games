import type { PieceColor, GameStatus } from '../game/types'

interface GameInfoProps {
  blackCount: number
  whiteCount: number
  currentPlayer: PieceColor
  humanPlayer: PieceColor
  gameStatus: GameStatus
}

export function GameInfo({
  blackCount,
  whiteCount,
  currentPlayer,
  humanPlayer,
  gameStatus,
}: GameInfoProps) {
  const isBlackTurn = currentPlayer === 'black'
  const isHumanTurn = currentPlayer === humanPlayer

  return (
    <div class="othello-game-info">
      <div class={`othello-player-info ${isBlackTurn ? 'active' : ''}`}>
        <div class="othello-player-name">
          黒 {humanPlayer === 'black' ? '(あなた)' : '(AI)'}
        </div>
        <div class="othello-score">{blackCount}</div>
      </div>

      <div class={`othello-player-info ${!isBlackTurn ? 'active' : ''}`}>
        <div class="othello-player-name">
          白 {humanPlayer === 'white' ? '(あなた)' : '(AI)'}
        </div>
        <div class="othello-score">{whiteCount}</div>
      </div>

      {gameStatus === 'playing' && (
        <div class="othello-turn-info">
          {isHumanTurn ? 'あなたのターン' : 'AIのターン'}
        </div>
      )}
    </div>
  )
}
