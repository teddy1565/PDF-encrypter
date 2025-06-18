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
    AppRouter
} from  "./declares/app-router";

import {
    IPCMainOverwrite
} from "./declares/ipc-main-overwrite.declare";

import {
    IPCValidChannel
} from "./shared-types/src/ipc-valid-channel";


export class IPCRoute {
    private ipc: IPCMainOverwrite;

    private router: AppRouter;

    public static create_ipc_router(ipc: IpcMain, force_init: boolean = false): IPCRoute {
        const router = AppRouter.create_router();
        return new IPCRoute(ipc, router);
    }



    private constructor(_parent_ipc: IpcMain, router: AppRouter) {
        this.ipc = new IPCMainOverwrite(_parent_ipc);
        this.router = router;
        this.ipc.handle("startup_test", router.startup_test);

    }

    public handle(channel: IPCValidChannel, callback: <T extends IpcMainInvokeEvent>(_ev: T, ...args: any[]) => any): void {
        this.ipc.handle(channel, callback);
    }

    public on(channel: IPCValidChannel, callback: <T extends IpcMainEvent>(channel: string, _ev: T, ...args: any[]) => any): void {
        this.ipc.on(channel, callback);
    }

}
