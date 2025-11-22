import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-test-errors',
  imports: [RouterLink],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css',
})
export class TestErrors {
  baseUrl = 'http://localhost:5000/api/';
  private http = inject(HttpClient);
  errorValidation : string[] = [];

  get500error(){
    this.http.get(this.baseUrl + 'Buggy/server-error').subscribe({
      next : response => console.log(response),
      error :  error => {console.log(error);
        this.errorValidation = error;
      }
      
    })
  }

  get400error(){
    this.http.get(this.baseUrl + 'Buggy/bad-request').subscribe({
      next : response => console.log(response),
      error :  error => {console.log(error);
        this.errorValidation = error;
      }
    })
  }

  getRegistererror(){
    this.http.post(this.baseUrl + 'Account/register',{}).subscribe({
      next : response => console.log(response),
      error :  error => {console.log(error);
        this.errorValidation = error;
      }
    })
  }
}
