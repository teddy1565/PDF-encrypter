import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    { path: "main-page", loadChildren: () => import("./main-page.module").then((m) => m.MainPageModule) },
    { path: "**", redirectTo: "main-page" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
