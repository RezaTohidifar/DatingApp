import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member } from '../_models/Member';
import { Account } from './account';
import { MemberUpdate } from '../_models/MemberUpdate';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Members {

  private http = inject(HttpClient);
  private account = inject(Account);
  baseUrl = environment.apiUrl ;
  members = signal<Member[]>([]);
  
  getMembers() {
    
    return this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
      next : members => this.members.set(members)
    })
  }
  
  getMember(username : string) {
    const member = this.members().find(x => x.userName ===username );
    if (member !==undefined) return of(member)
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMemberInfo(memberInfo : Member) {
    return this.http.put(this.baseUrl + 'users',memberInfo).pipe(
      tap(() => {
        this.members.update(members => members.map(m => m.userName === memberInfo.userName ? memberInfo : m))
      })
    )
  }

}
