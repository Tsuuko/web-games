import type { GameStatus, GameResult } from '../game/types';

interface GameControlsProps {
  onReset: () => void;
  gameStatus: GameStatus;
  mustPass: boolean;
  onPass: () => void;
  gameResult: GameResult;
}

export function GameControls({
  onReset,
  gameStatus,
  mustPass,
  onPass,
  gameResult,
}: GameControlsProps) {
  const getResultMessage = () => {
    if (gameResult === 'black') return '黒の勝ち！';
    if (gameResult === 'white') return '白の勝ち！';
    if (gameResult === 'draw') return '引き分け！';
    return '';
  };

  return (
    <div class="othello-game-controls">
      {mustPass && gameStatus === 'playing' && (
        <div class="othello-message pass">
          <div>相手に置ける場所がありません。パスします。</div>
          <button onClick={onPass} class="pass-button">
            パスする
          </button>
        </div>
      )}

      {gameStatus === 'finished' && (
        <div class="othello-message game-over">
          <div class="othello-result-text">{getResultMessage()}</div>
        </div>
      )}

      <button onClick={onReset} class="reset-button">
        新しいゲーム
      </button>
    </div>
  );
}
