import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerWix } from "@electron-forge/maker-wix";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { ElectronegativityPlugin } from "@electron-forge/plugin-electronegativity";

const config: ForgeConfig = {
    packagerConfig: {
        asar: true
    },
    rebuildConfig: {
        force: true
    },
    makers: [
        new MakerWix({
            manufacturer: "Teddy Xiong",
            description: "PDF Encryption Tool",
            ui: {
                chooseDirectory: true
            }
        }),
        new MakerDeb({
            options: {
                maintainer: "Teddy Xiong",
                productDescription: "PDF Encryption Tool",
                productName: "PDF Encryptor"
            }
        })
    ],
    plugins: [
        new AutoUnpackNativesPlugin({}),
        new ElectronegativityPlugin({
            isSarif: false
        }),
        // Fuses are used to enable/disable various Electron functionality
        // at package time, before code signing the application
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: true,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: true,
            [FuseV1Options.EnableNodeCliInspectArguments]: true,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true
        })
    ]
};

export default config;
