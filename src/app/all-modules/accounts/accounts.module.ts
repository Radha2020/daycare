import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountsRoutingModule } from "./accounts-routing.module";
import { AccountsComponent } from "./accounts.component";
import { FeesCollectionComponent } from "./fees-collection/fees-collection.component";
import { DataTablesModule } from "angular-datatables";
import { ExpensesComponent } from "./expenses/expenses.component";
import { SalaryComponent } from "./salary/salary.component";
import { AddFeesComponent } from "./add-fees/add-fees.component";
import { AddExpensesComponent } from "./add-expenses/add-expenses.component";
import { AddSalaryComponent } from "./add-salary/add-salary.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AccountsComponent,
    FeesCollectionComponent,
    ExpensesComponent,
    SalaryComponent,
    AddFeesComponent,
    AddExpensesComponent,
    AddSalaryComponent,
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AccountsModule {}
