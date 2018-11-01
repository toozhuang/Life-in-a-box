import { Injectable } from "@angular/core";
import { LifeHttpService } from "../core/life-http.service";
import { API } from "src/app/dataset/api.list";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CostService {
  constructor(private httpService: LifeHttpService) {}

  /**
   * return all the cost list
   */
  costList() {
    return this.httpService.get(API.costlist).pipe(
      map((result: any) => {
        result.forEach(element => {
          element.expand = false;
        });
        return result;
      })
    );
  }

  categoryList() {
    return this.httpService.get(API.categorylist);
  }

  accountBookList() {
    return this.httpService.get(API.accountBooklist);
  }

  save(cost: any) {
    return this.httpService.post(cost, API.cost);
  }

  create(cost: any) {
    return this.httpService.post(cost, API.cost);
  }
}
