import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { last, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  showPassword = false;
  showPasswordImg = 'assets/showPassword.png';
  showPasswordAlt = 'Show Password';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.navigateTo('home');
    if (!this.filledFields()) {
      console.log("Please fill in all fields");
      return;
    }
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.sendLoginRequest(JSON.stringify({username, password}))
    }

  filledFields() {
    return this.loginForm.valid;
  }

  async sendLoginRequest(json: string) {
    console.log(json);
    try {
      const response: HttpResponse<any> = await lastValueFrom(
        this.http.post('http://localhost:3000/api/users/login', json, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          observe: 'response',
          responseType: 'text'
        })
      )
      const token = response.headers.get("Authorization");
      if(token) localStorage.setItem("Authorization", token);
     } catch (error) {
      console.error(error);
    }
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
