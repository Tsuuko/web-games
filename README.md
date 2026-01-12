# Web Games

無料で遊べるブラウザゲームコレクション。オセロとテトリスをプレイできます。

## 🎮 ゲーム一覧

### オセロ
人間 vs AI のオセロゲーム。標準的なオセロルールに加え、以下の機能を実装しています：

- 合法手の表示
- パス判定
- AI対戦機能

### テトリス
クラシックなテトリスゲーム。以下の機能を実装しています：

- **ホールド機能**: 次のピースを保留
- **ゴーストピース**: 着地位置の予測表示
- **ハードドロップ**: スペースキーで即座に落下
- **レベルシステム**: ライン消去数に応じてレベルアップ
- **スコア計算**: 同時に消したライン数でスコア変動

## 🚀 始め方

### インストール

```bash
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで `http://localhost:5173` にアクセスしてください。

### ビルド

```bash
pnpm build
```

### プレビュー

```bash
pnpm preview
```

## 🎯 操作方法

### オセロ
- **クリック/タップ**: 石を置く

### テトリス

#### PC
- **←/→**: 左右移動
- **↓**: ソフトドロップ
- **↑**: 回転
- **スペース**: ハードドロップ
- **C または Shift**: ホールド
- **P**: ポーズ

#### モバイル
- **タップ**: 回転
- **左右スワイプ**: 左右移動
- **下スワイプ**: ソフトドロップ
- **ホールドエリア**: ピースをホールド

## 🛠️ 技術スタック

- **フレームワーク**: Preact
- **ルーティング**: wouter-preact
- **ビルドツール**: Vite (rolldown-vite)
- **言語**: TypeScript

## 📁 プロジェクト構成

```
src/
├── components/          # 共通コンポーネント
│   └── Navigation.tsx   # ナビゲーションメニュー
└── features/           # ゲーム機能別モジュール
    ├── home/           # ホームページ
    │   └── HomePage.tsx
    ├── othello/        # オセロゲーム
    │   ├── OthelloPage.tsx
    │   ├── components/ # オセロ用コンポーネント
    │   │   ├── Board.tsx
    │   │   ├── Cell.tsx
    │   │   ├── GameControls.tsx
    │   │   └── GameInfo.tsx
    │   ├── game/       # ゲームロジック
    │   │   ├── ai.ts
    │   │   ├── board.ts
    │   │   ├── rules.ts
    │   │   └── types.ts
    │   ├── hooks/      # カスタムフック
    │   │   └── useOthelloGame.ts
    │   └── othello.css
    └── tetris/         # テトリスゲーム
        ├── TetrisPage.tsx
        ├── components/ # テトリス用コンポーネント
        │   ├── GameBoard.tsx
        │   ├── GameControls.tsx
        │   ├── HoldPiece.tsx
        │   └── NextPiece.tsx
        ├── game/       # ゲームロジック
        │   ├── board.ts
        │   ├── collision.ts
        │   ├── rotation.ts
        │   ├── scoring.ts
        │   ├── tetrominoes.ts
        │   └── types.ts
        ├── hooks/      # カスタムフック
        │   └── useTetrisGame.ts
        └── tetris.css
```

## 📝 スクリプト

- `pnpm dev` - 開発サーバーを起動
- `pnpm build` - プロダクションビルド
- `pnpm preview` - ビルドしたアプリをプレビュー
- `pnpm lint` - リントチェック
- `pnpm type-check` - 型チェック
- `pnpm format` - コードフォーマット

## 📄 ライセンス

MIT
