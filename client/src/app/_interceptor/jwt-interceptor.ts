import { HttpInterceptorFn } from '@angular/common/http';
import { Account } from '../_services/account';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const account = inject(Account);

  if (account.currentUser){
    req = req.clone({
      setHeaders : {
        Authorization : `Bearer ${account.currentUser()?.token}` 
      }
    })
  }
  return next(req);
};
