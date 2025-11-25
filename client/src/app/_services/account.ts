import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { map, Observable, using } from 'rxjs';
import { User } from '../_models/Users';
import { RegisterationUser } from '../_models/RegisterationUser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Account {

  constructor(private http: HttpClient) { }
  newUser = signal<User | null>(null);
  currentUser = signal<User | null>(null);
  baseUrl = environment.apiUrl;


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

  register(model: any) {

    return this.http.post<User>(this.baseUrl + 'Account/register', model).pipe(
      map(user => {
        if (user) {
          this.newUser.set(user);
          this.newUser = this.currentUser;
          localStorage.setItem('user', JSON.stringify(user));
          
        }
      })
    );
  }
}
