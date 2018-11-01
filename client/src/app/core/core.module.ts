import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { CoreComponent } from "./core/core.component";
import { SharedModule } from "../shared/shared.module";

import { AuthGuard } from "../service/auth.guard";

/**
 * Core component主要肩负起来的任务是 提供一个sidebar, 然后sidebar里面的东西算是整个项目的构成的link
 */
const coreRoute: Routes = [
  {
    path: "",
    component: CoreComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "money", pathMatch: "full" },

      { path: "money", loadChildren: "../money/money.module#MoneyModule" },
      { path: "todo", loadChildren: "../todo/todo.module#TodoModule" }
    ]
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(coreRoute)],
  declarations: [CoreComponent]
})
export class CoreModule {}
