import type { Board, Tetromino } from './types';

import { checkCollision } from './collision';
import { rotateTetromino } from './tetrominoes';

// 壁蹴り（キック）テーブル
const WALL_KICKS = [
  { x: 0, y: 0 }, // 通常の回転
  { x: -1, y: 0 }, // 左にキック
  { x: 1, y: 0 }, // 右にキック
  { x: 0, y: -1 }, // 上にキック
  { x: -1, y: -1 }, // 左上にキック
  { x: 1, y: -1 }, // 右上にキック
  { x: -2, y: 0 }, // 左に2マスキック
  { x: 2, y: 0 }, // 右に2マスキック
];

// 回転を実行（壁蹴りあり）
export function rotateWithKicks(
  board: Board,
  piece: Tetromino,
): Tetromino | null {
  const rotated = rotateTetromino(piece);

  // まずは通常の回転を試す
  if (!checkCollision(board, rotated)) {
    return rotated;
  }

  // 壁蹴りを試す
  for (const kick of WALL_KICKS) {
    const kicked = {
      ...rotated,
      position: {
        x: rotated.position.x + kick.x,
        y: rotated.position.y + kick.y,
      },
    };

    if (!checkCollision(board, kicked)) {
      return kicked;
    }
  }

  // すべてのキックが失敗した場合
  return null;
}
