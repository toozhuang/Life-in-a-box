import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from "ng-zorro-antd";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgZorroAntdModule],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  declarations: [],
  exports: [FormsModule, ReactiveFormsModule, NgZorroAntdModule]
})
export class SharedModule {}
