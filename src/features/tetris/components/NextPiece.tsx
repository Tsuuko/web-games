import type { Tetromino } from '../game/types';

interface NextPieceProps {
  piece: Tetromino | null;
}

export function NextPiece({ piece }: NextPieceProps) {
  if (!piece) return null;

  return (
    <div class="tetris-preview">
      <h3>次</h3>
      <div class="tetris-preview-grid">
        {piece.shape.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              class="tetris-preview-cell"
              style={cell ? `background: ${piece.color};` : ''}
            />
          )),
        )}
      </div>
    </div>
  );
}
