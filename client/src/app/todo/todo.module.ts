import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../service/auth.guard";
import { TInboxComponent } from "./t-inbox/t-inbox.component";
import { TArchieveComponent } from "./t-archieve/t-archieve.component";
import { TodoService } from "../service/todo/todo.service";
import { SlideTodoComponent } from "./slide-todo/slide-todo.component";
import { ToggleTodoService } from "../service/todo/toggle-todo.service";

const todoRoute: Routes = [
  // default to inbox component
  {
    path: "",
    redirectTo: "inbox",
    pathMatch: "full"
  },
  {
    path: "inbox",
    component: TInboxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "archieve",
    component: TArchieveComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(todoRoute)],
  declarations: [TInboxComponent, TArchieveComponent, SlideTodoComponent],
  providers: [TodoService, ToggleTodoService],
  entryComponents: [SlideTodoComponent]
})
export class TodoModule {}
