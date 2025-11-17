import { ChangeDetectorRef, Component, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../_services/account';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone : true,
  imports: [FormsModule,BsDropdownModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  model : any = {};
  constructor(public account : Account){};

  login() {
    this.account.login(this.model).subscribe({
      next: (response: any) => {
      },
      error: (error: any) => console.log(error)
    });   
  }

  logout(){
    this.account.logout();
  }
}
