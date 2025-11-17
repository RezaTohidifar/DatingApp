import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, ChangeDetectorRef, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./nav/nav";
import { Account } from './_services/account';

@Component({
  selector: 'app-root',
  imports: [Nav],
  templateUrl: './app.html'
})
export class App implements OnInit {
  protected readonly title = signal('DatingApp');
  protected readonly users = signal<any[]>([]);
  http = inject(HttpClient);
  constructor(private account : Account){};

  ngOnInit(): void {
    this.getUsers();
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

  getUsers() {
    this.http.get<any[]>('http://localhost:5000/api/users').subscribe({
      next: (response) => {
        this.users.set(response);
        console.log('Users updated and change detection triggered');
      },
      error: (error) => console.log(error),
      complete: () => console.log("done")
    });
  }
}