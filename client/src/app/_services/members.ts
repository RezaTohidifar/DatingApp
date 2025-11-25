import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member } from '../_models/Member';
import { Account } from './account';

@Injectable({
  providedIn: 'root',
})
export class Members {

  private http = inject(HttpClient);
  private account = inject(Account);
  baseUrl = environment.apiUrl ;
  
  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }
  
  getMember(username : string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  // getHttpOptions() {
  //   return {
  //     headers : new HttpHeaders({
  //       Authorization : `Bearer ${this.account.currentUser()?.token}`
  //     })
  //   }
  // }
}
