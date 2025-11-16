import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./nav/nav";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
  templateUrl: './app.html'
})
export class App implements OnInit {
  protected readonly title = signal('DatingApp');
  protected readonly users = signal<any[]>([]);
  http = inject(HttpClient);
  private cdRef = inject(ChangeDetectorRef); // Add this

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/api/users').subscribe({
      next: (response) => {
        this.users.set(response);
        this.cdRef.detectChanges(); // Force change detection
        console.log('Users updated and change detection triggered');
      },
      error: (error) => console.log(error),
      complete: () => console.log("done")
    });
  }
}