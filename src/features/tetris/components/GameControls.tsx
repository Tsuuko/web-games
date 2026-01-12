import type { GameState } from '../game/types';

interface GameControlsProps {
  score: number;
  level: number;
  lines: number;
  gameState: GameState;
  onPause: () => void;
  onReset: () => void;
}

export function GameControls({
  score,
  level,
  lines,
  gameState,
  onPause,
  onReset,
}: GameControlsProps) {
  return (
    <div class="tetris-game-controls">
      <div class="tetris-stats">
        <div class="tetris-stat">
          <span class="tetris-stat-label">スコア</span>
          <span class="tetris-stat-value">{score}</span>
        </div>
        <div class="tetris-stat">
          <span class="tetris-stat-label">レベル</span>
          <span class="tetris-stat-value">{level}</span>
        </div>
        <div class="tetris-stat">
          <span class="tetris-stat-label">ライン</span>
          <span class="tetris-stat-value">{lines}</span>
        </div>
      </div>

      <div class="tetris-buttons">
        {gameState === 'playing' && (
          <button onClick={onPause} class="tetris-pause-btn">
            ポーズ (P)
          </button>
        )}
        {gameState === 'paused' && (
          <button onClick={onPause} class="tetris-resume-btn">
            再開 (P)
          </button>
        )}
        <button onClick={onReset} class="tetris-reset-btn">
          リセット (R)
        </button>
      </div>

      {gameState === 'gameover' && (
        <div class="tetris-gameover">
          <div class="tetris-gameover-text">ゲームオーバー</div>
          <div class="tetris-final-score">スコア: {score}</div>
        </div>
      )}

      <div class="tetris-controls-info">
        <h3>操作方法</h3>
        <div class="tetris-controls-list">
          <div>← → : 左右移動</div>
          <div>↑ : 回転</div>
          <div>↓ : 落下</div>
          <div>スペース : ハードドロップ</div>
          <div>C / Shift : ホールド</div>
          <div>P : ポーズ</div>
        </div>
        <div class="tetris-touch-info">
          <h3>タッチ操作</h3>
          <div>タップ: 回転</div>
          <div>左右ドラッグ: 移動</div>
          <div>下スワイプ: 高速落下</div>
          <div>ホールドエリア: ホールド</div>
        </div>
      </div>
    </div>
  );
}
