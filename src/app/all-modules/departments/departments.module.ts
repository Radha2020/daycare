import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DepartmentsRoutingModule } from "./departments-routing.module";
import { DepartmentsComponent } from "./departments.component";
import { DepartmentsListComponent } from "./departments-list/departments-list.component";
import { DataTablesModule } from "angular-datatables";
import { DepartmentsAddComponent } from "./departments-add/departments-add.component";
import { DepartmentsEditComponent } from "./departments-edit/departments-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentsListComponent,
    DepartmentsAddComponent,
    DepartmentsEditComponent,
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DepartmentsModule {}
