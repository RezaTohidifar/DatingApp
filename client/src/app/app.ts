import { HttpClient } from '@angular/common/http';
import { Component, inject, OnChanges, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  protected readonly title = signal('DatingApp');
  public http = inject(HttpClient);
  public users: any;

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/users').subscribe({
      next: Response => this.users = Response,
      error: error => console.log(error),
      complete:  () => console.log("done")
    })
  }
}
