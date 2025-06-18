import { NgModule } from "@angular/core";

import { MainPageRoutingModule } from "./main-page-routing.module";
import { MainPageComponent } from "./main-page.component";
import { FormsModule } from "@angular/forms";  // <<<< import it here
import { NgFor, NgIf } from "@angular/common";

@NgModule({
    declarations: [
        MainPageComponent
    ],
    imports: [
        MainPageRoutingModule,
        FormsModule,
        NgFor
    ],
    providers: [],
    bootstrap: [
        MainPageComponent
    ]
})
export class MainPageModule { }
