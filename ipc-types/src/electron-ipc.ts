import {
    IpcMain,
    IpcMainEvent,
    IpcMainInvokeEvent
} from "electron";

import {
    IPCValidChannel
} from "./ipc-valid-channel";

/**
 * @description
 *
 * The main purpose of multi-layer encapsulation here is to allow the front-end and back-end IPC communication to use the same interface definition at the same time.
 *
 * 這邊經過多層封裝最主要的目的是為了可以同時讓前後端的 IPC 通訊可以使用相同的 interface 定義
 */
export class IPCMainOverwrite {

    private _ipc: IpcMain;

    constructor(ipc: IpcMain) {
        this._ipc = ipc;
    }

    private ipcSocket<T, R = IpcMainEvent>(channel: IPCValidChannel, callback: (channel: string, _ev: R, ...args: any[]) => T, _ev: R, ...args: any[]): T {
        return callback(channel, _ev, ...args);
    }

    public handle<R>(channel: IPCValidChannel, callback: <T extends IpcMainInvokeEvent>(_ev: T, ...args: any[]) => R | Promise<R>): void {
        this._ipc.handle(channel, callback);
    }

    public on<R>(channel: IPCValidChannel, callback: <T extends IpcMainEvent>(channel: string, _ev: T, ...args: any[]) => R): void {
        this._ipc.on(channel, (event, ...args) => {
            const result = this.ipcSocket<ReturnType<typeof callback>>(channel, callback, event, ...args);
            Promise.resolve(result).then((result) => {
                event.reply(channel, result);
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    // ipcRenderer.eventNames().forEach((event_name) => {
    //     ipcRenderer.removeAllListeners(event_name);
    // })
}
