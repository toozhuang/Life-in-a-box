import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-record-money",
  templateUrl: "./record-money.component.html",
  styleUrls: ["./record-money.component.css"]
})
export class RecordMoneyComponent implements OnInit {
  // <i nz-icon type="right" theme="outline"></i>
  // <i nz-icon type="frown" theme="outline"></i>
  // <i nz-icon type="smile" theme="outline"></i>
  tabs = [
    {
      active: true,
      name: "支出",
      icon: "frown",
      type: 0
    },
    {
      active: false,
      name: "收入",
      icon: "smile",
      type: 1
    }
  ];
  constructor() {}

  ngOnInit() {}
}
