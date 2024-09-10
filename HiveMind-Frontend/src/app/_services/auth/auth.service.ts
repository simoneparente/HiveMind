import { Injectable, WritableSignal, computed, signal, effect } from '@angular/core';
import { AuthStatus } from './auth-status.type';
import {jwtDecode} from 'jwt-decode';
import { AuthRequest } from '../rest-backend/auth-request.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    effect(() =>{
      const token = this.authStatus().token;
      if(token===null) localStorage.removeItem("token");
      else{
        localStorage.setItem("token", token);
      }
      const user = this.authStatus().username;
      if(user===null) localStorage.removeItem("username");
      else{
        localStorage.setItem("username", user);
      }
    })
   }

  authStatus : WritableSignal<AuthStatus> = signal<AuthStatus>({
    username : this.getUsername(),
    token : this.getToken(),
    isAuthenticated : this.verify(this.getToken())
  });


  username = computed(() => this.authStatus().username)
  token = computed(() => this.authStatus().token)
  isAuthenticated = computed(() => this.authStatus().isAuthenticated)

  getUsername(){
    return localStorage.getItem("username")
  }

  getToken(): string | null{
    return localStorage.getItem("token")
  }

  verify(token: string | null): boolean {
    if (!token) return false;
  
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp !== undefined && Date.now() < decodedToken.exp * 1000;
    } catch (error) {
      return false;
    }
  }
  updateToken(token: string): void {
    const decodedToken: any = jwtDecode(token);
    const user = decodedToken.user;
    this.authStatus.set({
      username: user,
      token: token,
      isAuthenticated: this.verify(token)
    })
    console.log(this.authStatus);
  }
}