import { UserProfile } from './types.js';
import { updateProfile } from './api.js';

export function initModals(user: UserProfile | null) {
    const bioModal = document.getElementById('modal-bio');
    const inputBio = document.getElementById('input-bio') as HTMLTextAreaElement;
    
    document.getElementById('btn-edit-bio')?.addEventListener('click', () => {
        if (inputBio) inputBio.value = user?.bio || '';
        bioModal?.classList.add('active');
    });
    
    document.getElementById('btn-close-bio')?.addEventListener('click', () => bioModal?.classList.remove('active'));
    
    document.getElementById('btn-save-bio')?.addEventListener('click', async () => {
        if (inputBio) {
            const res = await updateProfile({ bio: inputBio.value });
            if (res.ok) { window.location.reload(); }
            else { alert('خطا در ذخیره'); }
        }
    });

    document.getElementById('btn-change-avatar')?.addEventListener('click', () => document.getElementById('modal-avatar')?.classList.add('active'));
    document.getElementById('btn-close-avatar')?.addEventListener('click', () => document.getElementById('modal-avatar')?.classList.remove('active'));
    
    document.getElementById('btn-edit-banner')?.addEventListener('click', () => document.getElementById('modal-banner')?.classList.add('active'));
    document.getElementById('btn-close-banner')?.addEventListener('click', () => document.getElementById('modal-banner')?.classList.remove('active'));

    (window as any).selectAvatar = async (url: string) => {
        const res = await updateProfile({ avatar: url });
        if (res.ok) window.location.reload();
    };

    (window as any).selectBanner = async (bg: string) => {
        const res = await updateProfile({ banner_id: bg });
        if (res.ok) window.location.reload();
    };
}
