import { Link } from 'wouter-preact';

export function HomePage() {
  return (
    <div class="page-container">
      <div class="home-page">
        <h1 class="home-title">Web Gamesへようこそ！</h1>
        <p class="home-subtitle">無料で遊べるブラウザゲーム</p>

        <div class="game-cards">
          <div class="game-card">
            <h2 class="game-card-title">オセロ</h2>
            <p class="game-card-description">
              人間 vs AI
              のオセロゲーム。合法手の表示やパス判定などの標準機能を備えています。
            </p>
            <Link href="/othello" class="game-card-play-btn">
              プレイ
            </Link>
          </div>

          <div class="game-card">
            <h2 class="game-card-title">テトリス</h2>
            <p class="game-card-description">
              クラシックなテトリスゲーム。ホールド機能、ゴーストピース、ハードドロップに対応しています。
            </p>
            <Link href="/tetris" class="game-card-play-btn">
              プレイ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
