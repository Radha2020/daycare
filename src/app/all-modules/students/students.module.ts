import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";

import { StudentsRoutingModule } from "./students-routing.module";
import { StudentsComponent } from "./students.component";
import { StudentsListComponent } from "./students-list/students-list.component";
import { StudentsDetailsComponent } from "./students-details/students-details.component";
import { StudentsAddComponent } from "./students-add/students-add.component";
import { StudentsEditComponent } from "./students-edit/students-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsListComponent,
    StudentsDetailsComponent,
    StudentsAddComponent,
    StudentsEditComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class StudentsModule {}
