import type { TetrominoType, Shape, Tetromino } from './types';

// テトリミノの形状定義
export const TETROMINO_SHAPES: Record<TetrominoType, Shape[]> = {
  I: [
    [
      [false, false, false, false],
      [true, true, true, true],
      [false, false, false, false],
      [false, false, false, false],
    ],
    [
      [false, false, true, false],
      [false, false, true, false],
      [false, false, true, false],
      [false, false, true, false],
    ],
    [
      [false, false, false, false],
      [false, false, false, false],
      [true, true, true, true],
      [false, false, false, false],
    ],
    [
      [false, true, false, false],
      [false, true, false, false],
      [false, true, false, false],
      [false, true, false, false],
    ],
  ],
  O: [
    [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ],
    [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ],
    [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ],
    [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ],
  ],
  T: [
    [
      [false, false, false, false],
      [false, true, false, false],
      [true, true, true, false],
      [false, false, false, false],
    ],
    [
      [false, false, false, false],
      [false, true, false, false],
      [false, true, true, false],
      [false, true, false, false],
    ],
    [
      [false, false, false, false],
      [false, false, false, false],
      [true, true, true, false],
      [false, true, false, false],
    ],
    [
      [false, false, false, false],
      [false, true, false, false],
      [true, true, false, false],
      [false, true, false, false],
    ],
  ],
  S: [
    [
      [false, false, false, false],
      [false, true, true, false],
      [true, true, false, false],
      [false, false, false, false],
    ],
    [
      [false, false, false, false],
      [false, true, false, false],
      [false, true, true, false],
      [false, false, true, false],
    ],
    [
      [false, false, false, false],
      [false, false, false, false],
      [false, true, true, false],
      [true, true, false, false],
    ],
    [
      [false, false, false, false],
      [true, false, false, false],
      [true, true, false, false],
      [false, true, false, false],
    ],
  ],
  Z: [
    [
      [false, false, false, false],
      [true, true, false, false],
      [false, true, true, false],
      [false, false, false, false],
    ],
    [
      [false, false, false, false],
      [false, false, true, false],
      [false, true, true, false],
      [false, true, false, false],
    ],
    [
      [false, false, false, false],
      [false, false, false, false],
      [true, true, false, false],
      [false, true, true, false],
    ],
    [
      [false, false, false, false],
      [false, true, false, false],
      [true, true, false, false],
      [true, false, false, false],
    ],
  ],
  J: [
    [
      [false, false, false, false],
      [true, false, false, false],
      [true, true, true, false],
      [false, false, false, false],
    ],
    [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, false, false],
      [false, true, false, false],
    ],
    [
      [false, false, false, false],
      [false, false, false, false],
      [true, true, true, false],
      [false, false, true, false],
    ],
    [
      [false, false, false, false],
      [false, true, false, false],
      [false, true, false, false],
      [true, true, false, false],
    ],
  ],
  L: [
    [
      [false, false, false, false],
      [false, false, true, false],
      [true, true, true, false],
      [false, false, false, false],
    ],
    [
      [false, false, false, false],
      [false, true, false, false],
      [false, true, false, false],
      [false, true, true, false],
    ],
    [
      [false, false, false, false],
      [false, false, false, false],
      [true, true, true, false],
      [true, false, false, false],
    ],
    [
      [false, false, false, false],
      [true, true, false, false],
      [false, true, false, false],
      [false, true, false, false],
    ],
  ],
};

// テトリミノの色
export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: '#00f0f0',
  O: '#f0f000',
  T: '#a000f0',
  S: '#00f000',
  Z: '#f00000',
  J: '#0000f0',
  L: '#f0a000',
};

// ランダムなテトリミノを生成
export function getRandomTetrominoType(): TetrominoType {
  const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  return types[Math.floor(Math.random() * types.length)];
}

// テトリミノを作成
export function createTetromino(
  type: TetrominoType,
  position: { x: number; y: number },
): Tetromino {
  return {
    type,
    shape: TETROMINO_SHAPES[type][0], // 初期状態
    position,
    color: TETROMINO_COLORS[type],
  };
}

// テトリミノを回転（時計回り）
export function rotateTetromino(tetromino: Tetromino): Tetromino {
  const { shape, type } = tetromino;
  const shapes = TETROMINO_SHAPES[type];
  const currentIndex = shapes.findIndex((s) => s === shape);
  const nextIndex = (currentIndex + 1) % shapes.length;

  return {
    ...tetromino,
    shape: shapes[nextIndex],
  };
}

// テトリミノの幅を取得
export function getTetrominoWidth(tetromino: Tetromino): number {
  let minX = 4;
  let maxX = 0;

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (tetromino.shape[y][x]) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      }
    }
  }

  return maxX - minX + 1;
}

// テトリミノの高さを取得
export function getTetrominoHeight(tetromino: Tetromino): number {
  let minY = 4;
  let maxY = 0;

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (tetromino.shape[y][x]) {
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }

  return maxY - minY + 1;
}

// バッグ（7バッグ）システム用
export class TetrominoBag {
  private bag: TetrominoType[] = [];

  public getNext(): TetrominoType {
    if (this.bag.length === 0) {
      this.bag = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
      // Fisher-Yatesシャッフル
      for (let i = this.bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
      }
    }
    const next = this.bag.pop();
    if (!next) {
      throw new Error('TetrominoBag is empty');
    }
    return next;
  }
}
