import { Injectable } from "@angular/core";
import { ToshlHttpService } from "./toshl-http.service";
// import { baseURL } from "src/environments/environment";

import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { StatusCheckInterface } from "../interface/status.interface";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private route: Router, private coreService: ToshlHttpService) {}


  logout(){
    return this.coreService.get('api/auth/logout')
  }

  login(body) {
    return this.coreService.post(body, "/api/auth/local").pipe(
      map(result => {
        return result;
      })
    );
  }

  loginThird(loginID) {
    console.log(`/api/auth/${loginID}`);
    // 其实进入到这个地方 就已经登录成功了, 拿到了google的ID
    // 接下来是要把这个id存储到我的数据库里面
    return this.coreService.post(
      {
        username: "empty",
        password: "empty",
        id: loginID,
        type: "google"
      },
      `/api/auth/third`
    );
  }

  checkEmail(email: string) {
    return this.coreService.get(`/api/auth/check/${email}`).pipe(
      map((value: StatusCheckInterface) => {
        return value.status;
      })
    );
  }

  loginStatus() {
    return this.coreService.get("/api/auth/current_user").pipe(
      map((value: any) => {
        return value.status;
      })
    );
  }

  register(userObj: any) {
    return this.coreService.post(userObj, "/api/auth/register");
  }

  // + "auth/google"
}
