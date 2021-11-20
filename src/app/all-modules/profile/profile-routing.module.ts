import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { ProfileMainComponent } from "./profile-main/profile-main.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    children: [{ path: "profile-main", component: ProfileMainComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
