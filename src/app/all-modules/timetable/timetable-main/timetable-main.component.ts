import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

@Component({
  selector: "app-timetable-main",
  templateUrl: "./timetable-main.component.html",
  styleUrls: ["./timetable-main.component.css"],
})
export class TimetableMainComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstTimetable: any[];
  public url: any = "timeTable";
  constructor(private srvModuleService: AllModulesService) {}

  ngOnInit() {
    this.loadTimeTable();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }
  // Get timetable List  Api Call
  loadTimeTable() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstTimetable = data;
      this.dtTrigger.next();
    });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
