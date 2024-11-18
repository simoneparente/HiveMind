import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRequest } from './auth-request.type';
import { IdeaType } from './idea.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestBackendService {
  url = "http://localhost:3000/api";
  constructor(private readonly http: HttpClient) {}

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
  
  getIdeas(){
    return this.http.get(this.url + "/ideas/get", this.httpOptions)
  }

  publishIdea(ideaRequest: IdeaType){
    return this.http.post(this.url + "/ideas/new", ideaRequest, this.httpOptions)
  }

  getIdeaInfo(id: number): Observable<IdeaType>{
    return this.http.get<IdeaType>(this.url + `/ideas/get/:${id}`, this.httpOptions);
  }


}
