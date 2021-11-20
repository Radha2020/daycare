import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SubjectsRoutingModule } from "./subjects-routing.module";
import { SubjectsComponent } from "./subjects.component";
import { SubjectsListComponent } from "./subjects-list/subjects-list.component";
import { DataTablesModule } from "angular-datatables";
import { SubjectsAddComponent } from "./subjects-add/subjects-add.component";
import { SubjectsEditComponent } from "./subjects-edit/subjects-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SubjectsComponent,
    SubjectsListComponent,
    SubjectsAddComponent,
    SubjectsEditComponent,
  ],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SubjectsModule {}
