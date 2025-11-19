import { Component, EventEmitter, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../_services/account';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  account = inject(Account);
  cancelRegister = output<boolean>();
  model: any = {};
  private toastr = inject(ToastrService);

  register() {
    if (!this.account.currentUser()) {
      this.account.register(this.model).subscribe({
        next: response => {
          this.toastr.success('User Sigend In successfuly')
          this.cancel();
        },
        error: error => this.toastr.error('Sign In Failed')
      });
      return true;
    }
    else {
      return false;
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
