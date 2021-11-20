import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

@Component({
  selector: "app-examlist-main",
  templateUrl: "./examlist-main.component.html",
  styleUrls: ["./examlist-main.component.css"],
})
export class ExamlistMainComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstExam: any[];
  public url: any = "examList";
  constructor(private srvModuleService: AllModulesService) {}

  ngOnInit() {
    this.loadExam();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }
  // Get Exam List  Api Call
  loadExam() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstExam = data;
      this.dtTrigger.next();
    });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
