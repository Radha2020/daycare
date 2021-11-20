import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ComponentsComponent } from "./components.component";
import { ComponentsMainComponent } from "./components-main/components-main.component";

const routes: Routes = [
  {
    path: "",
    component: ComponentsComponent,
    children: [{ path: "components-main", component: ComponentsMainComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
