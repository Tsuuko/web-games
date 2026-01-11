import type { CellState } from '../game/types'
import type { Move } from '../game/types'

interface CellProps {
  row: number
  col: number
  piece: CellState
  isValidMove: boolean
  onClick: (row: number, col: number) => void
  isClickable: boolean
}

export function Cell({
  row,
  col,
  piece,
  isValidMove,
  onClick,
  isClickable,
}: CellProps) {
  const handleClick = () => {
    if (isClickable) {
      onClick(row, col)
    }
  }

  return (
    <div
      className={`cell ${isValidMove ? 'valid-move' : ''} ${
        isClickable && isValidMove ? 'clickable' : ''
      }`}
      onClick={handleClick}
    >
      {piece && <div className={`piece ${piece}`} />}
      {isValidMove && isClickable && <div className="valid-indicator" />}
    </div>
  )
}
