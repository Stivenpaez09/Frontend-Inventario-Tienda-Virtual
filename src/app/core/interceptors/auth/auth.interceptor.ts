import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../services/login.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(LoginService).getToken();
  const isLoginRequest = req.url.includes('/auth/login');

  if (token && req.url.startsWith(environment.apiUrl) && !isLoginRequest) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
