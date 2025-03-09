import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRequest } from './auth-request.type';
import {
  CommentType,
  IdeaPublishType,
  IdeaType,
  ResponseType,
  VoteRequest,
} from './idea.type';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RestBackendService {
  url = 'http://localhost:3000/api';
  authService = inject(AuthService);
  constructor(private readonly http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  login(loginRequest: AuthRequest): Observable<any> {
    return this.http.post(this.url + '/auth/login', loginRequest, {
      headers: this.httpOptions.headers,
      observe: 'response' as const,
    });
  }

  register(registerRequest: AuthRequest) {
    return this.http.post(
      this.url + '/auth/register',
      registerRequest,
      this.httpOptions,
    );
  }

  getIdeas(sortBy: string): Observable<IdeaType[]> {
    return this.http.get<IdeaType[]>(
      this.url + `/ideas/get?sortBy=${sortBy}`,
      this.httpOptions,
    );
  }

  publishIdea(ideaRequest: IdeaPublishType) {
    return this.http.post(
      this.url + '/ideas/new',
      ideaRequest,
      this.httpOptions,
    );
  }

  getIdeaInfo(id: number): Observable<IdeaType> {
    return this.http.get<IdeaType>(
      this.url + `/ideas/get/:${id}`,
      this.httpOptions,
    );
  }

  upvoteIdea(request: VoteRequest): Observable<ResponseType> {
    return this.http.put<ResponseType>(
      this.url + `/votes/upvote/:${request.ideaID}`,
      request,
      this.httpOptions,
    );
  }

  downvoteIdea(request: VoteRequest): Observable<ResponseType> {
    return this.http.put<ResponseType>(
      this.url + `/votes/downvote/:${request.ideaID}`,
      request,
      this.httpOptions,
    );
  }

  publishComment(request: CommentType): Observable<ResponseType> {
    return this.http.put<ResponseType>(
      this.url + `/comments/${request.ideaID}`,
      request,
      this.httpOptions,
    );
  }
}
