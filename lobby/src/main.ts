import { Router } from './router.js';

if ((window as any).Telegram && (window as any).Telegram.WebApp) {
    (window as any).Telegram.WebApp.ready();
    (window as any).Telegram.WebApp.expand();
}

(window as any).Router = Router;

document.addEventListener('DOMContentLoaded', () => {
    // تغییر مهم: به جای home، مستقیماً پروفایل را لود کن تا صفحه سفید نباشیم
    Router.switch('profile', document.getElementById('nav-profile'));
});
