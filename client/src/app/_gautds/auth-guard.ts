import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Account } from '../_services/account';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const account = inject(Account);
  const toastr = inject(ToastrService);

  if (account.currentUser()){
    return true
  }

  else {
    toastr.error('You Shall not pass!');
    return false;
  }

  return true;
};
