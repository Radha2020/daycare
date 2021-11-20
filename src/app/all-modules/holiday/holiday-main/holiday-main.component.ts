import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

@Component({
  selector: "app-holiday-main",
  templateUrl: "./holiday-main.component.html",
  styleUrls: ["./holiday-main.component.css"],
})
export class HolidayMainComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstHoliday: any[];
  public url: any = "holidayList";
  constructor(private srvModuleService: AllModulesService) {}

  ngOnInit() {
    this.loadHoliday();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }
  // Get Holiday List  Api Call
  loadHoliday() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstHoliday = data;
      this.dtTrigger.next();
    });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
