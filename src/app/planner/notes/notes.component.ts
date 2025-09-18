import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  imports: [CommonModule,RouterModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit{
  constructor(private noteService : NotesService){}
  notes: any[] = [];

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const userId = userDetails._id.toString();
    this.noteService.getNotes(userId).subscribe({
      next:(res: any)=>{
        this.notes = res as any[];
      },
      error: (err)=> console.error('Error loading entries', err)
    })
  }

  deleteNote(id:string){
    if(!confirm('Babe! Are you sure you wanna delete this entry?')) return;
    this.noteService.deleteNotes(id).subscribe({
      next:()=>{
        this.notes = this.notes.filter(e=>e._id !== id)
      },
      error:(err)=>console.error('Error deleting entry:', err)
    })
  }
}
