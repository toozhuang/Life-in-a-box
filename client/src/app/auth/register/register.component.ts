import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { UniqueEmailValidator } from "src/app/shared/uniqueEmailValidator.directive";
import { mustBetrueValidator } from "src/app/shared/mustbetrue.validator";
import { AuthService } from "src/app/service/core/auth.service";
import { StatusCheckInterface } from "src/app/service/interface/status.interface";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;

  generateStatus: number = 0;

  submitForm(): void {
    console.log("创建用户: ", this.validateForm, this.validateForm.valid);

    if (this.validateForm.dirty) {
      if (this.validateForm.valid) {
        this.authService
          .register(this.validateForm.value)
          .subscribe((value: StatusCheckInterface) => {
            console.log("resgister result", value);
            if (value.status) {
              this.generateStatus = 1;
              this.message.create("success", "创建用户成功", {
                nzDuration: 2000
              });
            } else {
              this.generateStatus = -1;
              this.message.create("error", "创建用户失败", {
                nzDuration: 2000
              });
            }
            setTimeout(() => {
              if (this.generateStatus === 1) {
                this.router.navigateByUrl("/auth");
              }
              this.generateStatus = 0;
            }, 2000);
          });
      }
    } else {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  constructor(
    private message: NzMessageService,
    private router: Router,
    private emailTakenValidator: UniqueEmailValidator,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: new FormControl(null, {
        validators: Validators.required,
        asyncValidators: [
          this.emailTakenValidator.validate.bind(this.emailTakenValidator)
        ],
        updateOn: "blur"
      }),
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      username: [null, [Validators.required]],

      agree: new FormControl(false, {
        validators: [mustBetrueValidator]
      })
    });
  }
}
