import {
    IpcMain,
    IpcMainEvent,
    IpcMainInvokeEvent,
    dialog,
    BrowserWindow
} from "electron";

import { ElectronIpcMainRouter } from "./electron-ipc-route.declare"; // Adjust path as needed

import {
    EncodeType
} from "../shared-types/src/encode-type";

export class AppRouter implements ElectronIpcMainRouter {

    public static create_router(): AppRouter {
        return new AppRouter();
    }

    private constructor() {

    }

    startup_test(_ev: IpcMainInvokeEvent): string {
        return "Pong";
    }

    select_pdf_file(_ev: IpcMainInvokeEvent): Promise<string | undefined> {
        const window = BrowserWindow.getFocusedWindow();
        return dialog.showOpenDialog(window, {
            title: "Select PDF File",
            properties: ["openFile"],
            filters: [
                { name: "PDF Files", extensions: ["pdf"] }
            ]
        }).then((result) => {
            if (result.canceled) {
                return Promise.resolve(undefined);
            }
            const selectedFile = result.filePaths[0];
            // Here you would implement the encryption logic
            // For now, we just return true to indicate success
            return Promise.resolve(selectedFile);
        });
    }

    select_sqrt_txt_file(_ev: IpcMainInvokeEvent): Promise<string | undefined> {
        const window = BrowserWindow.getFocusedWindow();
        return dialog.showOpenDialog(window, {
            title: "Select SQRT TXT File",
            properties: ["openFile"],
            filters: [
                { name: "TXT Files", extensions: ["txt"] }
            ]
        }).then((result) => {
            if (result.canceled) {
                return Promise.resolve(undefined);
            }
            const selectedFile = result.filePaths[0];
            // Here you would implement the encryption logic
            // For now, we just return true to indicate success
            return Promise.resolve(selectedFile);
        });
    }

    select_output_dir(_ev: IpcMainInvokeEvent): Promise<string | undefined> {
        const window = BrowserWindow.getFocusedWindow();
        return dialog.showOpenDialog(window, {
            title: "Select PDF File",
            properties: ["openDirectory"]
        }).then((result) => {
            if (result.canceled) {
                return Promise.resolve(undefined);
            }
            const selectedFile = result.filePaths[0];
            // Here you would implement the encryption logic
            // For now, we just return true to indicate success
            return Promise.resolve(selectedFile);
        });
    }

    exec_encrypt(_ev: IpcMainInvokeEvent, pdf_file_path: string, sqrt_txt_file_path: string, output_dir_path: string, encode_type: keyof EncodeType): Promise<boolean> {
        // Here you would implement the encryption logic
        // For now, we just return true to indicate success
        console.log(`Encrypting PDF: ${pdf_file_path}, SQRT TXT: ${sqrt_txt_file_path}, Output Dir: ${output_dir_path}, Encode Type: ${encode_type}`);
        return Promise.resolve(true);
    }

}
