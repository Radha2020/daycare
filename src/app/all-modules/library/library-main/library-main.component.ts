import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

@Component({
  selector: "app-library-main",
  templateUrl: "./library-main.component.html",
  styleUrls: ["./library-main.component.css"],
})
export class LibraryMainComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstLibrary: any[];
  public url: any = "library";
  constructor(private srvModuleService: AllModulesService) {}

  ngOnInit() {
    this.loadLibrary();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }
  // Get library List  Api Call
  loadLibrary() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstLibrary = data;
      this.dtTrigger.next();
    });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
