import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { LoginService } from "src/app/services/login.service";
import * as moment from 'moment';
@Component({
  selector: 'app-blankpage-main1',
  templateUrl: './blankpage-main1.component.html',
  styleUrls: ['./blankpage-main1.component.css']
})
export class BlankpageMain1Component implements OnInit {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  // public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};
  isDtInitialized: boolean = false
  lstStudents: any;
  public currentDate: Date;
  ReportsForm: FormGroup;
  startdate: any = {};
  reporttitle: any = {};
  reportstartdate: string;
  enddate: any = {};
  datejoin: any = {};
  isShown: boolean = false; // hidden by custom date default

  constructor(private srvModuleService: AllModulesService, private loginService: LoginService,
    private formBuilder: FormBuilder,) { }


  ngOnInit() {

    this.currentDate = new Date();

    this.ReportsForm = this.formBuilder.group({
      type: ["", [Validators.required]],
      startdate: ["", [Validators.required]],
      enddate: ["", [Validators.required]]
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
  reports() {
    var currentdate = new Date();
    var datetime = "Date: " + currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear()
    /* this.dtOptions = {
       //   pagingType: 'full_numbers',
       //  pageLength: 3,
       // processing: true,
       dom: 'Bfrtip',
       buttons: [
         {
           extend: 'pdfHtml5',
           title: this.reporttitle + '\n' + this.reportstartdate,
           // title: 'My title' + '\n' + 'a new line',
           // subtitle: this.startdate,
           download: 'open',
           customize: function (doc) {
             doc.pageMargins = [40, 100, 10, 10];
             doc.styles.title = {
               // color: 'red',
               fontSize: '15',
               // background: 'blue',
               alignment: 'center',
 
             }
             // Here's where you can control the cell padding
             // doc.styles.tableHeader.margin =
             // doc.styles.tableBodyOdd.margin =
             // doc.styles.tableBodyEven.margin = [10, 10, 10, 10];
 
             // Create a header
 
             doc['header'] = (function (page, pages) {
               return {
                 columns: [
                   // 'This is your left footer column',
                   {
                     // This is the right column
                     alignment: 'right',
                     // text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }]
                     text: datetime
                   }
                 ],
                 // margin: [0, 190, 0, 80]
                 margin: [10, 10, 50]
               }
             });
             // Styling the table: create style object
             var objLayout = {};
             // Horizontal line thickness
             objLayout['hLineWidth'] = function (i) { return .5; };
             // Vertikal line thickness
             objLayout['vLineWidth'] = function (i) { return .5; };
             // Horizontal line color
             objLayout['hLineColor'] = function (i) { return '#aaa'; };
             // Vertical line color
             objLayout['vLineColor'] = function (i) { return '#aaa'; };
             // Left padding of the cell
             objLayout['paddingLeft'] = function (i) { return 4; };
             // Right padding of the cell
             objLayout['paddingRight'] = function (i) { return 4; };
             // Inject the object in the document
             doc.content[1].layout = objLayout;
 
           }
         }
       ]
     };*/
    if (this.ReportsForm.get('type').value == "Last one month") {

      this.enddate = moment(new Date()).format("yyyy-MM-DD")
      this.startdate = moment(this.enddate).subtract(1, 'M').format("yyyy-MM-DD");
      this.reportstartdate = this.startdate;
      alert(this.reportstartdate);
    } else if (this.ReportsForm.get('type').value == "Last 3 months") {

      this.enddate = moment(new Date()).format("yyyy-MM-DD")
      this.startdate = moment(this.enddate).subtract(3, 'M').format("yyyy-MM-DD");
    }
    else if (this.ReportsForm.get('type').value == "Last Year") {

      this.enddate = moment(new Date()).format("yyyy-MM-DD")
      this.startdate = moment(this.enddate).subtract(12, 'M').format("yyyy-MM-DD");
    }
    else if (this.ReportsForm.get('type').value == "Custom Dates") {

      this.enddate = this.ReportsForm.get('enddate').value
      this.startdate = this.ReportsForm.get('startdate').value
    }




    this.datejoin = {
      "startdate": this.startdate,
      "enddate": this.enddate
    };
    alert(JSON.stringify(this.startdate));
    this.reportstartdate = JSON.stringify(this.startdate);
    this.loginService.getstudentsperdoj(this.datejoin).subscribe((data) => {
      this.lstStudents = data;

      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }





      //  alert(JSON.stringify(this.lstStudents));

      // this.dtTrigger.next();

    });

    this.dtOptions = {
      //   pagingType: 'full_numbers',
      //  pageLength: 3,
      // processing: true,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'pdfHtml5',
          title: this.reporttitle + '\n',
          //+ '\n' + this.reportstartdate,
          // title: 'My title' + '\n' + 'a new line',
          subtitle: this.startdate,
          download: 'open',
          customize: function (doc) {
            doc.pageMargins = [40, 100, 10, 10];
            doc.styles.title = {
              // color: 'red',
              fontSize: '15',
              // background: 'blue',
              alignment: 'center',
            }
            doc.styles.subtitle = {
              fontSize: '10',
              alignment: 'center'


            }
            // Here's where you can control the cell padding
            // doc.styles.tableHeader.margin =
            // doc.styles.tableBodyOdd.margin =
            // doc.styles.tableBodyEven.margin = [10, 10, 10, 10];

            // Create a header

            doc['header'] = (function (page, pages) {
              return {
                columns: [
                  // 'This is your left footer column',
                  {
                    // This is the right column
                    alignment: 'right',
                    // text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }]
                    text: datetime
                  }
                ],
                // margin: [0, 190, 0, 80]
                margin: [10, 10, 50]
              }
            });
            // Styling the table: create style object
            var objLayout = {};
            // Horizontal line thickness
            objLayout['hLineWidth'] = function (i) { return .5; };
            // Vertikal line thickness
            objLayout['vLineWidth'] = function (i) { return .5; };
            // Horizontal line color
            objLayout['hLineColor'] = function (i) { return '#aaa'; };
            // Vertical line color
            objLayout['vLineColor'] = function (i) { return '#aaa'; };
            // Left padding of the cell
            objLayout['paddingLeft'] = function (i) { return 4; };
            // Right padding of the cell
            objLayout['paddingRight'] = function (i) { return 4; };
            // Inject the object in the document
            doc.content[1].layout = objLayout;

          }
        }
      ]
    };
  }
  // destroy data table when leaving
  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  changeType(event) {
    console.log(event.target.value);
    this.ReportsForm.patchValue({
      type: event.target.value
    });

    this.reporttitle = this.ReportsForm.get('type').value;
    // alert(this.reporttitle);
    if (this.ReportsForm.get('type').value == "Custom Dates") {
      this.isShown = true;
    } else {
      this.isShown = false;
    }
  }
}
