import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LibraryRoutingModule } from "./library-routing.module";
import { LibraryComponent } from "./library.component";
import { LibraryMainComponent } from "./library-main/library-main.component";
import { DataTablesModule } from "angular-datatables";
import { LibraryAddComponent } from "./library-add/library-add.component";
import { LibraryEditComponent } from "./library-edit/library-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    LibraryComponent,
    LibraryMainComponent,
    LibraryAddComponent,
    LibraryEditComponent,
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LibraryModule {}
