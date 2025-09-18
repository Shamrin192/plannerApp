import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/auth'; // Replace with your actual API URL
  constructor( private http: HttpClient) { }
  
  login(email: string, password: string) {
    // Simulate an API call for login
   return this.http.post<{ token: string,user:any }>(`${this.API_URL}/login`, { email, password });
  }

  register(data : FormData){
    return this.http.post(`${this.API_URL}/register`, data)
  }
  logout() {
    // Simulate an API call for logout
    localStorage.removeItem('authToken');
  }
  saveToken(token: string) {
    // Save the token to local storage or session storage
    localStorage.setItem('authToken', token);
  }

  getToken() {
    // Retrieve the token from local storage or session storage
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in by verifying the token
    const token = this.getToken();
    return !!token; // Returns true if token exists, false otherwise
  }

  setUserDetails(response:any){
    localStorage.setItem('userDetails',JSON.stringify(response?.user))
  }

  getUserDetails(){
    const user = localStorage.getItem('userDetails');
    return user ? JSON.parse(user) : null;
  }

  clearUserDetails(){
    localStorage.removeItem('userDetails');
  }
}
