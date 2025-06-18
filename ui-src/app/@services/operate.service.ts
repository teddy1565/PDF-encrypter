/* eslint-disable arrow-body-style */
import { Injectable, OnInit, Inject, Optional } from "@angular/core";
import { switchMap, distinctUntilChanged, catchError, map } from "rxjs/operators";
import { forkJoin, of, takeUntil, ReplaySubject, Observable, lastValueFrom, from, mergeMap, share  } from "rxjs";

import { IPCRenderer, Params } from "../shared-types/src/ipc";
import { IPCValidChannel } from "../shared-types/src/ipc-valid-channel";
import {
    IPCRendererService
} from "./ipc-renderer.service";

import {
    select_output_dir as IPCRoute_select_output_dir,
    select_pdf_file as IPCRoute_select_pdf_file,
    select_sqrt_txt_file as IPCRoute_select_sqrt_txt_file,
    exec_encrypt as IPCRoute_exec_encrypt
} from "../shared-types/src/ipc-route.declare";

import {
    EncodeType
} from "../shared-types/src/encode-type";

@Injectable({
    providedIn: "root"
})


export class OperateService {
    constructor(private ipcRendererService: IPCRendererService) {

    }

    public select_output_dir() {
        return from(
            this.ipcRendererService.invoke<
                Params<IPCRoute_select_output_dir<any>>,
                Awaited<ReturnType<IPCRoute_select_output_dir<any>>>
            >("select_output_dir")
        );
    }

    public select_pdf_file() {
        return from(
            this.ipcRendererService.invoke<
                Params<IPCRoute_select_pdf_file<any>>,
                Awaited<ReturnType<IPCRoute_select_pdf_file<any>>>
            >("select_pdf_file")
        );
    }

    public select_sqrt_txt_file() {
        return from(
            this.ipcRendererService.invoke<
                Params<IPCRoute_select_sqrt_txt_file<any>>,
                Awaited<ReturnType<IPCRoute_select_sqrt_txt_file<any>>>
            >("select_sqrt_txt_file")
        );
    }

    public exec_encrypt(pdf_file_path: string, sqrt_txt_file_path: string, output_dir_path: string, encode_type: keyof EncodeType) {
        return from(
            this.ipcRendererService.invoke<
                Params<IPCRoute_exec_encrypt<any, keyof EncodeType>>,
                Awaited<ReturnType<IPCRoute_exec_encrypt<any, keyof EncodeType>>>
            >("exec_encrypt", pdf_file_path, sqrt_txt_file_path, output_dir_path, encode_type)
        );
    }
}
