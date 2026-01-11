import { Router, Route } from 'wouter-preact'
import { Navigation } from './components/Navigation'
import { HomePage } from './features/home/HomePage'
import { OthelloPage } from './features/othello/OthelloPage'
import { TetrisPage } from './features/tetris/TetrisPage'
import './app.css'

export function App() {
  return (
    <>
      <Navigation />
      <Router>
        <Route path="/" component={HomePage} />
        <Route path="/othello" component={OthelloPage} />
        <Route path="/tetris" component={TetrisPage} />
      </Router>
    </>
  )
}
