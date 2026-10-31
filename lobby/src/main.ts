import { Router } from './router';

if ((window as any).Telegram && (window as any).Telegram.WebApp) {
    (window as any).Telegram.WebApp.ready();
    (window as any).Telegram.WebApp.expand();
}

(window as any).Router = Router;

document.addEventListener('DOMContentLoaded', () => {
    // 🔴 رفع باگ: فقط در صورتی که در روت اصلی (پروفایل) هستیم، پروفایل را لود کن
    // اگر آدرس شامل بازی بود، اجازه بده تا صفحه بازی لود شود.
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html') {
        Router.switch('profile', document.getElementById('nav-profile'));
    } else if (path.includes('games')) {
        // اگر در مسیر بازی بودیم، تب بازی‌ها را فعال کن
        Router.switch('games', document.getElementById('nav-games'));
    }
});
