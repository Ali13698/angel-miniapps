import { Network } from './network.js';
import { UI } from './ui.js';

export class App {
    private network: Network;
    private ui: UI;

    constructor() {
        this.ui = new UI();
        this.network = new Network(this.ui);
    }

    async boot() {
        console.log('[App] Booting Angel PlayCanvas...');
        this.ui.showLoading();

        try {
            // راه‌اندازی موتور پلی کنواس و اتصال به شبکه
            await this.network.connect();
            this.ui.hideLoading();
            console.log('[App] Booted successfully.');
        } catch (e) {
            console.error('[App] Boot failed:', e);
            this.ui.showError('خطا در اتصال به سرور');
        }
    }
}
