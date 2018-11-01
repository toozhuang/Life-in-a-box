import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { CostService } from "src/app/service/money/cost.service";

import { NzNotificationService } from "ng-zorro-antd";

@Component({
  selector: "app-edit-report",
  templateUrl: "./edit-report.component.html",
  styleUrls: ["./edit-report.component.css"]
})
export class EditReportComponent implements OnInit, OnDestroy {
  @Input()
  categoryList: any[];

  @Input()
  cost;

  @Output()
  toggleEvent: EventEmitter<any> = new EventEmitter<any>();

  subCategoryList: string[] = [];

  provinceData = ["1", "2", "3", "购物消费", "家居日用"];
  costForm: FormGroup;

  constructor(
    private notification: NzNotificationService,
    private costService: CostService,
    private fb: FormBuilder
  ) {
    this.costForm = this.fb.group({
      cost: [null, [Validators.required]],
      subCategory: [null, [Validators.required]],
      category: [null, [Validators.required]],
      costDate: [null, [Validators.required]],
      accountBook: new FormControl(
        { value: "", disabled: true },
        Validators.required
      ),
      note: [null]
    });
  }

  ngOnInit() {
    console.log(" 来了么?", this.categoryList);
    this.costForm.patchValue(this.cost);
    this.subCategoryList = [
      ...[],
      ...this.categoryList.filter(
        item => item.category === this.cost.category
      )[0].subCategory
    ];
  }

  save() {
    // console.log(this.costForm.value);
    this.costService
      .save({
        ...this.cost,
        ...this.costForm.value
      })
      .subscribe((result: any) => {
        this.cost = {
          ...this.cost,
          ...this.costForm.value
        };
        console.log(this.cost);
        this.toggleEvent.emit(result.cost);
        this.notification.create("success", "更新成功", "数据更新成功.", {
          nzDuration: 1000
        });
      });
  }

  ngOnDestroy(): void {
    console.log("destory");
  }

  provinceChange(event) {
    console.log("some thing happen");
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
}
