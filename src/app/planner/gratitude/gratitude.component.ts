import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GratitudeService } from '../../services/gratitude.service';

@Component({
  selector: 'app-gratitude',
  imports:[FormsModule, CommonModule, RouterModule],
  templateUrl: './gratitude.component.html',
  styleUrls: ['./gratitude.component.scss']
})
export class GratitudeComponent implements OnInit{

  gratitudeList: string[] = ['', '', ''];
  bestPart: string = '';
  tomorrow: string = '';

  entries: any[] = [];

  constructor(private gratitudeService: GratitudeService){}
  
  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const userId = userDetails._id.toString();
    this.gratitudeService.getGratitudeList(userId).subscribe({
      next:(res: any)=>{
        this.entries = res as any[];
      },
      error: (err)=> console.error('Error loading entries', err)
    })

  }

  deleteEntry(entryId:string){
    if(!confirm('Babe! Are you sure you wanna delete this entry?')) return;
    this.gratitudeService.deleteGratitudeList(entryId).subscribe({
      next:()=>{
        this.entries = this.entries.filter(e=>e._id !== entryId)
      },
      error:(err)=>console.error('Error deleting entry:', err)
    })
  }
}
