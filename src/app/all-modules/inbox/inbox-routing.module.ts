import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InboxComponent } from "./inbox.component";
import { InboxMainComponent } from "./inbox-main/inbox-main.component";

const routes: Routes = [
  {
    path: "",
    component: InboxComponent,
    children: [{ path: "inbox-main", component: InboxMainComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
