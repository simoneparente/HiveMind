import {
  Injectable,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthState } from './auth-state.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: WritableSignal<AuthState> = signal<AuthState>({
    user: this.getUser(),
    token: this.getToken(), //get token from localStorage, if there
    isAuthenticated: this.verifyToken(this.getToken()), //verify it's not expired
  });

  user = computed(() => this.authState().user);
  token = computed(() => this.authState().token);
  isAuthenticated = computed(() => this.authState().isAuthenticated);

  constructor() {
    effect(() => {
      const token = this.authState().token;
      const user = this.authState().user;
      if (token !== null) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
      if (user !== null) {
        localStorage.setItem('username', user);
      } else {
        localStorage.removeItem('username');
      }
    });
  }

  updateToken(token: string): void {
    const decodedToken: any = jwtDecode(token);
    const user = decodedToken.username;
    this.authState.set({
      user: user,
      token: token,
      isAuthenticated: this.verifyToken(token),
    });
  }

  updateUser(username: string | null) {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      console.error('Invalid username value:', username);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return localStorage.getItem('username');
  }

  verifyToken(token: string | null): boolean {
    if (token !== null) {
      try {
        const decodedToken = jwtDecode(token);
        const expiration = decodedToken.exp;
        if (expiration === undefined || Date.now() >= expiration * 1000) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  isUserAuthenticated(): boolean {
    return this.verifyToken(this.getToken());
  }

  logout() {
    this.authState.set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  }
}
