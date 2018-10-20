import { Injectable } from "@angular/core";
import { ToshlHttpService } from "./toshl-http.service";
// import { baseURL } from "src/environments/environment";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private coreService: ToshlHttpService) {}

  login(body) {
    return this.coreService.post(body, "/login").pipe(
      map(result => {
        return result;
      })
    );
  }

  // + "auth/google"
  loginThird() {
    return this.coreService.get("/auth/google");
  }
}
