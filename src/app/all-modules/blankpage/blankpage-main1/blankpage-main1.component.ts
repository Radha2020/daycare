import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { LoginService } from "src/app/services/login.service";
@Component({
  selector: 'app-blankpage-main1',
  templateUrl: './blankpage-main1.component.html',
  styleUrls: ['./blankpage-main1.component.css']
})
export class BlankpageMain1Component implements OnInit{
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
 // public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
 dtOptions:any={};
  lstStudents: any;
  public currentDate:Date;
  ReportsForm: FormGroup;
  
  datejoin:any={};
  constructor(private srvModuleService: AllModulesService,private loginService:LoginService,
    private formBuilder: FormBuilder,) {}

  
  ngOnInit(){
      
    this.currentDate=new Date();
   
    this.ReportsForm = this.formBuilder.group({
      doj: ["", [Validators.required]],
    })

   // this.loadStudents();
    // for data table configuration
    /*this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
             'excel', 'print'
        ]
    };*/
  }
  // Get Students List  Api Call
  /*loadStudents() {
    this.loginService.getstudents().subscribe((data) => {
    // alert(JSON.stringify(data));
      //this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstStudents = data;
    //  alert(JSON.stringify(this.lstStudents));
      this.dtTrigger.next();
    });
  }
*/
  reports()
  
  {
    this.ngOnDestroy();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
             'excel', 'print'
        ]
    };
 // alert("hai");
  //  alert(JSON.stringify(this.ReportsForm.get('doj').value));
    this.datejoin={
      "doj":this.ReportsForm.get('doj').value
    };
    this.loginService.getstudentsperdoj(this.datejoin).subscribe((data) => {
    //   alert(JSON.stringify(data));
        //this.srvModuleService.get(this.url).subscribe((data) => {
        this.lstStudents = data;
      //  alert(JSON.stringify(this.lstStudents));
     
      this.dtTrigger.next();
     
    });
   
  
  }
  // destroy data table when leaving
 ngOnDestroy(){
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
