import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { CoreComponent } from "./core/core.component";
import { SharedModule } from "../shared/shared.module";

const coreRoute: Routes = [
  {
    path: "",
    component: CoreComponent
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(coreRoute)],
  declarations: [CoreComponent]
})
export class CoreModule {}
