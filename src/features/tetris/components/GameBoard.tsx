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
    let currentPieceCell: boolean | undefined;
    if (currentPiece) {
      const shapeY = y - currentPiece.position.y;
      const shapeX = x - currentPiece.position.x;
      if (shapeY >= 0 && shapeY < 4 && shapeX >= 0 && shapeX < 4) {
        currentPieceCell = currentPiece.shape[shapeY][shapeX];
      }
    }

    // ゴーストピースのセル
    let ghostPieceCell: boolean | undefined;
    if (ghostPiece) {
      const shapeY = y - ghostPiece.position.y;
      const shapeX = x - ghostPiece.position.x;
      if (shapeY >= 0 && shapeY < 4 && shapeX >= 0 && shapeX < 4) {
        ghostPieceCell = ghostPiece.shape[shapeY][shapeX];
      }
    }

    // 優先順位: 現在のピース > ボード > ゴーストピース
    if (currentPieceCell && currentPiece) {
      return {
        type: currentPiece.type as keyof typeof TETROMINO_COLORS,
        isGhost: false,
      };
    } else if (cellValue) {
      return {
        type: cellValue as keyof typeof TETROMINO_COLORS,
        isGhost: false,
      };
    } else if (ghostPieceCell && ghostPiece) {
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
