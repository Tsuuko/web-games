import type { Board, PieceColor, Move, Direction, GameResult } from './types';
import { BOARD_SIZE } from './board';

// 8方向の定義
export const DIRECTIONS: Direction[] = [
  { row: -1, col: -1 }, // 左上
  { row: -1, col: 0 }, // 上
  { row: -1, col: 1 }, // 右上
  { row: 0, col: -1 }, // 左
  { row: 0, col: 1 }, // 右
  { row: 1, col: -1 }, // 左下
  { row: 1, col: 0 }, // 下
  { row: 1, col: 1 }, // 右下
];

// 位置がボード内かチェック
export function isValidPosition(row: number, col: number): boolean {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

// 指定方向に反転できる石を取得
export function getFlippablePiecesInDirection(
  board: Board,
  row: number,
  col: number,
  color: PieceColor,
  direction: Direction,
): Move[] {
  const flippable: Move[] = [];
  const opponent: PieceColor = color === 'black' ? 'white' : 'black';

  let currentRow = row + direction.row;
  let currentCol = col + direction.col;

  // 相手の石を連続して探す
  while (
    isValidPosition(currentRow, currentCol) &&
    board[currentRow][currentCol] === opponent
  ) {
    flippable.push({ row: currentRow, col: currentCol });
    currentRow += direction.row;
    currentCol += direction.col;
  }

  // 最後に自分の石がある場合のみ反転可能
  if (
    isValidPosition(currentRow, currentCol) &&
    board[currentRow][currentCol] === color &&
    flippable.length > 0
  ) {
    return flippable;
  }

  return [];
}

// ある位置に置いた場合に反転される全ての石を取得
export function getFlippablePieces(
  board: Board,
  row: number,
  col: number,
  color: PieceColor,
): Move[] {
  const flippable: Move[] = [];

  for (const direction of DIRECTIONS) {
    const inDirection = getFlippablePiecesInDirection(
      board,
      row,
      col,
      color,
      direction,
    );
    flippable.push(...inDirection);
  }

  return flippable;
}

// 合法手かどうか判定
export function isValidMove(
  board: Board,
  row: number,
  col: number,
  color: PieceColor,
): boolean {
  // 既に石がある場合は置けない
  if (board[row][col] !== null) {
    return false;
  }

  // 少なくとも1つの方向で石が反転できるか
  const flippable = getFlippablePieces(board, row, col, color);
  return flippable.length > 0;
}

// 全ての合法手を取得
export function getValidMoves(board: Board, color: PieceColor): Move[] {
  const validMoves: Move[] = [];

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isValidMove(board, row, col, color)) {
        validMoves.push({ row, col });
      }
    }
  }

  return validMoves;
}

// 石を配置して反転処理を実行
export function placePiece(
  board: Board,
  row: number,
  col: number,
  color: PieceColor,
): Board {
  // ボードをコピー
  const newBoard = board.map((r) => [...r]);

  // 新しい石を配置
  newBoard[row][col] = color;

  // 反転する石を全て変更
  const flippable = getFlippablePieces(board, row, col, color);
  for (const { row: r, col: c } of flippable) {
    newBoard[r][c] = color;
  }

  return newBoard;
}

// ゲーム終了判定
export function isGameOver(board: Board): boolean {
  const blackMoves = getValidMoves(board, 'black');
  const whiteMoves = getValidMoves(board, 'white');

  return blackMoves.length === 0 && whiteMoves.length === 0;
}

// 勝者を判定
export function determineWinner(board: Board): GameResult {
  let blackCount = 0;
  let whiteCount = 0;

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 'black') {
        blackCount++;
      } else if (board[row][col] === 'white') {
        whiteCount++;
      }
    }
  }

  if (blackCount > whiteCount) {
    return 'black';
  } else if (whiteCount > blackCount) {
    return 'white';
  } else {
    return 'draw';
  }
}
