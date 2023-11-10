import { Component, ViewChild } from "@angular/core";
import {
  NgForm,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "app/shared/auth/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl("USER#003", [Validators.required]),
    password: new UntypedFormControl("KLSDKJ32", [Validators.required]),
    rememberMe: new UntypedFormControl(true),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined, {
      type: "ball-triangle-path",
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      fullScreen: true,
    });

    this.authService
      .signinUser(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (response: any) => {
          console.log("Response", response);
          localStorage.setItem("access_token", response.data);
          this.spinner.hide();
          this.router.navigate(["/page"]);
        },
        error: (error) => {
          this.isLoginFailed = true;
          this.spinner.hide();
          console.log("error: " + error.message);
        },
      });
  }
}
