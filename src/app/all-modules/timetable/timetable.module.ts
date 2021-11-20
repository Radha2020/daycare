import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TimetableRoutingModule } from "./timetable-routing.module";
import { TimetableComponent } from "./timetable.component";
import { TimetableMainComponent } from "./timetable-main/timetable-main.component";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TimetableAddComponent } from './timetable-add/timetable-add.component';
import { TimetableEditComponent } from './timetable-edit/timetable-edit.component';

@NgModule({
  declarations: [TimetableComponent, TimetableMainComponent, TimetableAddComponent, TimetableEditComponent],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TimetableModule {}
