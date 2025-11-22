import { Component, inject, OnInit, signal } from '@angular/core';
import { Account } from '../_services/account';
import { Register } from "../register/register";
import { HttpClient } from '@angular/common/http';
import { RouterLink } from "@angular/router";



@Component({
  selector: 'app-home',
  imports: [Register, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  users : any;
  registerMode = false;
  constructor(public account: Account) { };
  http = inject(HttpClient);
  ngOnInit(): void {
      this.getUsers();
  }
  
  getUsers() {
    this.http.get('http://localhost:5000/api/users').subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => console.log(error),
      complete: () => console.log("done")
    });
  }

  cancelRegisteration(){
    this.registerMode = false;
  }

  registerToggle() {
    this.registerMode = !this.registerMode
  }

}
