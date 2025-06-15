import { IpcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";

export type IPCValidChannel<T> = T extends string ? T : never;

export interface IPCRenderer<T> {
    send<R = never | undefined>(channel: IPCValidChannel<T>): void;
    send<R extends any[]>(channel: IPCValidChannel<T>, ...args: R): void;
    receive<K>(channel: IPCValidChannel<T>, func: (args: K) => void): void;
    invoke<P extends any[], R>(channel: IPCValidChannel<T>, ...args: P): Promise<R>;
    removeAllListeners(channel: IPCValidChannel<T>): void;
}

export interface IPCRendererReceiveMessageHandler {
    (...args: any[]): void;
}

export interface IPCMessageHandler<T extends IpcMainEvent = IpcMainEvent> {
    (event: T, ...args: any[]): void;
}








export type Params<H, G extends IpcMainEvent = IpcMainEvent> = H extends (ev: G, ...args: infer P) => any ? P : never;
