import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router : Router, private authService : AuthService) { }
  email: string = '';
  password: string = '';

  ngOnInit(): void {
    // Initialization logic can go here
  }
  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/planner']);
      },
      error: (error: any) => {
        console.error('Login failed', error);
        // Handle login error, e.g., show an error message  
      }
      })
    
  }  
}
