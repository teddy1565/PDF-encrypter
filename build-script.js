/* eslint-disable no-sync */
const fs = require("fs");
const path = require("path");

if (fs.existsSync(path.join(__dirname, "ipc-types", "dist")) === false) {
    throw Error("Build Fail");
}

// fs.mkdirSync(path.join(__dirname, "dist", "ipc-types", "types"), { recursive: true });

fs.readdirSync(path.join(__dirname, "ipc-types", "dist")).forEach((file) => {
    // eslint-disable-next-line no-sync
    fs.cpSync(path.join(__dirname, "ipc-types", "dist", file), path.join(__dirname, "dist", file), { recursive: true });
});
