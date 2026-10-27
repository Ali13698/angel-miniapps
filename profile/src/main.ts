import { store } from './store.js';
import { getUserId, fetchProfileData } from './api.js';
import { renderProfile } from './ui/profile.js';
import { renderHome } from './pages/home.js';
import { renderGames } from './pages/games.js';
import { Logger } from './logger.js';

// Define Router
(window as any).Router = {
    switch: async (tabName: string, element?: HTMLElement) => {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

        const targetScreen = document.getElementById(`screen-${tabName}`);
        if (targetScreen) targetScreen.classList.add('active');
        if (element) element.classList.add('active');

        const appEl = document.getElementById('screen-content');
        if (!appEl) return;

        if (tabName === 'home') {
            appEl.innerHTML = renderHome();
        } else if (tabName === 'profile') {
            appEl.innerHTML = renderProfile(store.currentUser, store.isLiked);
        } else if (tabName === 'games') {
            appEl.innerHTML = renderGames();
        }
    }
};

async function init() {
    if ((window as any).Telegram?.WebApp) {
        (window as any).Telegram.WebApp.ready();
        (window as any).Telegram.WebApp.expand();
    }

    const userId = getUserId();
    const data = await fetchProfileData(userId);
    
    if (data && data.ok) {
        store.setUser(data.user, data.stats);
        Logger.log('Profile loaded', data.user.display_name);
        (window as any).Router.switch('profile', document.getElementById('nav-profile'));
    } else {
        Logger.error('Failed to load initial data');
    }
}

document.addEventListener('DOMContentLoaded', init);
