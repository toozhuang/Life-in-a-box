import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.css"]
})
export class SettingComponent implements OnInit {
  type: string;
  activeTab(type) {
    console.log("event: ", type);
    this.type = type;
  }

  constructor() {}

  ngOnInit() {
    this.type = "cost";
  }
}
