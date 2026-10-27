export class UI {
    private loadingOverlay: HTMLElement | null;

    constructor() {
        this.loadingOverlay = document.getElementById("loading-overlay");
    }

    hideLoading() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.add("hidden");
        }
    }

    showLoading(text: string = "در حال اتصال...") {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.remove("hidden");
            const textEl = this.loadingOverlay.querySelector(".loading-text");
            if (textEl) textEl.textContent = text;
        }
    }

    showError(msg: string) {
        const toast = document.createElement("div");
        toast.style.cssText = "position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#ef4444;color:#fff;padding:10px 20px;border-radius:8px;z-index:10000;font-family:sans-serif;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.5);";
        toast.textContent = msg;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transition = "opacity 0.5s";
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
}
