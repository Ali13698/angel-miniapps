import * as protobuf from 'protobufjs';

export class GameController {
    private currentRev: number = 0;
    private isReady: boolean = false;
    private protoRoot: protobuf.Root | null = null;

    public onRolled: (seat: number, dice: number) => void = () => {};
    public onMoved: (seat: number, token: number, pos: number) => void = () => {};
    public onTurnChanged: (turn: number) => void = () => {};
    public onGameOver: (winner: number) => void = () => {};

    async init(protoUrl: string) {
        this.protoRoot = await protobuf.load(protoUrl);
    }

    handleMessage(msg: any) {
        if (this.isReady && msg.rev <= this.currentRev) {
            console.warn(`[GameController] Dropped stale msg. Rev: ${msg.rev} <= ${this.currentRev}`);
            return;
        }

        if (msg.error) {
            console.error(`[Server Error] ${msg.error.code}: ${msg.error.error}`);
            return;
        }

        if (msg.state && msg.state.length > 0) {
            this.isReady = true;
        }

        if (msg.events && msg.events.length > 0) {
            for (const ev of msg.events) {
                this.processEvent(ev.type, ev.payload);
            }
        }

        this.currentRev = msg.rev;
    }

    private processEvent(type: string, payload: Uint8Array) {
        if (!this.protoRoot || !payload || payload.length === 0) return;

        try {
            if (type === "ludo.rolled") {
                const p = this.protoRoot.lookupType("angel.RolledPayload").decode(payload) as any;
                this.onRolled(p.seat, p.dice);
            } else if (type === "ludo.moved") {
                const p = this.protoRoot.lookupType("angel.MovedPayload").decode(payload) as any;
                this.onMoved(p.seat, p.token, p.pos);
            } else if (type === "turn_changed") {
                const p = this.protoRoot.lookupType("angel.TurnPayload").decode(payload) as any;
                this.onTurnChanged(p.turn);
            }
        } catch (e) {
            console.error(`[GameController] Failed to parse event ${type}`, e);
        }
    }

    reset() {
        this.currentRev = 0;
        this.isReady = false;
    }
}
