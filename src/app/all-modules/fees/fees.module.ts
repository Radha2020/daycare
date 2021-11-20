import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeesRoutingModule } from "./fees-routing.module";
import { FeesComponent } from "./fees.component";
import { FeesMainComponent } from "./fees-main/fees-main.component";
import { DataTablesModule } from "angular-datatables";
import { FeesAddComponent } from "./fees-add/fees-add.component";
import { FeesEditComponent } from "./fees-edit/fees-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    FeesComponent,
    FeesMainComponent,
    FeesAddComponent,
    FeesEditComponent,
  ],
  imports: [
    CommonModule,
    FeesRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FeesModule {}
