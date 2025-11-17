import { Component, EventEmitter, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../_services/account';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  account = inject(Account);
  cancelRegister = output<boolean>();
  model : any ={};

  register() {
    this.account.register(this.model).subscribe({
      next : response => {
        console.log(response);
        this.cancel();
      },
      error : error => console.log(error)
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
