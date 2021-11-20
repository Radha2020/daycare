import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HostelRoutingModule } from "./hostel-routing.module";
import { HostelComponent } from "./hostel.component";
import { HostelMainComponent } from "./hostel-main/hostel-main.component";
import { DataTablesModule } from "angular-datatables";
import { HostelAddComponent } from "./hostel-add/hostel-add.component";
import { HostelEditComponent } from "./hostel-edit/hostel-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    HostelComponent,
    HostelMainComponent,
    HostelAddComponent,
    HostelEditComponent,
  ],
  imports: [
    CommonModule,
    HostelRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HostelModule {}
