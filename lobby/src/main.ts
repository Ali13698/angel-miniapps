import { Router } from './router.js';

// Telegram Init
if ((window as any).Telegram && (window as any).Telegram.WebApp) {
    (window as any).Telegram.WebApp.ready();
    (window as any).Telegram.WebApp.expand();
}

// Expose Router globally
(window as any).Router = Router;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    Router.switch('home', document.getElementById('nav-home'));
});
