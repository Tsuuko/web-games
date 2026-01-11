import type { Board, PieceColor } from './types'

// 初期ボード作成
export function createInitialBoard(): Board {
  const board: Board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null))

  // 中央に初期石を配置
  board[3][3] = 'white'
  board[3][4] = 'black'
  board[4][3] = 'black'
  board[4][4] = 'white'

  return board
}

// ボードのディープコピー
export function copyBoard(board: Board): Board {
  return board.map((row) => [...row])
}

// 石の数をカウント
export function countPieces(board: Board, color: PieceColor): number {
  let count = 0
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === color) {
        count++
      }
    }
  }
  return count
}

// ボード上の全ての石の数をカウント
export function countAllPieces(board: Board): { black: number; white: number } {
  return {
    black: countPieces(board, 'black'),
    white: countPieces(board, 'white'),
  }
}
