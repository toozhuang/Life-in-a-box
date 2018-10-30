import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { CoreComponent } from "./core/core.component";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "../service/auth.guard";
import { MoneyReportComponent } from "./money-report/money-report.component";
import { MoneyEditComponent } from "./money-edit/money-edit.component";
import { MoneyAddComponent } from "./money/money-add/money-add.component";
import { MoneyCostComponent } from "./money/money-cost/money-cost.component";
import { MoneyIncomeComponent } from "./money/money-income/money-income.component";

const coreRoute: Routes = [
  {
    path: "",
    component: CoreComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/money/dashboard", pathMatch: "full" },
      { path: "money/dashboard", component: DashboardComponent },
      { path: "money/report", component: MoneyReportComponent },
      { path: "money/addRecord", component: MoneyAddComponent },
      { path: "todo/inbox", loadChildren: "../todo/todo.module#TodoModule" }
    ]
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(coreRoute)],
  declarations: [
    CoreComponent,
    DashboardComponent,
    MoneyReportComponent,
    MoneyEditComponent,
    MoneyAddComponent,
    MoneyCostComponent,
    MoneyIncomeComponent
  ]
})
export class CoreModule {}
