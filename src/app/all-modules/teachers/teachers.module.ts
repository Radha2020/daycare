import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TeachersRoutingModule } from "./teachers-routing.module";
import { TeachersComponent } from "./teachers.component";
import { TeachersListComponent } from "./teachers-list/teachers-list.component";
import { DataTablesModule } from "angular-datatables";
import { TeachersDetailsComponent } from "./teachers-details/teachers-details.component";
import { TeachersAddComponent } from "./teachers-add/teachers-add.component";
import { TeachersEditComponent } from "./teachers-edit/teachers-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    TeachersComponent,
    TeachersListComponent,
    TeachersDetailsComponent,
    TeachersAddComponent,
    TeachersEditComponent,
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TeachersModule {}
