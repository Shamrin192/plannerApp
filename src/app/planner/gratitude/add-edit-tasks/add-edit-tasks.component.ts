import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GratitudeService } from '../../../services/gratitude.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


interface JournalEntry{
    entryDate: Date;
    gratitudeList:string[];
    bestPart: string;
    tomorrow: string;
}

@Component({
  selector: 'app-add-edit-tasks',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-edit-tasks.component.html',
  styleUrl: './add-edit-tasks.component.scss'
})
export class AddEditTasksComponent implements OnInit{

  
isEditing:boolean = false;


gratitudeList: string[]= ['','',''];
bestPart: string ='';
tomorrow: string='';

constructor(private gratitudeService: GratitudeService, private router:Router, private route: ActivatedRoute){}

ngOnInit(): void {
  const entryDate = this.route.snapshot.paramMap.get('date');
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const userId = userDetails._id;

    if(userId && entryDate){
      this.isEditing = true;
      this.gratitudeService.getGratitudeListbyDate(userId,entryDate).subscribe({
        next:(res:any)=>{
          this.gratitudeList = [...res.gratitudeList];
          this.bestPart = res.bestPart;
          this.tomorrow = res.tomorrow;
        },
        error: (err) => console.error('Error loading entry', err),
      })
    }

}
onSave(){
  const entryDate = new Date().toISOString();
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const userId = userDetails._id.toString();
    
    this.gratitudeService.saveGratitude(
      userId,
      entryDate,
      this.gratitudeList,
      this.bestPart,
      this.tomorrow
    ).subscribe({
      next:(res)=>{
        console.log('Saved!', res);
        this.router.navigate(['/gratitude'])
      },
      error: (err) => console.error('Error saving gratitude', err)
    })
}

}
