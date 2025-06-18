/* eslint-disable no-undef */
import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { NgFor, NgIf } from "@angular/common";
import { switchMap, distinctUntilChanged, catchError, map } from "rxjs/operators";
import { forkJoin, of, takeUntil, ReplaySubject, Observable, lastValueFrom, interval, timer } from "rxjs";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";

import {
    EncodeType
} from "./shared-types/src/encode-type";


import {
    OperateService
} from "./@services/operate.service";

@Component({
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.css"],
    host: {
        "[attr.data-component]": "main-page"
    }
})
export class MainPageComponent implements OnInit, OnDestroy {

    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    protected readonly encode_types: Array<[keyof EncodeType, string]> = [
        ["utf8", "UTF-8"],
        ["big5", "Big5"],
        ["gbk", "GBK"]
    ];

    protected encode_type: keyof EncodeType = "utf8";

    protected pdf_file_path: string = "";

    protected sqrt_txt_file_path: string = "";

    protected output_dir_path: string = "";



    constructor(private operate_service: OperateService) {
    }

    public ngOnInit() {
    }

    public ngAfterViewInit() {
    }

    public ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    protected select_pdf(): void {
        this.operate_service.select_pdf_file().pipe(
            takeUntil(this._destroyed$),
        ).subscribe((pdf_file_path) => {
            if (pdf_file_path) {
                console.log(`Selected PDF file: ${pdf_file_path}`);
                this.pdf_file_path = pdf_file_path;
            } else {
                console.log("No PDF file selected.");
                this.pdf_file_path = "";
            }
        });
    }

    protected select_sqrt_text(): void {
        this.operate_service.select_sqrt_txt_file().pipe(
            takeUntil(this._destroyed$),
        ).subscribe((sqrt_txt_file_path) => {
            if (sqrt_txt_file_path) {
                console.log(`Selected square root text file: ${sqrt_txt_file_path}`);
                this.sqrt_txt_file_path = sqrt_txt_file_path;
            } else {
                console.log("No square root text file selected.");
                this.sqrt_txt_file_path = "";
            }
        });
    }

    protected select_output_dir(): void {
        this.operate_service.select_output_dir().pipe(
            takeUntil(this._destroyed$),
        ).subscribe((output_dir_path) => {
            if (output_dir_path) {
                console.log(`Selected output directory: ${output_dir_path}`);
                this.output_dir_path = output_dir_path;
            } else {
                console.log("No output directory selected.");
                this.output_dir_path = ""
            }
        });
    }

    protected exec_encrypt(): void {

    }
}
