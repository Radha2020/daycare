import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

@Component({
  selector: "app-teachers-list",
  templateUrl: "./teachers-list.component.html",
  styleUrls: ["./teachers-list.component.css"],
})
export class TeachersListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstTeachers: any[];
  public url: any = "teachersList";
  constructor(private srvModuleService: AllModulesService) {}

  ngOnInit() {
    this.loadTeachers();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }
  // Get teachers List  Api Call
  loadTeachers() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstTeachers = data;
      this.dtTrigger.next();
    });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
