import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard/dashboard.component";

// report
import { ReportComponent } from "./report/report.component";
import { CostReportComponent } from "./report/cost-report/cost-report.component";
import { EditReportComponent } from "./report/edit-report/edit-report.component"; // this is a shared component

// record
import { RecordMoneyComponent } from "./record/record-money.component";
import { RecordIncomeComponent } from "./record/record-income/record-income.component";
import { RecordCostComponent } from "./record/record-cost/record-cost.component";
import { SettingComponent } from "./setting/setting.component";
import { CategoryEditComponent } from './setting/category-edit/category-edit.component';

const moneyRoute: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "report", component: ReportComponent },
  { path: "addRecord", component: RecordMoneyComponent },
  { path: "setting", component: SettingComponent }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(moneyRoute)],

  declarations: [
    DashboardComponent,
    // report
    ReportComponent,
    CostReportComponent,
    EditReportComponent,
    // record
    RecordMoneyComponent,
    RecordCostComponent,
    RecordIncomeComponent,
    SettingComponent,
    CategoryEditComponent
  ]
})
export class MoneyModule {}
