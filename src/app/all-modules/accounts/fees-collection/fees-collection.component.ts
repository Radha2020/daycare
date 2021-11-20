import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

@Component({
  selector: "app-fees-collection",
  templateUrl: "./fees-collection.component.html",
  styleUrls: ["./fees-collection.component.css"],
})
export class FeesCollectionComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstFees: any[];
  public url: any = "feesCollection";
  constructor(private srvModuleService: AllModulesService) {}

  ngOnInit() {
    this.loadFees();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }
  // Get Fees List  Api Call
  loadFees() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstFees = data;
      this.dtTrigger.next();
    });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
