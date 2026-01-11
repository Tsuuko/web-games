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
    <div className="game-info">
      <div className={`player-info ${isBlackTurn ? 'active' : ''}`}>
        <div className="player-name">
          黒 {humanPlayer === 'black' ? '(あなた)' : '(AI)'}
        </div>
        <div className="score">{blackCount}</div>
      </div>

      <div className={`player-info ${!isBlackTurn ? 'active' : ''}`}>
        <div className="player-name">
          白 {humanPlayer === 'white' ? '(あなた)' : '(AI)'}
        </div>
        <div className="score">{whiteCount}</div>
      </div>

      {gameStatus === 'playing' && (
        <div className="turn-info">
          {isHumanTurn ? 'あなたのターン' : 'AIのターン'}
        </div>
      )}
    </div>
  )
}
