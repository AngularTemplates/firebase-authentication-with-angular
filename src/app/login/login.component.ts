import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin().then(res => {
      this.router.navigate(['/user']);
    });
  }

  tryTwitterLogin() {
    this.authService.doTwitterLogin().then(res => {
      this.router.navigate(['/user']);
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin().then(res => {
      this.router.navigate(['/user']);
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value).then(
      res => {
        this.router.navigate(['/invoice-list']);
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
      }
    );
  }
}
