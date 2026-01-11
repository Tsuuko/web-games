import { Link, useLocation } from 'wouter-preact'

type Page = 'home' | 'othello' | 'tetris'

export function Navigation() {
  const [location] = useLocation()
  const currentPage: Page = location === '/' ? 'home' : location.slice(1) as Page

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <Link href="/" className="nav-logo-link">
            <h1>Web Games</h1>
          </Link>
        </div>
        <div className="nav-menu">
          <Link
            href="/"
            className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
          >
            ホーム
          </Link>
          <Link
            href="/othello"
            className={`nav-item ${currentPage === 'othello' ? 'active' : ''}`}
          >
            オセロ
          </Link>
          <Link
            href="/tetris"
            className={`nav-item ${currentPage === 'tetris' ? 'active' : ''}`}
          >
            テトリス
          </Link>
        </div>
      </div>
    </nav>
  )
}
