import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

@Component({
  selector: "app-hostel-main",
  templateUrl: "./hostel-main.component.html",
  styleUrls: ["./hostel-main.component.css"],
})
export class HostelMainComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstHostel: any[];
  public url: any = "hostel";
  constructor(private srvModuleService: AllModulesService) {}

  ngOnInit() {
    this.loadHostel();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  // Get hostel List  Api Call
  loadHostel() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstHostel = data;
      this.dtTrigger.next();
    });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
