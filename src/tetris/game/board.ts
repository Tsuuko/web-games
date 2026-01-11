import type { Board, CellColor, Tetromino } from './types'
import { checkCollision } from './collision'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20

// 空のボードを作成
export function createInitialBoard(): Board {
  return Array(BOARD_HEIGHT)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(null))
}

// ピースをボードに固定
export function lockPiece(board: Board, piece: Tetromino): Board {
  const newBoard = board.map((row) => [...row])
  const { shape, position, type } = piece

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (shape[y][x]) {
        const boardY = position.y + y
        const boardX = position.x + x
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = type
        }
      }
    }
  }

  return newBoard
}

// ラインを消去
export function clearLines(board: Board): { newBoard: Board; clearedLines: number } {
  const newBoard: Board = []
  let clearedLines = 0

  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (board[y].every((cell) => cell !== null)) {
      clearedLines++
    } else {
      newBoard.unshift(board[y])
    }
  }

  // 消去したラインの数だけ空の行を追加
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null))
  }

  return { newBoard, clearedLines }
}

// ゴーストピースの位置を計算
export function getGhostPosition(board: Board, piece: Tetromino): { x: number; y: number } {
  let ghostY = piece.position.y

  while (
    !checkCollision(board, { ...piece, position: { x: piece.position.x, y: ghostY + 1 } })
  ) {
    ghostY++
  }

  return { x: piece.position.x, y: ghostY }
}

// ピースが見えるかチェック
export function isPieceVisible(piece: Tetromino): boolean {
  return piece.position.y < 20
}
