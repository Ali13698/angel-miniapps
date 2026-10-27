import { UpdateProfilePayload } from './types.js';

export function getUserId(): number {
    const qs = new URLSearchParams(window.location.search).get("id");
    if (qs) return parseInt(qs, 10);
    const tg = (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id;
    return Number(tg) || 1001;
}

export function getAuthToken(): string {
    return btoa(getUserId().toString());
}

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
