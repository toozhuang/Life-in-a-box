import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/service/core/auth.service";

// third
import { Router } from "@angular/router";
import { StatusCheckInterface } from "src/app/service/interface/status.interface";
import { NzMessageService } from "ng-zorro-antd";
import { environment } from "src/environments/environment";

declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  // third url

  google: string = "/auth/google";

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    // console.log(" worked", this.validateForm.value);
    this.authService
      .login(this.validateForm.value)
      .subscribe((value: StatusCheckInterface) => {
        console.log(" anything com here ? ", value);
        if (value.status) {
          // login success
          this.route.navigateByUrl("/core");
        } else {
          console.log(value);
          this.message.remove();
          this.createMessage("error", value.message);
        }
      });
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  constructor(
    private ngZone: NgZone,
    private message: NzMessageService,
    private route: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  ngAfterViewInit() {
    this.googleInit();
  }


  // Note: 下面是谷歌登录的逻辑, 来自google的官网, 添加了一点自己的logic
  public auth2: any;
  public googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.auth.google_id,
        cookiepolicy: "single_host_origin",
        scope: "profile email"
      });
      this.attachSignin(document.getElementById("googleBtn"));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      googleUser => {
        let profile = googleUser.getBasicProfile();

        this.authService.loginThird(profile.getId()).subscribe((value: any) => {
          console.log(value);
          if (value.status) {
            // 要把 profile.getId() push到当前的current user的 ID里面去
          } else {
            // 显示需要注册先
            this.message.create('error', '该Gmail用户尚未注册,跳转到注册界面');
            // 跳转到注册界面 Note: 需要用ngZone跳转才可以, 不知道算不算angular的bug
            setTimeout(() => {
              this.ngZone.run(() => this.route.navigateByUrl('/auth/register').then());
            }, 1000);
          }
          // 判断登录是否成功
        });
      },
      error => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }


}
