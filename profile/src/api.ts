import { ProfileResponse, UpdateProfilePayload } from './types.js';

export function getUserId(): number {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    if (idParam) return parseInt(idParam, 10);
    
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user?.id) return tg.initDataUnsafe.user.id;
    
    return 1001; // Fallback test ID
}

export function getAuthToken(): string {
    return btoa(getUserId().toString());
}

// تابعی که جا افتاده بود و برای لود پروفایل لازمالاجراست
export async function fetchProfileData(id?: number): Promise<ProfileResponse | null> {
    try {
        const userId = id || getUserId();
        const res = await fetch(`/api/profile/${userId}`);
        if (!res.ok) throw new Error('Network response was not ok');
        return await res.json();
    } catch (e) {
        console.error('Failed to fetch profile', e);
        return null;
    }
}

// تابعی که برای ویرایش پروفایل اضافه کردیم
export async function updateProfile(payload: UpdateProfilePayload) {
    try {
        const res = await fetch('/api/me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getAuthToken()
            },
            body: JSON.stringify(payload)
        });
        return await res.json();
    } catch (e) {
        console.error('Failed to update profile', e);
        return { ok: false, error: 'Network error' };
    }
}
