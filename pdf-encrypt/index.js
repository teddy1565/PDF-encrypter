const { app, BrowserWindow, ipcMain, shell, ipcRenderer, Menu, MenuItem, dialog } = require('electron');
const path = require('path');
const { electron } = require('process');
const node_pdf = require('node-qpdf');
const iconv = require('iconv-lite');
const fs = require('fs');
const { IncomingMessage } = require('http');
const { encrypt } = require('node-qpdf');
const { platform } = require('os');
var SqrtTextencode = "BIG-5";
var qpdfoption = {
    keyLength: 128,
    password: '123456',
    outputFile: "",
    restrictions: {
        print: 'full',
        useAes: 'y',
        extract: 'y'
    }
}
/*
    qpdfoption.outputFile=`${result.filePaths[0]}-encrypt.pdf`;
    console.log(node_pdf.encrypt(result.filePaths[0],qpdfoption));
*/


let Menubuild = [
    {
        label: 'About',
        submenu: [
            { label: 'CopyRight@teddy1565' },
            { label: 'Facebook', click() { shell.openExternal("https://www.facebook.com/") } },
            { label: 'exit', click() { app.quit() } }
        ]
    }
];

let menu = Menu.buildFromTemplate(Menubuild);
Menu.setApplicationMenu(menu);
const createWindow = () => {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    //mainWindow.webContents.openDevTools();
};
app.whenReady().then(createWindow);


ipcMain.on('SelectPDF-message', (Event, arg) => {
    console.log(dialog.showOpenDialog({
        filters: [
            { name: 'PDF', extensions: ['pdf'] }
        ],
        properties: ['openFile', 'multiSelections']
    }).then(result => {
        console.log(result.canceled);
        console.log('filePaths=', result.filePaths);
        if (result.canceled) {
            Event.reply("SelectPDF-Response", [1, "User has not select any file"]);
        } else {
            Event.reply("SelectPDF-Response", [0, "Receive File Path", result.filePaths]);
        }
    }).catch(err => {
        console.log(err);
        Event.reply("SelectPDF-Response", [2, "SomethingError at ipcMain.SelectPDF"]);
    }));
});
ipcMain.on('SelectSqrtText-message', (Event, arg) => {
    dialog.showOpenDialog({
        filters: [
            { name: 'TEXT', extensions: ['txt'] },
            { name: 'JSON', extensions: ['json'] }
        ],
        properties: ['openFile']
    }).then(result => {
        if (result.canceled) {
            Event.reply("SelectSqrtText-Response", [1, "User has not select any file"]);
        } else {
            console.log("filepath=" + result.filePaths);
            Event.reply("SelectSqrtText-Response", [0, "Receive File Path", result.filePaths]);
        }
    }).catch(err => {
        console.log(err);
        Event.reply("SelectSqrtText-Response", [2, "SomethingError at ipcMain.SelectSqrtText"]);
    });
});
ipcMain.on("EncodeChange-message", (Event, arg) => {
    SqrtTextencode = arg;
    Event.reply("EncodeChange-Response", SqrtTextencode);
});
ipcMain.on("EE-message", (Event, arg) => {
    let SqrtPath = arg.SqrtPath[0];
    let PDFpath = arg.PDFpath;
    let SqrtText = fs.readFileSync(SqrtPath);
    SqrtText = iconv.decode(SqrtText, SqrtTextencode);
    SqrtText = SqrtText.split(/;+|\n+/);
    console.log(SqrtText);
    SqrtText = SqrtText.map((x) => {
        let temp = '';
        for (let i = 0; i < x.length; i++) {
            if (x[i] != " " && x[i] != ' ') temp += x[i];
        }
        return temp;
    });
    console.log(SqrtText);
    let data = [];
    for (let i in SqrtText) {
        if (SqrtText[i].length != 0) data.push(SqrtText[i]);
    }
    SqrtText = data;
    SqrtText = SqrtText.map((x) => {
        x = x.split(/-+/);
        return x;
    });

    let EncStrArr = [];
    for (let i in PDFpath) {
        for (let j in SqrtText) {
            let reg = new RegExp(`${SqrtText[j][0]}`);
            if (PDFpath[i].match(reg) != null) {
                let O = PDFpath[i].split("/");
                let s = "";
                for (let i in O) {
                    if (O[i].match(/.pdf/)) break;
                    s += `${O[i]}/`;
                }
                s = `${s}${SqrtText[j][0]}-en.pdf`;
                if (process.platform === "win32") {
                    s = PDFpath[i].split(`${SqrtText[j][0]}.pdf`)[0];
                    s += `${SqrtText[j][0]}-en.pdf`;
                }
                let EncryptStruct = {
                    Name: `${SqrtText[j][0]}`,
                    PDFpath: `${PDFpath[i]}`,
                    option: {
                        keyLength: 128,
                        password: `${SqrtText[j][1]}`,
                        outputFile: `${s}`,
                        restrictions: {
                            print: 'full',
                            useAes: 'y',
                            extract: 'y'
                        }
                    },
                    OutputPath: ``
                };

                // EncStrArr.option.outputFile += `${EncryptStruct.OutputPath}${EncryptStruct.name}-encrypt.pdf`;
                EncStrArr.push(EncryptStruct);
            }
        }
    }
    for (let i in EncStrArr) {
        //Event.reply("debugger",`${EncStrArr[i].option.outputFile}`);
        node_pdf.encrypt(EncStrArr[i].PDFpath, EncStrArr[i].option);
    }
    Event.reply("EE-Response", "Done");
});
ipcMain.on("disp-message", (Event, arg) => {
    let SqrtText = fs.readFileSync(arg.SqrtPath[0]);
    SqrtText = iconv.decode(SqrtText, SqrtTextencode);
    Event.reply("disp-Response", SqrtText);
});
app.on('window-all-closed', () => {
    if (process.platform !== 'drawin') {
        app.quit();
    }
});
//const SelectPDFbtn = document.getElementById("SelectPDF");
//const SelectSqrtTextbtn = document.getElementById("SelectSqrtText");
