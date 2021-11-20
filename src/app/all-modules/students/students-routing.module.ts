import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsDetailsComponent } from './students-details/students-details.component';
import { StudentsComponent } from './students.component';
import { StudentsAddComponent } from './students-add/students-add.component';
import { StudentsEditComponent } from './students-edit/students-edit.component';

const routes: Routes = [
  {
    path: "",
    component: StudentsComponent,
    children: [
      { path: "students-list", component: StudentsListComponent },
      { path: "students-details", component: StudentsDetailsComponent },
      { path: "students-add", component: StudentsAddComponent },
      { path: "students-edit", component: StudentsEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
