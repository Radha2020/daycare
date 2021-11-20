import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllModulesComponent } from "./all-modules.component";

const routes: Routes = [
 // {
   // path: "",
   // redirectTo: "login",
   // pathMatch: "full",
  //},
  {
    path: "",
    component: AllModulesComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: "students",
        loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
      },
      {
        path: "teachers",
        loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule),
      },
      {
        path: "departments",
        loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule),
      },
      {
        path: "subjects",
        loadChildren: () => import('./subjects/subjects.module').then(m => m.SubjectsModule),
      },
      {
        path: "accounts",
        loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
      },
      {
        path: "holiday",
        loadChildren: () => import('./holiday/holiday.module').then(m => m.HolidayModule),
      },
      {
        path: "fees",
        loadChildren: () => import('./fees/fees.module').then(m => m.FeesModule),
      },
      {
        path: "examlist",
        loadChildren: () => import('./examlist/examlist.module').then(m => m.ExamlistModule),
      },
      {
        path: "events",
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
      },
      {
        path: "timetable",
        loadChildren: () => import('./timetable/timetable.module').then(m => m.TimetableModule),
      },
      {
        path: "library",
        loadChildren: () => import('./library/library.module').then(m => m.LibraryModule),
      },
      {
        path: "blankpage",
        loadChildren: () => import('./blankpage/blankpage.module').then(m => m.BlankpageModule),
      },
      {
        path: "sports",
        loadChildren: () => import('./sports/sports.module').then(m => m.SportsModule),
      },
      {
        path: "hostel",
        loadChildren: () => import('./hostel/hostel.module').then(m => m.HostelModule),
      },
      {
        path: "transport",
        loadChildren: () => import('./transport/transport.module').then(m => m.TransportModule),
      },
      {
        path: "components",
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule),
      },
      {
        path: "forms",
        loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule),
      },
      {
        path: "tables",
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule),
      },
      {
        path: "profile",
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: "inbox",
        loadChildren: () => import('./inbox/inbox.module').then(m => m.InboxModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllModulesRoutingModule {}
