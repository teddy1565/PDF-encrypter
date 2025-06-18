

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent, AppTitleComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; // <<<< import it here
import { HttpClientModule } from "@angular/common/http";

import { HashLocationStrategy, LocationStrategy, NgFor, NgIf } from "@angular/common";

@NgModule({
    declarations: [
        AppComponent,
        AppTitleComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgIf,
        NgFor
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [
        AppComponent,
        AppTitleComponent
    ]
})
export class AppModule {}
