import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotesService } from '../../../services/notes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-notes',
  imports: [RouterModule, FormsModule],
  templateUrl: './add-edit-notes.component.html',
  styleUrl: './add-edit-notes.component.scss'
})
export class AddEditNotesComponent implements OnInit{
  constructor(private noteService: NotesService, private router: Router, private route: ActivatedRoute){}

  content: string ='';
  title : string ='';
  isEditing:boolean = false;
  id:string=''

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    
    this.getNotes();
  }

  saveNote(){
    const entryDate = new Date().toISOString();
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const userId = userDetails._id.toString();
    
    if(this.isEditing && this.id){
      this.noteService.editNotes(this.id, this.content, this.title).subscribe({
        next:(res:any)=>{
          this.title = res.title;
          this.content = res.content;
          this.router.navigate(['/notes'])
        },
        error: (err)=> console.error('Error loading entries', err)
      })
    }else{
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
    
  }

  editNotes(){

  }

  getNotes(){
    if(this.id){
      this.isEditing = true;
      this.noteService.getNoteById(this.id).subscribe({
      next:(res: any)=>{
        this.title = res.title;
        this.content = res.content
      },
      error: (err)=> console.error('Error loading entries', err)
    })
    }
  }

}
