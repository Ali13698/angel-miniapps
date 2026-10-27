import * as protobuf from 'protobufjs';
import { Config } from './Config.js';

export class Network {
    private ws: WebSocket | null = null;
    private protoRoot: protobuf.Root | null = null;
    private ClientMsg: protobuf.Type | null = null;
    private ServerMsg: protobuf.Type | null = null;
    public isConnected: boolean = false;
    
    public onConnected: () => void = () => {};
    public onDisconnected: () => void = () => {};
    public onError: (err: string) => void = () => {};
    public onMessage: (msg: any) => void = () => {};

    async init(protoUrl: string) {
        try {
            this.protoRoot = await protobuf.load(protoUrl);
            this.ClientMsg = this.protoRoot.lookupType("angel.ClientMsg");
            this.ServerMsg = this.protoRoot.lookupType("angel.ServerMsg");
        } catch (e) {
            this.onError(`Failed to load Proto schema: ${e}`);
            throw e;
        }
    }

    connect(userId: string) {
        if (!this.ClientMsg || !this.ServerMsg) {
            this.onError("Protobuf not initialized. Call init() first.");
            return;
        }

        const url = `${Config.WS_URL}?user=${encodeURIComponent(userId)}`;
        this.ws = new WebSocket(url);
        this.ws.binaryType = "arraybuffer";

        this.ws.onopen = () => {
            this.isConnected = true;
            this.onConnected();
        };

        this.ws.onclose = () => {
            this.isConnected = false;
            this.onDisconnected();
        };

        this.ws.onerror = () => {
            this.onError("WebSocket error occurred.");
        };

        this.ws.onmessage = (event) => {
            if (event.data instanceof ArrayBuffer) {
                try {
                    const buffer = new Uint8Array(event.data);
                    const decoded = this.ServerMsg!.decode(buffer);
                    const msg = this.ServerMsg!.toObject(decoded, { enums: String, longs: String, bytes: Uint8Array });
                    this.onMessage(msg);
                } catch (e) {
                    this.onError(`Failed to decode ServerMsg: ${e}`);
                }
            }
        };
    }

    send(type: string, payload: Uint8Array = new Uint8Array(0), roomId: string = "", rev: number = 0) {
        if (!this.isConnected || !this.ws || !this.ClientMsg) return;
        try {
            const message = this.ClientMsg.create({
                type: type,
                id: crypto.randomUUID(),
                room_id: roomId,
                rev: rev,
                payload: payload
            });
            const buffer = this.ClientMsg.encode(message).finish();
            this.ws.send(buffer);
        } catch (e) {
            this.onError(`Failed to encode ClientMsg: ${e}`);
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
            this.isConnected = false;
        }
    }
}
