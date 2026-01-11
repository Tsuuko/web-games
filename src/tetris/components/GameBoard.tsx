import type { Board, Tetromino } from '../game/types';

import { TETROMINO_COLORS } from '../game/tetrominoes';

interface GameBoardProps {
  board: Board;
  currentPiece: Tetromino | null;
  ghostPiece: Tetromino | null;
}

export function GameBoard({ board, currentPiece, ghostPiece }: GameBoardProps) {
  const renderCell = (x: number, y: number) => {
    // ボードのセル
    const cellValue = board[y]?.[x];

    // 現在のピースのセル
    const currentPieceCell =
      currentPiece?.shape[y - currentPiece.position.y]?.[
        x - currentPiece.position.x
      ];

    // ゴーストピースのセル
    const ghostPieceCell =
      ghostPiece?.shape[y - ghostPiece.position.y]?.[x - ghostPiece.position.x];

    // 優先順位: 現在のピース > ボード > ゴーストピース
    if (currentPieceCell) {
      return {
        type: currentPiece.type as keyof typeof TETROMINO_COLORS,
        isGhost: false,
      };
    } else if (cellValue) {
      return {
        type: cellValue as keyof typeof TETROMINO_COLORS,
        isGhost: false,
      };
    } else if (ghostPieceCell) {
      return {
        type: ghostPiece.type as keyof typeof TETROMINO_COLORS,
        isGhost: true,
      };
    }

    return null;
  };

  return (
    <div class="tetris-game-board">
      {board.map((row, y) =>
        row.map((_, x) => {
          const cell = renderCell(x, y);
          const cellStyle: string = cell
            ? `background: ${TETROMINO_COLORS[cell.type]}; opacity: ${cell.isGhost ? 0.3 : 1};`
            : '';

          return (
            <div key={`${x}-${y}`} class="tetris-cell" style={cellStyle} />
          );
        }),
      )}
    </div>
  );
}
