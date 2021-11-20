import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DashboardTeacherComponent } from './dashboard-teacher/dashboard-teacher.component';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {NgxSimpleCalendarModule} from 'ngx-simple-calendar'; 



@NgModule({
  declarations: [DashboardComponent, DashboardMainComponent, DashboardTeacherComponent, DashboardStudentComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      imageWidth: 80,
      imageHeight: 80
    }),
    NgxSimpleCalendarModule
  ]
})
export class DashboardModule { }
