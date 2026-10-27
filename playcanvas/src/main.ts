import { Network } from './network.js';
import { UI } from './ui.js';
import { App } from './app.js';

// نقطه ورود برنامه پلی کنواس
window.addEventListener('load', () => {
    setTimeout(() => {
        const app = new App();
        app.boot();
    }, 500);
});
