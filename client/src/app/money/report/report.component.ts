import { Component } from "@angular/core";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"]
})
export class ReportComponent {
  tabs = [
    {
      active: false,
      name: "所有",
      icon: "frown",
      type: 0
    },
    {
      active: true,
      name: "支出",
      icon: "smile",
      type: 1
    },
    {
      active: false,
      name: "收入",
      icon: "smile",
      type: 2
    }
  ];
}
