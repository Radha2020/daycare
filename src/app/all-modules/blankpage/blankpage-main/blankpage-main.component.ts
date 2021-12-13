import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";
import { LoginService } from "src/app/services/login.service";

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-blankpage-main',
  templateUrl: './blankpage-main.component.html',
  styleUrls: ['./blankpage-main.component.css']
})
export class BlankpageMainComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  // public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};
  lstStudents: any;
  public url: any = "studentsList";
  constructor(private srvModuleService: AllModulesService, private loginService: LoginService) { }


  ngOnInit(): void {
    this.loadStudents();
    var currentdate = new Date();
    var datetime = "Date: " + currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear()
    // for data table configuration
    this.dtOptions = {
      //   pagingType: 'full_numbers',
      //  pageLength: 3,
      // processing: true,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'pdfHtml5',
          title: 'Active Students',
          download: 'open',
          customize: function (doc) {
            //            doc.pageMargins = [10, 10, 10, 10];
            doc.styles.title = {
              // color: 'red',
              fontSize: '20',
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
    };
  }
  // Get Students List  Api Call
  loadStudents() {
    this.loginService.getActiveStudents().subscribe((data) => {
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
