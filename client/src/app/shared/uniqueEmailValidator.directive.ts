import { Injectable, forwardRef } from "@angular/core";
import { Directive } from "@angular/core";
import {
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  EmailValidator
} from "@angular/forms";

import { map, catchError } from "rxjs/operators";

import { AuthService } from "../service/core/auth.service";

@Injectable({ providedIn: "root" })
export class UniqueEmailValidator {
  constructor(private authService: AuthService) {}

  validate(abControl: AbstractControl) {
    return this.authService.checkEmail(abControl.value).pipe(
      map(istaken => {
        if (istaken) {
          return { emailTaken: true };
        }
        return null;
      }),
      catchError(() => null)
    );
  }
}

// 下面是使用的directive

@Directive({
  selector: "emailTakenCheck",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueEmailValidator),
      multi: true
    }
  ]
})
export class NameDirective {
  constructor(private validator: EmailValidator) {}

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
