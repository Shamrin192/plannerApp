import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NotesService } from '../../../services/notes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-notes',
  imports: [RouterModule, FormsModule],
  templateUrl: './add-edit-notes.component.html',
  styleUrl: './add-edit-notes.component.scss'
})
export class AddEditNotesComponent implements OnInit{
  constructor(private noteService: NotesService, private router: Router){}

  content: string ='';
  title : string ='';

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const userId = userDetails._id.toString();
    
  }

  saveNote(){
    const entryDate = new Date().toISOString();
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const userId = userDetails._id.toString();
    
    this.noteService.saveNotes(
      userId,
      this.title,
      this.content,
      entryDate,
    ).subscribe({
      next:(res)=>{
        console.log('Saved!', res);
        this.router.navigate(['/notes'])
      },
      error: (err) => console.error('Error saving gratitude', err)
    })
  }

  getNotes(){

  }

}
