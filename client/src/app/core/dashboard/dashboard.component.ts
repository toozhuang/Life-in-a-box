import { Component, OnInit } from "@angular/core";

import { single, gdp, multi } from "../../dataset/demo.dashboard.data";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  // 默认汇率, 这个后面是从数据库里面抓取
  currency = "$";
  constructor() {
    Object.assign(this, { single });
    Object.assign(this, { gdp });
    Object.assign(this, { multi });
  }

  ngOnInit() {}

  // demo data of ngxChart
  single: any[];
  multi: any[];

  viewLine = [800, 250];
  view: any[] = [500, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Country";
  showYAxisLabel = true;
  yAxisLabel = "Population";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  // pie
  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
}
