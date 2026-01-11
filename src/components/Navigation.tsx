import { useState, useEffect } from 'preact/hooks'

type Page = 'home' | 'othello' | 'tetris'

interface NavigationProps {
  currentPage: Page
  onPageChange: (page: Page) => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  // URLハッシュから初期ページを設定
  useEffect(() => {
    const hash = window.location.hash.slice(1) as Page
    if (hash === 'othello' || hash === 'tetris' || hash === 'home') {
      onPageChange(hash)
    }
  }, [])

  // ページ変更時にハッシュを更新
  const handlePageChange = (page: Page) => {
    window.location.hash = page
    onPageChange(page)
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <h1>Web Games</h1>
        </div>
        <div className="nav-menu">
          <button
            className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handlePageChange('home')}
          >
            ホーム
          </button>
          <button
            className={`nav-item ${currentPage === 'othello' ? 'active' : ''}`}
            onClick={() => handlePageChange('othello')}
          >
            オセロ
          </button>
          <button
            className={`nav-item ${currentPage === 'tetris' ? 'active' : ''}`}
            onClick={() => handlePageChange('tetris')}
          >
            テトリス
          </button>
        </div>
      </div>
    </nav>
  )
}
