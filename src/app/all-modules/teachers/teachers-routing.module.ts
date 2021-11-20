import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeachersDetailsComponent } from './teachers-details/teachers-details.component';
import { TeachersAddComponent } from './teachers-add/teachers-add.component';
import { TeachersEditComponent } from './teachers-edit/teachers-edit.component';

const routes: Routes = [
  {
    path: "",
    component: TeachersComponent,
    children: [
      { path: "teachers-list", component: TeachersListComponent },
      { path: "teachers-details", component: TeachersDetailsComponent },
      { path: "teachers-add", component: TeachersAddComponent },
      { path: "teachers-edit", component: TeachersEditComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
