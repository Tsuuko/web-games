import type { Tetromino } from '../game/types'
import { TETROMINO_COLORS } from '../game/tetrominoes'

interface HoldPieceProps {
  piece: Tetromino | null
  canHold: boolean
  onHold: () => void
}

export function HoldPiece({ piece, canHold, onHold }: HoldPieceProps) {
  return (
    <div class="tetris-preview">
      <h3>ホールド</h3>
      <div
        class="tetris-preview-grid"
        style={{ cursor: canHold && piece ? 'pointer' : 'default', opacity: canHold ? 1 : 0.5 }}
        onClick={canHold ? onHold : undefined}
      >
        {piece ? (
          piece.shape.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                class="tetris-preview-cell"
                style={cell ? `background: ${piece.color};` : ''}
              />
            ))
          )
        ) : (
          <div class="tetris-preview-empty">なし</div>
        )}
      </div>
    </div>
  )
}
