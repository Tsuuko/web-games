import { useReducer, useEffect, useCallback, useRef } from 'preact/hooks';

import type {
  TetrisGameState,
  TetrisGameAction,
  Tetromino,
} from '../game/types';

import {
  createInitialBoard,
  lockPiece,
  clearLines,
  getGhostPosition,
} from '../game/board';
import { checkCollision } from '../game/collision';
import { rotateWithKicks } from '../game/rotation';
import { calculateScore, calculateLevel, getDropSpeed } from '../game/scoring';
import { createTetromino, TetrominoBag } from '../game/tetrominoes';

const INITIAL_STATE: TetrisGameState = {
  board: createInitialBoard(),
  currentPiece: null,
  nextPiece: null,
  holdPiece: null,
  canHold: true,
  score: 0,
  level: 1,
  lines: 0,
  gameState: 'playing',
  bag: new TetrominoBag(),
};

function gameReducer(
  state: TetrisGameState,
  action: TetrisGameAction,
): TetrisGameState {
  switch (action.type) {
    case 'INITIALIZE': {
      const bag = new TetrominoBag();
      const currentPiece = createTetromino(bag.getNext(), { x: 3, y: 0 });
      const nextPiece = createTetromino(bag.getNext(), { x: 0, y: 0 });

      return {
        ...INITIAL_STATE,
        currentPiece,
        nextPiece,
        bag,
      };
    }

    case 'MOVE_LEFT': {
      if (!state.currentPiece || state.gameState !== 'playing') return state;

      const newPiece = {
        ...state.currentPiece,
        position: {
          x: state.currentPiece.position.x - 1,
          y: state.currentPiece.position.y,
        },
      };

      if (!checkCollision(state.board, newPiece)) {
        return { ...state, currentPiece: newPiece };
      }
      return state;
    }

    case 'MOVE_RIGHT': {
      if (!state.currentPiece || state.gameState !== 'playing') return state;

      const newPiece = {
        ...state.currentPiece,
        position: {
          x: state.currentPiece.position.x + 1,
          y: state.currentPiece.position.y,
        },
      };

      if (!checkCollision(state.board, newPiece)) {
        return { ...state, currentPiece: newPiece };
      }
      return state;
    }

    case 'MOVE_DOWN': {
      if (!state.currentPiece || state.gameState !== 'playing') return state;

      const newPiece = {
        ...state.currentPiece,
        position: {
          x: state.currentPiece.position.x,
          y: state.currentPiece.position.y + 1,
        },
      };

      if (!checkCollision(state.board, newPiece)) {
        return { ...state, currentPiece: newPiece, score: state.score + 1 };
      }
      return state;
    }

    case 'HARD_DROP': {
      if (!state.currentPiece || state.gameState !== 'playing') return state;

      let newY = state.currentPiece.position.y;
      while (
        !checkCollision(state.board, {
          ...state.currentPiece,
          position: { x: state.currentPiece.position.x, y: newY + 1 },
        })
      ) {
        newY++;
      }

      const droppedPiece = {
        ...state.currentPiece,
        position: { x: state.currentPiece.position.x, y: newY },
      };

      const newBoard = lockPiece(state.board, droppedPiece);
      const { newBoard: clearedBoard, clearedLines } = clearLines(newBoard);
      const newScore = state.score + calculateScore(clearedLines, state.level);
      const newLines = state.lines + clearedLines;
      const newLevel = calculateLevel(newLines);

      const bag = state.bag || new TetrominoBag();
      const nextPiece =
        state.nextPiece || createTetromino(bag.getNext(), { x: 0, y: 0 });
      const newCurrentPiece = createTetromino(bag.getNext(), { x: 3, y: 0 });

      // ゲームオーバー判定
      if (checkCollision(clearedBoard, newCurrentPiece)) {
        return { ...state, gameState: 'gameover', currentPiece: null };
      }

      return {
        ...state,
        board: clearedBoard,
        currentPiece: newCurrentPiece,
        nextPiece,
        score: newScore,
        lines: newLines,
        level: newLevel,
        canHold: true,
        bag,
      };
    }

    case 'ROTATE': {
      if (!state.currentPiece || state.gameState !== 'playing') return state;

      const rotated = rotateWithKicks(state.board, state.currentPiece);
      if (rotated) {
        return { ...state, currentPiece: rotated };
      }
      return state;
    }

    case 'SOFT_DROP': {
      // 状態は変化させない（TICKで処理）
      return state;
    }

    case 'HOLD': {
      if (
        !state.currentPiece ||
        !state.canHold ||
        state.gameState !== 'playing'
      )
        return state;

      const bag = state.bag || new TetrominoBag();
      const holdPiece = { ...state.currentPiece, position: { x: 0, y: 0 } };

      let newCurrentPiece: Tetromino;
      let newNextPiece = state.nextPiece;
      
      if (state.holdPiece) {
        newCurrentPiece = { ...state.holdPiece, position: { x: 3, y: 0 } };
      } else {
        // holdPieceがない場合は、nextPieceを使用し、新しいnextPieceを生成
        if (state.nextPiece) {
          newCurrentPiece = { ...state.nextPiece, position: { x: 3, y: 0 } };
          newNextPiece = createTetromino(bag.getNext(), { x: 0, y: 0 });
        } else {
          newCurrentPiece = createTetromino(bag.getNext(), { x: 3, y: 0 });
        }
      }

      return {
        ...state,
        currentPiece: newCurrentPiece,
        nextPiece: newNextPiece,
        holdPiece,
        canHold: false,
        bag,
      };
    }

    case 'PAUSE': {
      return { ...state, gameState: 'paused' };
    }

    case 'RESUME': {
      return { ...state, gameState: 'playing' };
    }

    case 'GAME_OVER': {
      return { ...state, gameState: 'gameover', currentPiece: null };
    }

    case 'RESET': {
      const bag = new TetrominoBag();
      const currentPiece = createTetromino(bag.getNext(), { x: 3, y: 0 });
      const nextPiece = createTetromino(bag.getNext(), { x: 0, y: 0 });

      return {
        ...INITIAL_STATE,
        board: createInitialBoard(),
        currentPiece,
        nextPiece,
        bag,
      };
    }

    case 'TICK': {
      if (!state.currentPiece || state.gameState !== 'playing') return state;

      const newPiece = {
        ...state.currentPiece,
        position: {
          x: state.currentPiece.position.x,
          y: state.currentPiece.position.y + 1,
        },
      };

      if (!checkCollision(state.board, newPiece)) {
        return { ...state, currentPiece: newPiece };
      }

      // ピースを固定
      const newBoard = lockPiece(state.board, state.currentPiece);
      const { newBoard: clearedBoard, clearedLines } = clearLines(newBoard);
      const newScore = state.score + calculateScore(clearedLines, state.level);
      const newLines = state.lines + clearedLines;
      const newLevel = calculateLevel(newLines);

      const bag = state.bag || new TetrominoBag();
      const nextPiece =
        state.nextPiece || createTetromino(bag.getNext(), { x: 0, y: 0 });
      const newCurrentPiece = createTetromino(bag.getNext(), { x: 3, y: 0 });

      // ゲームオーバー判定
      if (checkCollision(clearedBoard, newCurrentPiece)) {
        return { ...state, gameState: 'gameover', currentPiece: null };
      }

      return {
        ...state,
        board: clearedBoard,
        currentPiece: newCurrentPiece,
        nextPiece,
        score: newScore,
        lines: newLines,
        level: newLevel,
        canHold: true,
        bag,
      };
    }

    default:
      return state;
  }
}

