import type { Board, Tetromino } from './types'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20

// 衝突判定
export function checkCollision(board: Board, piece: Tetromino): boolean {
  const { shape, position } = piece

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (shape[y][x]) {
        const boardX = position.x + x
        const boardY = position.y + y

        // 壁または床との衝突
        if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
          return true
        }

        // 他のブロックとの衝突
        if (boardY >= 0 && board[boardY][boardX] !== null) {
          return true
        }
      }
    }
  }

  return false
}

// 有効な位置かチェック
export function isValidPosition(x: number, y: number): boolean {
  return x >= 0 && x < BOARD_WIDTH && y < BOARD_HEIGHT
}
