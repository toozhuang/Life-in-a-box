import { Injectable } from "@angular/core";

// import { baseURL } from "src/environments/environment";

import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { StatusCheckInterface } from "../interface/status.interface";
import { LifeHttpService } from "./life-http.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private route: Router, private coreService: LifeHttpService) { }

  logout() {
    return this.coreService.get("api/auth/logout");
  }

  /**
   * 
   * @param body body里面包含type, 根据login的type确定用什么方式login
   */
  login(body) {

    return this.coreService.post(body, '/api/auth/login').pipe(map(result => {
      return result;
    }))


    // if (body.logintype === 'local') {
    //   return this.coreService.post(body, "/api/auth/local").pipe(

    //   );
    // } else {
    //   return this.loginThird(body)
    // }

  }

  loginThird(body) {
    console.log(body.thirdId);
    // 其实进入到这个地方 就已经登录成功了, 拿到了google的ID
    // 接下来是要把这个id存储到我的数据库里面
    return this.coreService.post(
      {
        email: "empty",
        password: "empty",
        thirdId: body.thirdId,
        logintype: body.thirdId.logintype
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
