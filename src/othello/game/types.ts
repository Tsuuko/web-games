// 石の色
export type PieceColor = 'black' | 'white'

// セルの状態
export type CellState = PieceColor | null

// ボードの型（8x8の2次元配列）
export type Board = CellState[][]

// ゲームの状態
export type GameStatus = 'playing' | 'finished'

// ゲームの結果
export type GameResult = 'black' | 'white' | 'draw' | null

// 手の位置
export type Move = {
  row: number
  col: number
}

// ゲーム状態
export type GameState = {
  board: Board
  currentPlayer: PieceColor
  humanPlayer: PieceColor
  gameStatus: GameStatus
  gameResult: GameResult
  validMoves: Move[]
  mustPass: boolean
  passCount: number // 連続パス回数（2回でゲーム終了）
}

// 方向ベクトル（8方向）
export type Direction = {
  row: number
  col: number
}

// ゲームアクションの型
export type GameAction =
  | { type: 'INITIALIZE' }
  | { type: 'MAKE_MOVE'; payload: { row: number; col: number } }
  | { type: 'SWITCH_TURN' }
  | { type: 'PASS' }
  | { type: 'AI_MOVE' }
  | { type: 'GAME_OVER'; payload: GameResult }
  | { type: 'RESET' }
