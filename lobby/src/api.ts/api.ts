export function getUserId(): string {
    const qs = new URLSearchParams(window.location.search).get("id");
    if (qs) return qs;
    const tg = (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id;
    return tg ? String(tg) : "1001"; // Fallback for testing
}

// 🔒 تابع امن: فرستادن initData به جای id
export async function getAuthToken(): Promise<string> {
    try {
        const tg = (window as any).Telegram?.WebApp;
        const initData = tg?.initData || "";
        
        const url = initData 
            ? `/api/auth/token?initData=${encodeURIComponent(initData)}`
            : `/api/auth/token?id=${getUserId()}`; // Fallback for browser testing
            
        const res = await fetch(url);
        const data = await res.json();
        return data.token || "";
    } catch (e) {
        return "";
    }
}

export async function fetchProfileData() {
    try {
        const userId = getUserId();
        const res = await fetch(`/api/profile/${userId}`);
        const data = await res.json();
        
        if (!res.ok || !data.ok) {
            throw new Error(data.error || "User not found");
        }
        return data.user;
    } catch (e) {
        console.error("API Error in fetchProfileData:", e);
        return null;
    }
}
