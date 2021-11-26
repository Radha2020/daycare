import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { BlankpageRoutingModule } from './blankpage-routing.module';
import { BlankpageComponent } from './blankpage.component';
import { BlankpageMainComponent } from './blankpage-main/blankpage-main.component';
import { BlankpageMain1Component } from './blankpage-main1/blankpage-main1.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [BlankpageComponent, BlankpageMainComponent,BlankpageMain1Component],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlankpageRoutingModule,
    DataTablesModule
  ]
})
export class BlankpageModule { }
