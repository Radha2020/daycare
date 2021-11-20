import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SportsRoutingModule } from "./sports-routing.module";
import { SportsComponent } from "./sports.component";
import { SportsMainComponent } from "./sports-main/sports-main.component";
import { DataTablesModule } from "angular-datatables";
import { SportsAddComponent } from "./sports-add/sports-add.component";
import { SportsEditComponent } from "./sports-edit/sports-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SportsComponent,
    SportsMainComponent,
    SportsAddComponent,
    SportsEditComponent,
  ],
  imports: [
    CommonModule,
    SportsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SportsModule {}
