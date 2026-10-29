export function getUserId(): string {
    const qs = new URLSearchParams(window.location.search).get("id");
    if (qs) return qs;
    const tg = (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id;
    return tg ? String(tg) : "1001"; // Fallback for testing
}

// 🔒 تابع جدید: دریافت توکن امن JWT از سرور (حذف کامل btoa)
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
