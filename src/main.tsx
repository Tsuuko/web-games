import { render } from 'preact';

import './index.css';
import { App } from './app.tsx';

render(<App />, document.getElementById('app')!);

// iOSのダブルタップ拡大を無効化
let lastTouchEnd = 0;

document.addEventListener(
  'touchend',
  (event: TouchEvent) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false,
);
