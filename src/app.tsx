import { useState } from 'preact/hooks'
import { Navigation } from './components/Navigation'
import { HomePage } from './features/home/HomePage'
import { OthelloPage } from './features/othello/OthelloPage'
import { TetrisPage } from './features/tetris/TetrisPage'
import './app.css'

type Page = 'home' | 'othello' | 'tetris'

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={(page) => setCurrentPage(page)} />
      case 'othello':
        return <OthelloPage />
      case 'tetris':
        return <TetrisPage />
      default:
        return <HomePage onNavigate={(page) => setCurrentPage(page)} />
    }
  }

  return (
    <>
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>{renderPage()}</main>
    </>
  )
}
