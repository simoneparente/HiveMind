import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { AuthService } from '../../_services/auth/auth.service';

export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const authService = inject(AuthService);
  const token = authService.getToken();

  //console.log('Token:', token);
  if (token) {
    // Clone the request and add the Authorization header with the token
    //console.log("Adding token to request");
    request = request.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }
  //console.log(request);

  return next(request);
}
