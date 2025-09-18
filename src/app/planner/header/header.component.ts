import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor( private auth : AuthService){}
  selectedDate : string = new Date().toISOString().split('T')[0]; // Default to today's date
  user: any;

  ngOnInit() {
    this.user = this.auth.getUserDetails();
    console.log(this.user)
  }
  onEditProfile(){

  }
  onLogout(){

  }
}
