import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { PrioritiesComponent } from "./priorities/priorities.component";
import { CalendarViewComponent } from "./calendar-view/calendar-view.component";
import { ToDoTasksComponent } from "./to-do-tasks/to-do-tasks.component";
import { GratitudeComponent } from "./gratitude/gratitude.component";
import { NotesComponent } from "./notes/notes.component";
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-planner',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})
export class PlannerComponent  implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  goToGratitude(){
    this.router.navigate(['/gratitude']);
  }

  goToNotes(){
    this.router.navigate(['/notes']);
  }

  goToPriorities(){
    this.router.navigate(['/priorities']);
  }

  goToTasks(){
    this.router.navigate(['/toDoTasks']);
  }
}
