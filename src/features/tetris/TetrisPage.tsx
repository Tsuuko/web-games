import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { HoldPiece } from './components/HoldPiece';
import { NextPiece } from './components/NextPiece';
import { useTetrisGame } from './hooks/useTetrisGame';
import './tetris.css';

export function TetrisPage() {
  const { gameState, ghostPiece, hold, togglePause, reset } = useTetrisGame();

  return (
    <div class="page-container">
      <div class="tetris-game-container">
        <h1>テトリス</h1>

        <div class="tetris-game-area">
          {/* PC用: 左パネル（ホールド） */}
          <div class="tetris-side-panel-left">
            <HoldPiece
              piece={gameState.holdPiece}
              canHold={gameState.canHold}
              onHold={hold}
            />
          </div>

          {/* ボード */}
          <div class="tetris-board-wrapper">
            <GameBoard
              board={gameState.board}
              currentPiece={gameState.currentPiece}
              ghostPiece={ghostPiece}
            />
            {gameState.gameState === 'paused' && (
              <div class="tetris-paused-overlay">ポーズ中</div>
            )}
          </div>

          {/* PC用: 右パネル（次） */}
          <div class="tetris-side-panel-right">
            <NextPiece piece={gameState.nextPiece} />
          </div>

          {/* モバイル用: 統合パネル（ホールド + 次） */}
          <div class="tetris-side-panel-mobile">
            <HoldPiece
              piece={gameState.holdPiece}
              canHold={gameState.canHold}
              onHold={hold}
            />
            <NextPiece piece={gameState.nextPiece} />
          </div>
        </div>

        <GameControls
          score={gameState.score}
          level={gameState.level}
          lines={gameState.lines}
          gameState={gameState.gameState}
          onPause={togglePause}
          onReset={reset}
        />
      </div>
    </div>
  );
}
