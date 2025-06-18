/* eslint-disable no-undef */
import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { NgFor, NgIf } from "@angular/common";
import { switchMap, distinctUntilChanged, catchError, map } from "rxjs/operators";
import { forkJoin, of, takeUntil, ReplaySubject, Observable, lastValueFrom, interval, timer } from "rxjs";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";

@Component({
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.css"],
    host: {
        "[attr.data-component]": "main-page"
    }
})
export class MainPageComponent implements OnInit, OnDestroy {

    constructor() {
    }

    public ngOnInit() {
    }

    public ngAfterViewInit() {
    }

    public ngOnDestroy() {
    }

    protected select_pdf(): void {

    }

    protected select_sqrt_text(): void {

    }

    protected exec_encrypt(): void {

    }
}
