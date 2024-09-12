import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  restBackendService = inject(RestBackendService);
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required ),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  })
  showPassword = false;
  showPasswordImg = 'assets/showPassword.png';
  showPasswordAlt = 'Show Password';

  constructor(private router: Router, private http: HttpClient) {}
  
  register(){
    if(!this.checkFields()){
      return;
    } else{
      const request = {
        username: this.registerForm.value.username ?? '',
        password: this.registerForm.value.password ?? '',
        email: this.registerForm.value.email ?? ''
      }
      console.log(request);
      this.restBackendService.register(request).subscribe({
        error: (err) => {
          this.toastr.error(err.error, "Error!");
        },
        complete: () => {
          this.toastr.success(`${request.username}'s registration was  successful!`, `Success!`);
          this.navigateTo("login");
        }
    })
    }
  }

  checkFields(){
    if(!this.registerForm.valid){
      this.toastr.error("Please fill in all fields");
      return;
    }
    
    if(!this.passwordMatch()){
      this.toastr.error("Passwords do not match", "Oops! Check passwords")
      return;
    }
    return true;
  }

  passwordMatch() {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
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
