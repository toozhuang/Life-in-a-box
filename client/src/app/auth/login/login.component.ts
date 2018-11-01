import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/service/core/auth.service";

// third
import * as Cookies from "js-cookie";
import { Router } from "@angular/router";
import { StatusCheckInterface } from "src/app/service/interface/status.interface";
import { NzMessageService } from "ng-zorro-antd";

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
    private message: NzMessageService,
    private route: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  //TODO: google login stuff
  public auth2: any;
  public googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "476464475225-g7f37145f17onm1gpfir9o657ht9uft0.apps.googleusercontent.com",
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
        // console.log("Token || " + googleUser.getAuthResponse().id_token);
        // console.log("ID: " + profile.getId());
        // console.log("Name: " + profile.getName());
        // console.log("Image URL: " + profile.getImageUrl());
        // console.log("Email: " + profile.getEmail());
        //YOUR CODE HERE
        // this.route.navigateByUrl("/core");
        this.authService.loginThird(profile.getId()).subscribe(value => {
          console.log(value);
          // 判断登录是否成功
        });
      },
      error => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
