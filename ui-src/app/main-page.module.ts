import { NgModule } from "@angular/core";

import { MainPageRoutingModule } from "./main-page-routing.module";
import { MainPageComponent } from "./main-page.component";
import { FormsModule } from "@angular/forms";  // <<<< import it here

@NgModule({
    declarations: [
        MainPageComponent
    ],
    imports: [
        MainPageRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [
        MainPageComponent
    ]
})
export class MainPageModule { }
