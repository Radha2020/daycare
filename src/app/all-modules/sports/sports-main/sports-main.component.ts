import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

@Component({
  selector: "app-sports-main",
  templateUrl: "./sports-main.component.html",
  styleUrls: ["./sports-main.component.css"],
})
export class SportsMainComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstSports: any[];
  public url: any = "sports";
  constructor(private srvModuleService: AllModulesService) {}

  ngOnInit() {
    this.loadSports();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }
  // Get sports List  Api Call
  loadSports() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstSports = data;
      this.dtTrigger.next();
    });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
