import { Component, EventEmitter, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  usersFromHomeComponent = input.required<any>();
  cancelRegister = output<boolean>();
  model : any ={};

  register() {
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
