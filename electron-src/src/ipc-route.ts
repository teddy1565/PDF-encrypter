/* eslint-disable no-sync */
/* eslint-disable arrow-body-style */
import {
    IpcMain,
    IpcMainEvent,
    dialog,
    BrowserWindow,
    app,
    screen,
    IpcMainInvokeEvent
} from "electron";

import fs from "fs";
import path from "path";
import os from "os";

import {
    IElectronIpcMainRouter
} from  "./ipc-types/electron-ipc-main";

import {
    IPCValidChannel
} from "ipc-valid-channel";

import {
    IPCMainOverwrite
} from "electron-ipc";


class AppRouter implements IElectronIpcMainRouter {


    public static create_router(): AppRouter {
        return new AppRouter();
    }

    private constructor() {
    }

    bootup(_ev: IpcMainInvokeEvent) {
        return "pong";
    }
}

export class IPCRoute {
    private ipc: IPCMainOverwrite;

    private router: AppRouter;

    public static async create_ipc_router(ipc: IpcMain, force_init: boolean = false): Promise<IPCRoute> {
        const router = await AppRouter.create_router();
        return new IPCRoute(ipc, router);
    }



    private constructor(_parent_ipc: IpcMain, router: AppRouter) {
        this.ipc = new IPCMainOverwrite(_parent_ipc);
        this.router = router;
        this.ipc.handle("boot_up", router.bootup);

    }

    public handle(channel: IPCValidChannel, callback: <T extends IpcMainInvokeEvent>(_ev: T, ...args: any[]) => any): void {
        this.ipc.handle(channel, callback);
    }

    public on(channel: IPCValidChannel, callback: <T extends IpcMainEvent>(channel: string, _ev: T, ...args: any[]) => any): void {
        this.ipc.on(channel, callback);
    }

}
