import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { AuthService } from '../../_services/auth/auth.service';

export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    // Clone request and add Authorization header with token
    request = request.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }

  return next(request);
}
