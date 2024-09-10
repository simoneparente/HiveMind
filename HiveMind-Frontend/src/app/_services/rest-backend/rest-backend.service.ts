import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRequest } from './auth-request.type';

@Injectable({
  providedIn: 'root'
})
export class RestBackendService {
  url = "http://localhost:3000/api";
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  login(loginRequest: AuthRequest) {
    return this.http.post<{ token: string }>(this.url + "/users/login", loginRequest, this.httpOptions);
  }

  register(registerRequest: AuthRequest){
    return this.http.post(this.url + "/users/register", registerRequest, this.httpOptions)
  }

}
