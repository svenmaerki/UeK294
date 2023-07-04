import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (token) {
    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    req = req.clone({
      headers,
    });
  }

  return next(req);
};
