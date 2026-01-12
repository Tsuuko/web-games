// テトリミノの種類
export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

// 位置
export interface Position {
  x: number;
  y: number;
}

// セルの色
export type CellColor = TetrominoType | 'ghost' | null;

// ボード（10x20）
export type Board = CellColor[][];

// テトリミノの形状（4x4グリッド）
export type Shape = boolean[][];

// テトリミノ
export interface Tetromino {
  type: TetrominoType;
  shape: Shape;
  position: Position;
  color: string;
}

// ゲームの状態
export type GameState = 'playing' | 'paused' | 'gameover';

// ゲームの全状態
export interface TetrisGameState {
  board: Board;
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  holdPiece: Tetromino | null;
  canHold: boolean;
  score: number;
  level: number;
  lines: number;
  gameState: GameState;
  bag?: any; // TetrominoBagインスタンスを保持
}

// ゲームアクション
export type TetrisGameAction =
  | { type: 'INITIALIZE' }
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'MOVE_DOWN' }
  | { type: 'HARD_DROP' }
  | { type: 'ROTATE' }
  | { type: 'HOLD' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'GAME_OVER' }
  | { type: 'RESET' }
  | { type: 'TICK' }; // 自動落下用
