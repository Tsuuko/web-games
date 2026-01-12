import { render } from 'preact';

import './index.css';
import { App } from './app.tsx';

const appElement = document.getElementById('app');
if (appElement) {
  render(<App />, appElement);
} else {
  throw new Error('Root element #app not found');
}

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
