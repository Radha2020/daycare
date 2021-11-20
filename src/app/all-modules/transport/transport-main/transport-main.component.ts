import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

@Component({
  selector: "app-transport-main",
  templateUrl: "./transport-main.component.html",
  styleUrls: ["./transport-main.component.css"],
})
export class TransportMainComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstTransport: any[];
  public url: any = "transport";
  constructor(private srvModuleService: AllModulesService) {}

  ngOnInit() {
    this.loadTransport();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }
  // Get transport List  Api Call
  loadTransport() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstTransport = data;
      this.dtTrigger.next();
    });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
