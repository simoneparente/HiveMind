import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth/auth.service';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FooterComponent],
  providers: [RestBackendService],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  restBackendService = inject(RestBackendService);
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  logoImg = 'assets/HiveMindLogo.png';
  logoAlt = 'HiveMind Logo';
  showPasswordImg = 'assets/showPassword.png';
  showPasswordAlt = 'Show Password';
  showPassword = false;
  
  constructor(
    private readonly router: Router,
  ) {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }

  login() {
    if (!this.loginForm.valid) {
      this.toastr.error('Please fill in all fields');
      return;
    }
    const request = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? '',
    };
    this.restBackendService.login(request).subscribe({
      next: (response) => {
        console.log('Login response headers: ', response.headers);
        const token = response.headers.get('Authorization');
        this.authService.updateToken(token);
        this.toastr.success(
          `Login was successful!`,
          `Welcome ${this.loginForm.value.username}!`,
        );
        this.navigateTo('home');
      },
      error: (err) => {
        this.toastr.error(
          'Please, insert a valid username and password',
          'Oops! Invalid credentials',
        );
      },
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  navigateTo(endpoint: string) {
    this.router.navigate([`/${endpoint}`]);
  }
}
