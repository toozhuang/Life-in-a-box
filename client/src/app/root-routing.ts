import { Routes } from "@angular/router";

export const rootRoutes: Routes = [
  // { path: "", redirectTo: "/auth", pathMatch: "full" },
  { path: "", loadChildren: "./auth/auth.module#AuthModule" },
  { path: "core", loadChildren: "./core/core.module#CoreModule" }

  // { path: "login", component: LoginComponent },
  // { path: "register", component: RegisterComponent },
  // // 如果登录成功
  // // 注意， 之前卡在这个地方， 这个地方用的地址是相对地址，不然找不到
  // { path: "core", loadChildren: "./core.module#CoreModule" },
  // { path: "404", component: NotFoundComponent }
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes', component: HeroesComponent }
];
