export class Auth {
    static getInitData(): string {
        const tg = (window as any).Telegram?.WebApp;
        if (tg && tg.initData) {
            return tg.initData;
        }
        
        const urlData = new URLSearchParams(window.location.search).get("initData");
        if (urlData) {
            console.warn("[Auth] Using test initData from URL. DO NOT USE IN PRODUCTION.");
            return urlData;
        }
        return "";
    }

    static getUserIdForDisplay(): string {
        const tg = (window as any).Telegram?.WebApp;
        if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.id) {
            return tg.initDataUnsafe.user.id.toString();
        }
        return "0";
    }
}
