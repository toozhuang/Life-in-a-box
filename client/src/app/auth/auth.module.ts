import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const authRoute: Routes = [
  // {
  //   path: "",
  //   redirectTo: "auth",
  //   pathMatch: "full"
  // },
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(authRoute)],
  declarations: [AuthComponent, LoginComponent, RegisterComponent]
})
export class AuthModule {}
