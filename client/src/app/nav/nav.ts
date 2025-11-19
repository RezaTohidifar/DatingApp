import { ChangeDetectorRef, Component, inject, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../_services/account';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone : true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive,TitleCasePipe],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  model : any = {};
  constructor(public account : Account){};

  private router = inject(Router);
  private toastr = inject(ToastrService)

  login() {
    this.account.login(this.model).subscribe({
      next: (response: any) => {
        this.router.navigateByUrl('/messages')
        this.toastr.success('Logged In Successfuly');
      },
      error: (error: any) => this.toastr.error('Invalid Username Or Password', 'Login Failed')

    });   
  }

  logout(){
    this.account.logout();
    this.router.navigateByUrl('/home');
    this.toastr.success('Logged Out Successfuly');
  }
}
