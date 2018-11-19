import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { CostService } from "src/app/service/money/cost.service";
import { CategoryInterface } from "src/app/service/interface/category.interface";

@Component({
  selector: "app-category-edit",
  templateUrl: "./category-edit.component.html",
  styleUrls: ["./category-edit.component.css"]
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  @Input("type")
  type;

  categoryList: CategoryInterface[];

  indeterminate = false;
  allChecked = false;

  listOfSelection = [
    {
      text: "Select All Row",
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text: "Select Odd Row",
      onSelect: () => {
        // this.dataSet.forEach((data, index) => (data.checked = index % 2 !== 0));
        // this.refreshStatus();
      }
    },
    {
      text: "Select Even Row",
      onSelect: () => {
        // this.dataSet.forEach((data, index) => (data.checked = index % 2 === 0));
        // this.refreshStatus();
      }
    }
  ];

  checkAll(check) {
    console.log("click checked all");
  }

  constructor(private moneyService: CostService) {}

  ngOnInit() {
    console.log(this.type);
    this.moneyService.categoryList().subscribe((result: any) => {
      console.log(result);
      this.categoryList = result;
    });
  }
  ngOnDestroy(): void {
    console.log("destroy: ", this.type);
  }
}
