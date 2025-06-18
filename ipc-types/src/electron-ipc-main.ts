

import { IpcMainEvent, IpcMainInvokeEvent } from "electron";

import {
    bootup
} from "./electron-ipc-route";



export interface IElectronIpcMainRouter {
    bootup: bootup<IpcMainInvokeEvent>;
}
