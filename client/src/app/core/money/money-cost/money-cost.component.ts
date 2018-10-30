import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CostService } from "src/app/service/money/cost.service";

import * as moment from "moment";
import { NzNotificationService } from "ng-zorro-antd";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-money-cost",
  templateUrl: "./money-cost.component.html",
  styleUrls: ["./money-cost.component.css"]
})
export class MoneyCostComponent implements OnInit {
  costForm: FormGroup;

  accountBookList: any[] = [];
  categoryList: any[] = [];

  subCategoryList: string[] = [];

  save() {
    if (this.costForm.valid && 0 + this.costForm.get("cost").value != 0) {
      console.log(" this form : ", this.costForm);
      this.moneyService.create(this.costForm.value).subscribe(value => {
        console.log("check the status: ", value);
        this.notification.create("success", "创建成功", "数据创建成功.", {
          nzDuration: 1000
        });
        this.resetForm();
      });
    }
  }

  /**
   * load the page and set the default value of each formcontrol
   */
  ngOnInit() {
    forkJoin(
      this.moneyService.categoryList(),
      this.moneyService.accountBookList()
    ).subscribe((value: any) => {
      this.categoryList = value[0];
      this.subCategoryList = [...[], ...this.categoryList[0].subCategory];

      this.accountBookList = value[1];
      this.resetForm();
    });
  }

  resetForm() {
    this.costForm.get("category").setValue(this.categoryList[0].category);
    this.costForm.get("subCategory").setValue(this.subCategoryList[0]);
    this.costForm.get("accountBook").setValue(this.accountBookList[0]);
    this.costForm.get("costDate").setValue(moment().format("MM-DD-YYYY HH:mm"));
    this.costForm.get("note").setValue("");
    this.costForm.get("cost").setValue(0);
  }

  resetSubCategorylist(event) {
    console.log(event);
    this.subCategoryList = [
      ...[],
      ...this.categoryList.filter(item => item.category === event)[0]
        .subCategory
    ];
    this.costForm.get("subCategory").setValue(this.subCategoryList[0]);
  }

  constructor(
    private notification: NzNotificationService,
    private moneyService: CostService,
    private fb: FormBuilder
  ) {
    this.costForm = this.fb.group({
      cost: [0, [Validators.required]],
      subCategory: [null, [Validators.required]],
      category: [null, [Validators.required]],
      costDate: [null, [Validators.required]],
      accountBook: [null, [Validators.required]],
      repeatAble: [false, [Validators.required]],
      note: [null]
    });
  }
}
