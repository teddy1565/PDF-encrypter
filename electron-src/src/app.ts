/* eslint-disable no-sync */
import {
    app,
    BrowserWindow,
    ipcMain,
    Menu,
    dialog,
    nativeImage,
    NativeImage,
    screen
} from "electron";
import path from "path";
import fs from "fs";

import {
    IPCRoute
} from "./ipc-route";


const ipc_route = IPCRoute.create_ipc_router(ipcMain);

const isMac = process.platform === "darwin";

const isWindows = process.platform === "win32";

const isLinux = process.platform === "linux";

const SIL = app.requestSingleInstanceLock();

if (SIL === false) {
    app.quit();
} else {
    app.setLoginItemSettings({
        openAtLogin: false
    });
    app.on("second-instance", (event, commandLine, workingDirectory) => {
        if (BrowserWindow.getAllWindows().length > 0) {
            if (BrowserWindow.getAllWindows()[0].isMinimized()) {
                BrowserWindow.getAllWindows()[0].restore();
            }
            BrowserWindow.getAllWindows()[0].focus();
        }
    });
}

app.whenReady().then(() => {

    if (app.isReady() === true) {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    } else {
        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        app.on("ready", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    }

    app.on("activate", () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
}).catch((error) => {
    console.log(error);
});

function createIcon(): NativeImage {

    if (isWindows) {
        return nativeImage.createFromPath(path.join(__dirname, "assets", "angular-icon.ico"));
    } else if (isMac) {
        return nativeImage.createFromPath(path.join(__dirname, "assets", "angular-icon.png"));
    }

    return nativeImage.createFromPath(path.join(__dirname, "assets", "angular-icon.png"));
}

const createWindow = (): void => {

    const displays = screen.getAllDisplays();
    const externalDisplay = displays.find((display) => display.bounds.x !== 0 || display.bounds.y !== 0);
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        x: externalDisplay ? (externalDisplay.bounds.x + 50) : undefined,
        y: externalDisplay ? (externalDisplay.bounds.y + 50) : undefined,
        frame: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        },

        // windows 小按鈕
        closable: true,    // 是否可以關閉
        minimizable: true,  // 是否可以最小化
        maximizable: true,      // 是否可以最大化
        fullscreenable: true,   // 是否可以全螢幕 (就是全螢幕的按鈕)
        resizable: true,      // 是否可以改變視窗大小

        fullscreen: false,      // 全螢幕模式 (如果為true, 則windows下，frame會消失，也就是無法拖曳),
        autoHideMenuBar: true,  // 隱藏menu bar
        movable: true,          // 是否可以拖曳
        icon: createIcon()
    });

    // const entryPointWindowURL = app.isPackaged ? `${path.join(__dirname, "index.html")}` : "http://localhost:4200";
    const entryPointWindowURL = path.join(__dirname, "index.html");

    // and load the index.html of the app.
    mainWindow.loadFile(entryPointWindowURL);

    mainWindow.maximize();
    // mainWindow.resizable = false;
    // mainWindow.movable = false;
    mainWindow.show();

    mainWindow.webContents.on("before-input-event", (event, input) => {
        if (input.control && input.shift && input.key.toLowerCase() === "i") {
            console.log("open dev tools");
            event.preventDefault();
            mainWindow.webContents.openDevTools();
        }
    });

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

