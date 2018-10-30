import { AbstractControl } from "@angular/forms";

export function mustBetrueValidator(control: AbstractControl) {
  // const forbidden = nameRe.test(control.value);
  console.log("value: ", control.value);
  // control.value ? null :
  if (control.value) {
    return null;
  } else {
    return { mustBeTrue: true };
  }

  // return null;
}
