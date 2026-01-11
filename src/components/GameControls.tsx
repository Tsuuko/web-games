import type { GameStatus, GameResult } from '../game/types'

interface GameControlsProps {
  onReset: () => void
  gameStatus: GameStatus
  mustPass: boolean
  onPass: () => void
  gameResult: GameResult
}

export function GameControls({
  onReset,
  gameStatus,
  mustPass,
  onPass,
  gameResult,
}: GameControlsProps) {
  const getResultMessage = () => {
    if (gameResult === 'black') return '黒の勝ち！'
    if (gameResult === 'white') return '白の勝ち！'
    if (gameResult === 'draw') return '引き分け！'
    return ''
  }

  return (
    <div className="game-controls">
      {mustPass && gameStatus === 'playing' && (
        <div className="message pass">
          <div>相手に置ける場所がありません。パスします。</div>
          <button onClick={onPass} className="pass-button">
            パスする
          </button>
        </div>
      )}

      {gameStatus === 'finished' && (
        <div className="message game-over">
          <div className="result-text">{getResultMessage()}</div>
        </div>
      )}

      <button onClick={onReset} className="reset-button">
        新しいゲーム
      </button>
    </div>
  )
}
