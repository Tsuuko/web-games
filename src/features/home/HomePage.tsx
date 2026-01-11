interface HomePageProps {
  onNavigate: (page: 'othello' | 'tetris') => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div class="page-container">
      <div class="home-page">
        <div>
          <h1 class="home-title">Web Gamesへようこそ！</h1>
          <p class="home-subtitle">無料で遊べるブラウザゲーム</p>
        </div>

        <div class="game-cards">
          <div class="game-card">
            <h2 class="game-card-title">オセロ</h2>
            <p class="game-card-description">
              人間 vs AI のオセロゲーム。合法手の表示やパス判定などの標準機能を備えています。
            </p>
            <button class="game-card-play-btn" onClick={() => onNavigate('othello')}>
              プレイ
            </button>
          </div>

          <div class="game-card">
            <h2 class="game-card-title">テトリス</h2>
            <p class="game-card-description">
              クラシックなテトリスゲーム。ホールド機能、ゴーストピース、ハードドロップに対応しています。
            </p>
            <button class="game-card-play-btn" onClick={() => onNavigate('tetris')}>
              プレイ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
