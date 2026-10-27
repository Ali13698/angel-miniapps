import { store } from '../store.js';
import { renderProfile } from '../ui/profile.js';
import { renderModals } from '../ui/modals.js';

export function initProfilePage() {
    const appEl = document.getElementById('screen-profile');
    if (!appEl) return;

    // Render initial HTML
    appEl.innerHTML = renderProfile(store.currentUser, store.isLiked) + renderModals();

    // Bind Like Button
    const likeBox = document.getElementById('like-box');
    if (likeBox) {
        likeBox.addEventListener('click', () => {
            store.setLiked(!store.isLiked);
            appEl.innerHTML = renderProfile(store.currentUser, store.isLiked) + renderModals();
            // Note: In a real app, this should also call an API to update likes_count in DB
        });
    }
}
