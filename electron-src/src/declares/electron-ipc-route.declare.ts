import {
    IpcMainEvent,           // 如果這個交互是單向的 (也就是event.reply不是一對一回應，可能不回應，或是像stream一樣多次回應)，則使用 IpcMainEvent
    IpcMainInvokeEvent      // 如果這個交互是雙向的 (也就是event.reply是有回應的，一問一答)，則使用 IpcMainInvokeEvent
} from "electron";

import {
    startup_test,
    select_output_dir,
    select_pdf_file,
    select_sqrt_txt_file,
    exec_encrypt
} from "../shared-types/src/ipc-route.declare";

import {
    EncodeType
} from "../shared-types/src/encode-type";


export interface ElectronIpcMainRouter {
    startup_test: startup_test<IpcMainInvokeEvent>;
    select_output_dir: select_output_dir<IpcMainInvokeEvent>;
    select_pdf_file: select_pdf_file<IpcMainInvokeEvent>;
    select_sqrt_txt_file: select_sqrt_txt_file<IpcMainInvokeEvent>;
    exec_encrypt: exec_encrypt<IpcMainInvokeEvent, keyof EncodeType>;
}
