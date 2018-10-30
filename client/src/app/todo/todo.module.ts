import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { TInboxComponent } from "./inbox/inbox.component";
import { AuthGuard } from "../service/auth.guard";

const todoRoute: Routes = [
  {
    path: "",
    redirectTo: "/inbox"
  },
  {
    path: "/inbox",
    component: TInboxComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(todoRoute)],
  declarations: [TInboxComponent]
})
export class TodoModule {}
