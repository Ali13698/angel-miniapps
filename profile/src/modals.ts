import { UserProfile } from './types.js';

export function initModals(user: UserProfile | null) {
    // Bio Modal
    const bioModal = document.getElementById('modal-bio');
    const inputBio = document.getElementById('input-bio') as HTMLTextAreaElement;
    const btnEditBio = document.getElementById('btn-edit-bio');
    const btnCloseBio = document.getElementById('btn-close-bio');
    
    if (btnEditBio && bioModal && inputBio) {
        btnEditBio.addEventListener('click', () => {
            inputBio.value = user?.bio || '';
            bioModal.classList.add('active');
        });
    }
    if (btnCloseBio && bioModal) {
        btnCloseBio.addEventListener('click', () => bioModal.classList.remove('active'));
    }

    // Avatar Modal
    const avatarModal = document.getElementById('modal-avatar');
    const btnChangeAvatar = document.getElementById('btn-change-avatar');
    const btnCloseAvatar = document.getElementById('btn-close-avatar');

    if (btnChangeAvatar && avatarModal) {
        btnChangeAvatar.addEventListener('click', () => avatarModal.classList.add('active'));
    }
    if (btnCloseAvatar && avatarModal) {
        btnCloseAvatar.addEventListener('click', () => avatarModal.classList.remove('active'));
    }

    // Banner Modal
    const bannerModal = document.getElementById('modal-banner');
    const btnEditBanner = document.getElementById('btn-edit-banner');
    const btnCloseBanner = document.getElementById('btn-close-banner');

    if (btnEditBanner && bannerModal) {
        btnEditBanner.addEventListener('click', () => bannerModal.classList.add('active'));
    }
    if (btnCloseBanner && bannerModal) {
        btnCloseBanner.addEventListener('click', () => bannerModal.classList.remove('active'));
    }
}
