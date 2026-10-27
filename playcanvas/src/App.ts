import { Auth } from './Auth.js';
import { Network } from './Network.js';
import { GameController } from './Game.js';
import { UI } from './Ui.js';
import { Config } from './Config.js';

class Bridge {
    public net: Network;
    public game: GameController;

    constructor() {
        this.net = new Network();
        this.game = new GameController();
    }

    async start(userId: string, protoUrl: string) {
        await this.net.init(protoUrl);
        await this.game.init(protoUrl);

        this.net.onMessage = (msg) => this.game.handleMessage(msg);
        this.net.connect(userId);
    }

    sendJoin(roomId: string) {
        this.net.send("join", new Uint8Array(0), roomId);
    }

    sendRoll() {
        this.net.send("roll");
    }

    sendMove(token: number) {
        this.net.send("move", new TextEncoder().encode(JSON.stringify({ token: token })));
    }
}

export class App {
    private ui: UI;
    private bridge: Bridge;
    // private pcStarter: PlayCanvasStarter; // در فاز بعدی اضافه می‌شود

    constructor() {
        this.ui = new UI();
        this.bridge = new Bridge();
    }

    async boot() {
        console.log("[App] Booting Angel PlayCanvas...");
        // this.pcStarter.init();

        (window as any).AngelBridge = {
            instance: this.bridge,
            join: (roomId: string) => this.bridge.sendJoin(roomId),
            roll: () => this.bridge.sendRoll(),
            move: (token: number) => this.bridge.sendMove(token)
        };

        if (this.bridge) {
            this.bridge.net.onConnected = () => {
                console.log("[App] Connected to server successfully.");
                this.ui.hideLoading();
            };
            this.bridge.net.onError = (err) => {
                this.ui.showError(err);
            };

            const userId = Auth.getUserIdForDisplay();
            await this.bridge.start(userId, Config.PROTO_URL);
        } else {
            this.ui.showError("Fatal: Could not initialize Bridge.");
        }
    }
}

// Start the app when the window is fully loaded
window.addEventListener("load", () => {
    setTimeout(() => {
        const app = new App();
        app.boot();
    }, 500);
});
