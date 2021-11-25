import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";
import { LoginService } from "src/app/services/login.service";
@Component({
  selector: 'app-blankpage-main',
  templateUrl: './blankpage-main.component.html',
  styleUrls: ['./blankpage-main.component.css']
})
export class BlankpageMainComponent implements OnInit{
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
 // public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
 dtOptions:any={};
  lstStudents: any;
  public url: any = "studentsList";
  constructor(private srvModuleService: AllModulesService,private loginService:LoginService) {}

  
  ngOnInit(): void {
    this.loadStudents();
    // for data table configuration
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
             'excel', 'print'
        ]
    };
  }
  // Get Students List  Api Call
  loadStudents() {
    this.loginService.getstudents().subscribe((data) => {
    // alert(JSON.stringify(data));
      //this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstStudents = data;
    //  alert(JSON.stringify(this.lstStudents));
      this.dtTrigger.next();
    });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
