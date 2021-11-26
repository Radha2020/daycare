import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlankpageComponent } from "./blankpage.component";
import { BlankpageMainComponent } from "./blankpage-main/blankpage-main.component";
import { BlankpageMain1Component } from "./blankpage-main1/blankpage-main1.component";


const routes: Routes = [
  {
    path: "",
    component: BlankpageComponent,
    children: [{ path: "blankpage-main", component: BlankpageMainComponent },
               { path: "blankpage-main1", component: BlankpageMain1Component }],
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlankpageRoutingModule {}
