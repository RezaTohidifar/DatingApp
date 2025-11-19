import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, ChangeDetectorRef, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./nav/nav";
import { Account } from './_services/account';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html'
})
export class App implements OnInit {
  http = inject(HttpClient);
  constructor(private account : Account){};

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const UserString = localStorage.getItem('user');
    if (!UserString) {
      this.account.currentUser.set(null);
      return;}
    const user = JSON.parse(UserString);
    this.account.currentUser.set(user);
    console.log(this.account.currentUser()?.userName);
  }
}