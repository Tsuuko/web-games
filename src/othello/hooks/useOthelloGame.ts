import { useReducer, useEffect } from 'preact/hooks';

import type { GameState, GameAction, PieceColor } from '../game/types';

import { selectRandomMove } from '../game/ai';
import { createInitialBoard, countAllPieces } from '../game/board';
import { getValidMoves, placePiece, determineWinner } from '../game/rules';

const INITIAL_STATE: GameState = {
  board: createInitialBoard(),
  currentPlayer: 'black',
  humanPlayer: 'black',
  gameStatus: 'playing',
  gameResult: null,
  validMoves: [],
  mustPass: false,
  passCount: 0,
  isProcessing: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INITIALIZE': {
      const board = createInitialBoard();
      const currentPlayer: PieceColor = 'black';
      const validMoves = getValidMoves(board, currentPlayer);

      return {
        ...INITIAL_STATE,
        board,
        currentPlayer,
        validMoves,
      };
    }

    case 'START_PROCESSING': {
      return {
        ...state,
        isProcessing: true,
      };
    }

    case 'END_PROCESSING': {
      return {
        ...state,
        isProcessing: false,
      };
    }

    case 'MAKE_MOVE': {
      const { row, col } = action.payload;

      // 石を配置してボードを更新
      const newBoard = placePiece(state.board, row, col, state.currentPlayer);

      return {
        ...state,
        board: newBoard,
        passCount: 0, // 石を置いたのでパス回数をリセット
      };
    }

    case 'SWITCH_TURN': {
      // プレイヤーを切り替え
      const newPlayer: PieceColor =
        state.currentPlayer === 'black' ? 'white' : 'black';

      // 新しいプレイヤーの合法手を計算
      const validMoves = getValidMoves(state.board, newPlayer);

      // 合法手がない場合の処理
      if (validMoves.length === 0) {
        // 現在のプレイヤー（手番を渡される側）にも合法手がないかチェック
        const currentPlayerMoves = getValidMoves(
          state.board,
          state.currentPlayer,
        );

        if (currentPlayerMoves.length === 0) {
          // 両者とも合法手がない → ゲーム終了
          const gameResult = determineWinner(state.board);
          return {
            ...state,
            gameStatus: 'finished',
            gameResult,
            validMoves: [],
            mustPass: false,
            isProcessing: false,
          };
        }

        // 相手に合法手がないが、現在のプレイヤーにはある → パス
        return {
          ...state,
          mustPass: true,
          validMoves: currentPlayerMoves,
          isProcessing: false,
        };
      }

      // 正常にターンを切り替え
      return {
        ...state,
        currentPlayer: newPlayer,
        validMoves,
        mustPass: false,
        isProcessing: false,
      };
    }

    case 'PASS': {
      // パスしてターンを切り替え
      const newPlayer: PieceColor =
        state.currentPlayer === 'black' ? 'white' : 'black';
      const validMoves = getValidMoves(state.board, newPlayer);

      return {
        ...state,
        currentPlayer: newPlayer,
        validMoves,
        mustPass: false,
        passCount: state.passCount + 1,
      };
    }

    case 'GAME_OVER': {
      return {
        ...state,
        gameStatus: 'finished',
        gameResult: action.payload,
        validMoves: [],
      };
    }

    case 'RESET': {
      const board = createInitialBoard();
      const currentPlayer: PieceColor = 'black';
      const validMoves = getValidMoves(board, currentPlayer);

      return {
        ...INITIAL_STATE,
        board,
        currentPlayer,
        validMoves,
      };
    }

    default:
      return state;
  }
}

export function useOthelloGame(humanPlayer: PieceColor = 'black') {
  const [gameState, dispatch] = useReducer(gameReducer, {
    ...INITIAL_STATE,
    humanPlayer,
    validMoves: getValidMoves(INITIAL_STATE.board, 'black'),
  });

  // 手を実行
  const makeMove = (row: number, col: number) => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.isProcessing) return; // 処理中は新しい手を受け付けない

    dispatch({ type: 'START_PROCESSING' });
    dispatch({ type: 'MAKE_MOVE', payload: { row, col } });

    // 次のターンへ
    setTimeout(() => {
      dispatch({ type: 'SWITCH_TURN' });
    }, 100);
  };

  // パス
  const passTurn = () => {
    if (!gameState.mustPass) return;
    dispatch({ type: 'PASS' });
  };

  // リセット
  const resetGame = () => {
    dispatch({ type: 'RESET' });
  };

  // AIのターンを監視して自動実行
  useEffect(() => {
    // ゲーム終了時や人間のターンは何もしない
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentPlayer === gameState.humanPlayer) return;
    if (gameState.mustPass) return;
    if (gameState.isProcessing) return; // 処理中は何もしない

    // AIのターン
    const timer = setTimeout(() => {
      const move = selectRandomMove(gameState.validMoves);
      if (move) {
        dispatch({ type: 'START_PROCESSING' });
        dispatch({ type: 'MAKE_MOVE', payload: move });

        // 次のターンへ
        setTimeout(() => {
          dispatch({ type: 'SWITCH_TURN' });
        }, 100);
      }
    }, 500); // 0.5秒の遅延で自然な体験に

    return () => clearTimeout(timer);
  }, [gameState.currentPlayer, gameState.validMoves, gameState.mustPass, gameState.isProcessing]);

  // スコア計算
  const { black, white } = countAllPieces(gameState.board);

  return {
    gameState,
    makeMove,
    passTurn,
    resetGame,
    blackCount: black,
    whiteCount: white,
  };
}
