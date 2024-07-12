import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required ),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    confirmEmail: new FormControl('', [Validators.required, Validators.email])
  })
  showPassword = false;
  showPasswordImg = 'assets/showPassword.png';
  showPasswordAlt = 'Show Password';

  constructor(private router: Router, private http: HttpClient) {}

  filledFields(){
    if(this.registerForm.get('password')?.value != this.registerForm.get('confirmPassword')?.value){
      alert("Passwords do not match")
      return false;
    }
    if(this.registerForm.get('email')?.value != this.registerForm.get('confirmEmail')?.value){
      alert("Emails do not match")
      return false;
    }
    return this.registerForm.valid;
  }

  register(){
    if(!this.registerForm.valid){
      return;
    }
    const username = this.registerForm.get('username')?.value;
    const password = this.registerForm.get('password')?.value;
    const email = this.registerForm.get('email')?.value;
    this.sendRegisterRequest(JSON.stringify({username, password, email}));
  }

  async sendRegisterRequest(request: string){
    try{
      const data = await lastValueFrom(this.http.post('http://localhost:3000/api/users/register', request, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'
      }));
      console.log(data);
      this.navigateTo('login');
    } catch (error){
      console.error(error);
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password');
    const passwordToggleIcons = document.querySelectorAll('.showPassword');
    if (passwordInput) {
      (passwordInput as HTMLInputElement).type = this.showPassword ? 'text' : 'password';
    }
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
      (confirmPasswordInput as HTMLInputElement).type = this.showPassword ? 'text' : 'password';
    }
    passwordToggleIcons.forEach(icon => {
        icon.classList.toggle('active');
    })
  }

  navigateTo(endpoint: string) {
    this.router.navigate([`/${endpoint}`]);
  }
}
