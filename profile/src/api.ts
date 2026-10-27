import { ProfileResponse, UpdateProfilePayload } from './types.js';

export function getUserId(): number {
    const qs = new URLSearchParams(window.location.search).get("id");
    if (qs) return parseInt(qs, 10);
    const tg = (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id;
    return Number(tg) || 1001;
}

// گرفتن توکن واقعی JWT از سرور
export async function getAuthToken(): Promise<string> {
    try {
        const userId = getUserId();
        const res = await fetch(`/api/auth/token?id=${userId}`);
        const data = await res.json();
        return data.token || "";
    } catch (e) {
        return "";
    }
}

export async function fetchProfileData(id?: number): Promise<ProfileResponse | null> {
    try {
        const userId = id || getUserId();
        const res = await fetch(`/api/profile/${userId}`);
        if (!res.ok) throw new Error('Network error');
        return await res.json();
    } catch (e) {
        return null;
    }
}

export async function updateProfile(payload: UpdateProfilePayload) {
    try {
        const token = await getAuthToken();
        if(!token) throw new Error("No token");
        
        const res = await fetch('/api/me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(payload)
        });
        return await res.json();
    } catch (e) {
        return { ok: false, error: "خطا در احراز هویت" };
    }
}

export async function toggleLike(targetId: number, isLiked: boolean) {
    try {
        const token = await getAuthToken();
        if(!token) return false;

        const res = await fetch('/api/profile/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ target_id: targetId, is_liked: isLiked })
        });
        const data = await res.json();
        return data.ok;
    } catch (e) {
        return false;
    }
}