export function useTetrisGame() {
  const [gameState, dispatch] = useReducer(gameReducer, {
    ...INITIAL_STATE,
    currentPiece: null,
    nextPiece: null,
  });

  const dropIntervalRef = useRef<number | null>(null);

  // 初期化
  useEffect(() => {
    dispatch({ type: 'INITIALIZE' });
  }, []);

  // 自動落下
  useEffect(() => {
    if (gameState.gameState === 'playing') {
      const speed = getDropSpeed(gameState.level);
      dropIntervalRef.current = window.setInterval(() => {
        dispatch({ type: 'TICK' });
      }, speed);
    }

    return () => {
      if (dropIntervalRef.current) {
        clearInterval(dropIntervalRef.current);
      }
    };
  }, [gameState.gameState, gameState.level]);

  // キーボードイベント
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameState !== 'playing') return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          dispatch({ type: 'MOVE_LEFT' });
          break;
        case 'ArrowRight':
          e.preventDefault();
          dispatch({ type: 'MOVE_RIGHT' });
          break;
        case 'ArrowDown':
          e.preventDefault();
          dispatch({ type: 'MOVE_DOWN' });
          break;
        case 'ArrowUp':
          e.preventDefault();
          dispatch({ type: 'ROTATE' });
          break;
        case ' ':
          e.preventDefault();
          dispatch({ type: 'HARD_DROP' });
          break;
        case 'c':
        case 'C':
        case 'Shift':
          e.preventDefault();
          dispatch({ type: 'HOLD' });
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          if (gameState.gameState === 'playing') {
            dispatch({ type: 'PAUSE' });
          } else if (gameState.gameState === 'paused') {
            dispatch({ type: 'RESUME' });
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameState]);

  // タッチ操作用ハンドラー
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastTouchXRef = useRef(0);
  const touchMoveCountRef = useRef(0);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (gameState.gameState !== 'playing') return;
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      lastTouchXRef.current = touch.clientX;
      touchMoveCountRef.current = 0;
    },
    [gameState.gameState],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (gameState.gameState !== 'playing') return;
      // スクロールを防止
      e.preventDefault();
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastTouchXRef.current;

      // 一定距離移動ごとにピースを移動
      if (Math.abs(deltaX) > 30) {
        if (deltaX > 0) {
          dispatch({ type: 'MOVE_RIGHT' });
        } else {
          dispatch({ type: 'MOVE_LEFT' });
        }
        lastTouchXRef.current = touch.clientX;
        touchMoveCountRef.current++;
      }
    },
    [gameState.gameState],
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (gameState.gameState !== 'playing' || !touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      // 移動がない場合は回転
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        dispatch({ type: 'ROTATE' });
      } else if (deltaY > 50 && Math.abs(deltaX) < 50) {
        // 下にスワイプで高速落下
        dispatch({ type: 'HARD_DROP' });
      }

      touchStartRef.current = null;
    },
    [gameState.gameState],
  );

  // タッチイベントを登録
  useEffect(() => {
    const target = document.querySelector('.tetris-board-wrapper');
    if (!target) return;

    target.addEventListener('touchstart', handleTouchStart as EventListener, {
      passive: true,
    });
    target.addEventListener('touchmove', handleTouchMove as EventListener, {
      passive: false,
    });
    target.addEventListener('touchend', handleTouchEnd as EventListener, {
      passive: true,
    });

    return () => {
      if (target) {
        target.removeEventListener(
          'touchstart',
          handleTouchStart as EventListener,
        );
        target.removeEventListener('touchmove', handleTouchMove as EventListener);
        target.removeEventListener('touchend', handleTouchEnd as EventListener);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const moveLeft = () => dispatch({ type: 'MOVE_LEFT' });
  const moveRight = () => dispatch({ type: 'MOVE_RIGHT' });
  const moveDown = () => dispatch({ type: 'MOVE_DOWN' });
  const hardDrop = () => dispatch({ type: 'HARD_DROP' });
  const rotate = () => dispatch({ type: 'ROTATE' });
  const hold = () => dispatch({ type: 'HOLD' });
  const togglePause = () => {
    if (gameState.gameState === 'playing') {
      dispatch({ type: 'PAUSE' });
    } else if (gameState.gameState === 'paused') {
      dispatch({ type: 'RESUME' });
    }
  };
  const reset = () => dispatch({ type: 'RESET' });

  const ghostPiece =
    gameState.currentPiece && gameState.gameState === 'playing'
      ? {
          ...gameState.currentPiece,
          position: getGhostPosition(gameState.board, gameState.currentPiece),
        }
      : null;

  return {
    gameState,
    ghostPiece,
    moveLeft,
    moveRight,
    moveDown,
    hardDrop,
    rotate,
    hold,
    togglePause,
    reset,
  };
}
