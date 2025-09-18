import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-to-do-tasks',
  imports: [MatIcon],
  templateUrl: './to-do-tasks.component.html',
  styleUrl: './to-do-tasks.component.scss'
})
export class ToDoTasksComponent implements OnInit{

  ngOnInit(): void {
    
  }

  addTasks(){

  }
}
