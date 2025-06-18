// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

import {
    IPCRenderer
} from "./shared-types/src/ipc";

import {
    IPCValidChannel
} from "./shared-types/src/ipc-valid-channel";

ipcRenderer.setMaxListeners(Infinity);

/**
 * 這裡必須要手動一個一個定義，因exposeInMainWorld在預設情況下，如果有參考外部的資料，會被視為不安全，進而被阻擋。
 */
const valid_IPC_channels: Array<IPCValidChannel> = [
    "select_pdf_file",
    "select_sqrt_txt_file",
    "select_output_dir",
    "exec_encrypt"
];

contextBridge.exposeInMainWorld(
    "ipcRenderer",
    <IPCRenderer<IPCValidChannel>>{
        send: <R extends any[]>(channel: IPCValidChannel, ...args: R): void => {
            if (valid_IPC_channels.includes(channel)) {
                ipcRenderer.send(channel, ...args);
            } else {
                console.error(`[ipcRenderer.send]Invalid IPC channel: ${channel}`);
            }
        },
        // eslint-disable-next-line @typescript-eslint/ban-types
        receive: <U>(channel: IPCValidChannel, func: (args: U) => void): void => {
            if (valid_IPC_channels.includes(channel)) {
                ipcRenderer.on(channel, (event, args: U) => func(args));
            } else {
                console.error(`[ipcRenderer.receive]Invalid IPC channel: ${channel}`);
            }
        },
        // eslint-disable-next-line arrow-body-style
        invoke: <P extends any[], R>(channel: IPCValidChannel, ...args: P): Promise<R> => {
            if (valid_IPC_channels.includes(channel)) {
                return ipcRenderer.invoke(channel, ...args) as Promise<R>;
            }
            console.error(`[ipcRenderer.invoke]Invalid IPC channel: ${channel}`);
            return Promise.reject(new Error(`[ipcRenderer.invoke]Invalid IPC channel: ${channel}`));
        },
        removeAllListeners: (channel: IPCValidChannel): void => {
            if (valid_IPC_channels.includes(channel)) {
                ipcRenderer.removeAllListeners(channel);
            } else {
                console.error(`[ipcRenderer.removeAllListeners]Invalid IPC channel: ${channel}`);
            }
        }
    }
);
