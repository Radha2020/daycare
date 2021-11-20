import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component";
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import { AllModulesComponent } from "./all-modules/all-modules.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
const routes: Routes = [
  {
    path:"",
     redirectTo: "login",
     pathMatch: "full",
   
    },
  {
    path:"",
   // redirectTo:"AllModulesComponent",

      loadChildren: () =>import(`./all-modules/all-modules.module`).then((m) => m.AllModulesModule),
  
  
  },
  
  
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgotpassword", component: ForgotpasswordComponent },
  { path: "errorpage", component: ErrorpageComponent },
 // {path:  "sidebar",component:SidebarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
