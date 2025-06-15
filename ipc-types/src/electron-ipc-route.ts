import { IpcMainEvent, IpcMainInvokeEvent } from "electron";


export interface bootup<T extends IpcMainEvent | IpcMainInvokeEvent> {
    /**
     * @param _ev
     * @param str
     * @returns
     */
    (_ev: T, ...args: any[]): string;
}
