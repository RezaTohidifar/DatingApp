import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css',
})
export class TestErrors {
  baseUrl = 'http://localhost:5000/api/';
  private http = inject(HttpClient);

  get500error(){
    this.http.get(this.baseUrl + 'Buggy/server-error').subscribe({
      next : response => console.log(response),
      error :  error => console.log(error)
      
    })
  }

  get400error(){
    this.http.get(this.baseUrl + 'Buggy/bad-request').subscribe({
      next : response => console.log(response),
      error :  error => console.log(error)
      
    })
  }

  getRegistererror(){
    this.http.post(this.baseUrl + 'Account/register',{}).subscribe({
      next : response => console.log(response),
      error :  error => console.log(error)
      
    })
  }
}
