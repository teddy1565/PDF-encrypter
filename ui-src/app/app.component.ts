import { Component, OnDestroy, OnInit, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { forkJoin, of, takeUntil, ReplaySubject, Observable, lastValueFrom, interval, timeout, timer } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {


    constructor() {
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
    }

    public ngOnDestroy(): void {
    }

}

@Component({
    selector: "app-title",
    template: "<title>{{ application_title }} {{ application_version }}</title>"
})
export class AppTitleComponent {
    public application_title: string;

    public application_version: string;

    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    /**
     * 這個用於顯示應用程式的標題與版本號，不要做其他事情
     * @param software_information
     */
    constructor() {
        this.application_title = "PDF Encryptor";
        this.application_version = "1.0.0";
    }
}
