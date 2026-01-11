import type { Move } from './types'

// ランダムな手を選択
export function selectRandomMove(validMoves: Move[]): Move | null {
  if (validMoves.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * validMoves.length)
  return validMoves[randomIndex]
}
