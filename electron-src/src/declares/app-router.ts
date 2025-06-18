import {
    IpcMain,
    IpcMainEvent,
    IpcMainInvokeEvent
} from "electron";

import { ElectronIpcMainRouter } from "./electron-ipc-route.declare"; // Adjust path as needed

export class AppRouter implements ElectronIpcMainRouter {

    public static create_router(): AppRouter {
        return new AppRouter();
    }

    private constructor() {

    }

    startup_test(_ev: IpcMainInvokeEvent): string {
        return "Pong";
    }

}
