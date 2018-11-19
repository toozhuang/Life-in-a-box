import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output,
  ViewChild,
  TemplateRef
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { CostService } from "src/app/service/money/cost.service";

import {
  NzNotificationService,
  NzModalService,
  NzModalRef,
  NzMessageService
} from "ng-zorro-antd";
import { COST } from "src/app/service/interface/cost.interface";

@Component({
  selector: "app-edit-report",
  templateUrl: "./edit-report.component.html",
  styleUrls: ["./edit-report.component.css"]
})
export class EditReportComponent implements OnInit, OnDestroy {
  // @Input()
  categoryList: any[];

  @Input()
  cost: COST;

  @Output()
  toggleEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("addCategoryModalTitle")
  addCategoryModalTitle;
  @ViewChild("addCategoryModalContent")
  addCategoryModalContent;
  @ViewChild("addCategoryModalFooter")
  addCategoryModalFooter;

  modalTitle: string;
  newCategory: string;
  newSubcategory: string;

  subCategoryList: string[] = [];

  provinceData = ["1", "2", "3", "购物消费", "家居日用"];
  costForm: FormGroup;

  // sub category modal

  @ViewChild("addSubCategoryModalTitle")
  addSubCategoryModalTitle;
  @ViewChild("addSubCategoryModalContent")
  addSubCategoryModalContent;
  @ViewChild("addSubCategoryModalFooter")
  addSubCategoryModalFooter;

  tplModal: NzModalRef;
  tplModalButtonLoading = false;

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
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
    this.costService.categoryList().subscribe((result: any) => {
      this.categoryList = result;
      this.costForm.patchValue(this.cost);
      this.subCategoryList = [
        ...[],
        ...this.categoryList.filter(
          item => item.category === this.cost.category
        )[0].subCategory
      ];
    });
  }

  save() {
    for (const i in this.costForm.controls) {
      this.costForm.controls[i].markAsDirty();
      this.costForm.controls[i].updateValueAndValidity();
    }
    // console.log(this.costForm.value);
    if (this.costForm.valid) {
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
    } else {
      console.log(this.costForm.value);
      this.message.create("error", "提交失败,表格有错误");
    }
  }

  ngOnDestroy(): void {
    console.log("destory");
  }

  provinceChange(event) {
    console.log("some thing happen");
  }

  resetSubCategorylist(event) {
    console.log(event);
    if (event == "icon") {
      this.costForm.get("category").setValue(this.cost.category);
      this.createTplModal(
        this.addCategoryModalTitle,
        this.addCategoryModalContent,
        this.addCategoryModalFooter,
        "category"
      );
    } else {
      // this.costForm.get('category').setValue()
      this.subCategoryList = [
        ...[],
        ...this.categoryList.filter(item => item.category === event)[0]
          .subCategory
      ];
      this.costForm.get("subCategory").setValue(this.subCategoryList[0]);
    }
  }

  addSubCatergory(event) {
    console.log("set the sub ", event);
    if (event === "icon") {
      // this.costForm.get("subCategory").setValue(this.cost.category);
      if (this.subCategoryList && this.subCategoryList.length != 0) {
        this.costForm.get("subCategory").setValue(this.subCategoryList[0]);
      }
      this.createTplModal(
        this.addSubCategoryModalTitle,
        this.addSubCategoryModalContent,
        this.addSubCategoryModalFooter,
        "subCategory"
      );
    }
  }

  createTplModal(
    tplTitle: TemplateRef<{}>,
    tplContent: TemplateRef<{}>,
    tplFooter: TemplateRef<{}>,
    type: string
  ): void {
    this.modalTitle = type;
    if (type === "category") {
      this.tplModal = this.modalService.create({
        nzTitle: tplTitle,
        nzContent: tplContent,
        nzFooter: tplFooter,
        nzMaskClosable: false,
        nzCancelText: "close"
      });
    } else {
      this.tplModal = this.modalService.create({
        nzTitle: tplTitle,
        nzContent: tplContent,
        nzFooter: tplFooter,
        nzMaskClosable: false,
        nzClosable: false
      });
    }
  }

  addSubCategory() {
    let newCategoryOBJ = {
      category: this.costForm.get("category").value,
      accountBook: this.cost.accountBook,
      subCategory: [...this.subCategoryList, this.newSubcategory]
    };
    console.log(newCategoryOBJ);
    this.costService
      .generateCategory(newCategoryOBJ)
      .subscribe((result: any) => {
        this.subCategoryList = [...this.subCategoryList, this.newSubcategory];
        console.log(this.categoryList);
        // 把刚刚新建的category设置为该选择框的值
        this.costForm.get("subCategory").setValue(this.newSubcategory);
        this.destroyTplModal();
      });
  }

  addCategory() {
    let newCategoryOBJ = {
      category: this.newCategory,
      accountBook: this.cost.accountBook,
      subCategory: []
    };
    this.costService
      .generateCategory(newCategoryOBJ)
      .subscribe((result: any) => {
        this.categoryList = [...this.categoryList, result.value];
        console.log(this.categoryList);
        // 把刚刚新建的category设置为该选择框的值
        this.costForm.get("category").setValue(result.value.category);
        this.destroyTplModal();
      });
  }

  destroyTplModal() {
    this.tplModalButtonLoading = true;
    window.setTimeout(() => {
      this.tplModalButtonLoading = false;
      this.tplModal.destroy();
    }, 200);
  }
}
