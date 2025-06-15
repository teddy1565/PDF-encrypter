
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainPageComponent } from "./main-page.component";

const routes: Routes = [
    {
        path: "",
        component: MainPageComponent,
        children: [
            { path: "home-page", component: MainPageComponent },
            { path: "**", redirectTo: "home-page" }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainPageRoutingModule {}
