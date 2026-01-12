// スコア計算
export function calculateScore(lines: number, level: number): number {
  const baseScores = [0, 40, 100, 300, 1200];
  return baseScores[lines] * level;
}

export function calculateHardDropScore(dropDistance: number): number {
  return dropDistance * 2;
}

// レベル計算（10ラインごとにレベルアップ）
export function calculateLevel(lines: number): number {
  return Math.floor(lines / 10) + 1;
}

// 落下速度を計算（ミリ秒）
export function getDropSpeed(level: number): number {
  // レベル1で1000ms、レベルが上がるごとに速くなる
  // 最小で100ms
  return Math.max(100, 1000 - (level - 1) * 100);
}

// ライン消去アニメーション時間
export const LINE_CLEAR_DELAY = 300;
