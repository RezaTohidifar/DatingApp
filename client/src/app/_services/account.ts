import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../_models/Users';

@Injectable({
  providedIn: 'root'
})
export class Account {

  constructor(private http: HttpClient) { }

  currentUser = signal<User | null>(null);
  baseUrl = 'http://localhost:5000/api/'


  login(model: any) {

    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
