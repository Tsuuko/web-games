import { Cell } from './Cell'
import type { Board, Move } from '../game/types'

interface BoardProps {
  board: Board
  validMoves: Move[]
  onCellClick: (row: number, col: number) => void
  isPlayerTurn: boolean
}

export function Board({
  board,
  validMoves,
  onCellClick,
  isPlayerTurn,
}: BoardProps) {
  // 合法手のセットを高速参照用に作成
  const validMoveSet = new Set(
    validMoves.map((m) => `${m.row},${m.col}`)
  )

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isValidMove = validMoveSet.has(`${rowIndex},${colIndex}`)
          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              piece={cell}
              isValidMove={isValidMove}
              onClick={onCellClick}
              isClickable={isPlayerTurn}
            />
          )
        })
      )}
    </div>
  )
}
