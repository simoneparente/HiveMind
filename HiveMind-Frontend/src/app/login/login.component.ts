  import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
  import { Component, inject } from '@angular/core';
  import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { RouterModule, Router } from '@angular/router';
  import { lastValueFrom } from 'rxjs';
  import {ToastrService} from 'ngx-toastr'
  import { AuthService } from '../_services/auth/auth.service';
  import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule],
    providers: [RestBackendService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent {
    authService = inject(AuthService);
    toastr = inject(ToastrService);
    restBackendService = inject(RestBackendService);
    loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    showPassword = false;
    showPasswordImg = 'assets/showPassword.png';
    showPasswordAlt = 'Show Password';

    constructor(private router: Router, private http: HttpClient) {}

    login() {
      if (!this.loginForm.valid) {
        this.toastr.error("Please fill in all fields");
        return;
      }
      const request = {
        username: this.loginForm.value.username ?? '',
        password: this.loginForm.value.password ?? ''
      }
      console.log(request);
      this.restBackendService.login(request).subscribe({
        next: (response) => {
          this.authService.updateToken(response.token);
        },
        error: (err) => {
          this.toastr.error("Please, insert a valid username and password", "Oops! Invalid credentials");
        },
        complete: () => {
          this.toastr.success(`Login was successful!`, `Welcome ${this.loginForm.value.username}!`);
          this.navigateTo("home");
        }
      });
    }

    toggleShowPassword() {
      this.showPassword = !this.showPassword;
      const passwordInput = document.getElementById('password');
      const passwordToggleIcon = document.querySelector('.showPassword');
      (passwordInput as HTMLInputElement).type = this.showPassword ? 'text' : 'password';
      passwordToggleIcon?.classList.toggle('active');
    }

    navigateTo(endpoint: string) {
      this.router.navigate([`/${endpoint}`]);
    }

  }
