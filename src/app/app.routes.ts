import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlannerComponent } from './planner/planner.component';
import { authGuard } from './auth/auth.guard';
import { GratitudeComponent } from './planner/gratitude/gratitude.component';
import { PrioritiesComponent } from './planner/priorities/priorities.component';
import { ToDoTasksComponent } from './planner/to-do-tasks/to-do-tasks.component';
import { NotesComponent } from './planner/notes/notes.component';
import { RegisterComponent } from './register/register.component';
import { AddEditTasksComponent } from './planner/gratitude/add-edit-tasks/add-edit-tasks.component';
import { AddEditNotesComponent } from './planner/notes/add-edit-notes/add-edit-notes.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component:LoginComponent
    },
    {
        path: 'register',
        component:RegisterComponent
    },
    {
        path: 'planner',
        component: PlannerComponent,
        canActivate: [authGuard]
    },
    {
        path: 'gratitude',
        component: GratitudeComponent
    },
    {
        path: 'gratitude/add',
        component: AddEditTasksComponent
    },
    {
        path: 'gratitude/edit/:date',
        component: AddEditTasksComponent
    },
    {
        path: 'priorities',
        component: PrioritiesComponent
    },
    {
        path: 'toDoTasks',
        component: ToDoTasksComponent,
        children:[
            {
                path:'add-edit-tasks',
                component:AddEditTasksComponent
            }
        ]
    },
    {
        path: 'notes',
        component: NotesComponent,
    },
    {
                path:'notes/add-notes',
                component:AddEditNotesComponent
            },
            {
                path:'notes/edit-notes/:id',
                component:AddEditNotesComponent
            }
];
