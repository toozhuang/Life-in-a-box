import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

/**
 * 这个是最底层的service, 所以载入在app root modelue 里面
 */
@Injectable({
  providedIn: "root"
})
export class ToshlHttpService {
  constructor(private http: HttpClient) {}

  get(url) {
    return this.http.get(url);
  }
  post(body, url) {
    console.log("http service post running", url);
    return this.http.post(url, body);
  }
}
