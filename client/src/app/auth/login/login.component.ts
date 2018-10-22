import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/service/core/auth.service";

// third
import * as Cookies from "js-cookie";
import { Router } from "@angular/router";
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

    console.log(" worked", this.validateForm.value);
    this.authService.login(this.validateForm.value).subscribe((value: any) => {
      console.log(" login in : ", value);
      if (value.status === 200) {
        // 添加type cookie, 虽然也没什么用, 毕竟存储的是id 为什么还要添加呢?  煞笔把
        // Cookies.set("type", value.type, { expires: 30 });
      }
    });
  }

  constructor(
    private route: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  // google login stuff
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
