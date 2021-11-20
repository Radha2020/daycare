import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ExamlistRoutingModule } from "./examlist-routing.module";
import { ExamlistComponent } from "./examlist.component";
import { ExamlistMainComponent } from "./examlist-main/examlist-main.component";
import { DataTablesModule } from "angular-datatables";
import { ExamlistAddComponent } from "./examlist-add/examlist-add.component";
import { ExamlistEditComponent } from "./examlist-edit/examlist-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ExamlistComponent,
    ExamlistMainComponent,
    ExamlistAddComponent,
    ExamlistEditComponent,
  ],
  imports: [
    CommonModule,
    ExamlistRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ExamlistModule {}
