import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { menu } from "src/app/dataset/menu.data";
import { AuthService } from "src/app/service/core/auth.service";
import { StatusCheckInterface } from "src/app/service/interface/status.interface";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { Router } from "@angular/router";

@Component({
  selector: "app-core",
  templateUrl: "./core.component.html",
  styleUrls: ["./core.component.css"]
})
export class CoreComponent implements OnInit {
  width = "200";

  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild("trigger")
  customTrigger: TemplateRef<void>;

  menuList = menu;

  constructor(
    private message: NzMessageService,
    private router: Router,
    private authService: AuthService,
    private modalService: NzModalService
  ) {}

  /** custom trigger can be TemplateRef **/
  // changeTrigger(): void {
  //   this.triggerTemplate = this.customTrigger;
  // }

  test(value) {
    console.log(" what happen here : ", value);
    // this.width == "200";
  }

  collapseTrigger() {
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed);
  }
  ngOnInit() {}

  ngAfterViewInit() {
    console.log(this.isCollapsed);
    // this.changeTrigger();
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: "<i>Do you want to logout</i>",
      nzContent: "<b>You will be logout in 1 sec</b>",
      nzOnOk: () => this.logout()
    });
  }

  logout() {
    this.authService.logout().subscribe((value: StatusCheckInterface) => {
      console.log("value:", value);
      if (value.status) {
        this.message.create(
          "success",
          "Logout successful, redirect to login page in 1 sec"
        );
        setTimeout(() => {
          this.router.navigateByUrl("/auth");
        }, 1000);
      }
    });
  }
}
