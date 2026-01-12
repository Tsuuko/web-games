import type { CellState } from '../game/types';

interface CellProps {
  row: number;
  col: number;
  piece: CellState;
  isValidMove: boolean;
  onClick: (row: number, col: number) => void;
  isClickable: boolean;
}

export function Cell({
  row,
  col,
  piece,
  isValidMove,
  onClick,
  isClickable,
}: CellProps) {
  const handleClick = () => {
    if (isClickable && isValidMove) {
      onClick(row, col);
    }
  };

  return (
    <div
      class={`othello-cell ${isValidMove ? 'valid-move' : ''} ${
        isClickable && isValidMove ? 'clickable' : ''
      }`}
      onClick={handleClick}
    >
      {piece && <div class={`othello-piece ${piece}`} />}
      {isValidMove && isClickable && <div class="othello-valid-indicator" />}
    </div>
  );
}
