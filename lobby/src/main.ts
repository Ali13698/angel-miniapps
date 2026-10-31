import { Router } from './router';

if ((window as any).Telegram && (window as any).Telegram.WebApp) {
    (window as any).Telegram.WebApp.ready();
    (window as any).Telegram.WebApp.expand();
}

(window as any).Router = Router;

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    // 🔴 اگر آدرس شامل games نبود، پروفایل را لود کن
    if (!path.includes('games')) {
        Router.switch('profile', document.getElementById('nav-profile'));
    }
});
