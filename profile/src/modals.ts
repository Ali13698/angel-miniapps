import { UserProfile } from './types.js';

export function initModals(user: UserProfile | null) {
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
}
