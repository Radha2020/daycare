import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";
import { LoginService } from "src/app/services/login.service";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { timeout } from "rxjs/operators";
@Component({
  selector: "app-students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.css"],
})
export class StudentsListComponent implements OnInit, OnDestroy {

  @ViewChild('closebutton') closebutton;
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  // public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  lstStudents: any;
  dtOptions: any = {};
  public url: any = "studentsList";
  modalContent: undefined;
  constructor(private router: Router, private srvModuleService: AllModulesService, private loginService: LoginService, private modalService: NgbModal, private toastr: ToastrService,) { }

  ngOnInit() {
    this.loadStudents();
    // for data table configuration
    this.dtOptions = {

      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
      buttons: ['print']
    };
  }

  public onSave() {
    alert("confirm");
    // this.closebutton.nativeElement.click();



  }
  openModal(targetModal, students) {
    this.modalContent = students;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'

    });

  }
  modalsave(modalContent) {


    let obj = {
      id: modalContent.id
    };

    this.loginService.statuschange(obj).subscribe(res => {
      if (res['status'] == true) {

        this.toastr.info('Status updated !')
          .onHidden
          .subscribe(() => window.location.reload());

      }
      this.modalService.dismissAll();
    })

  }
  // Get Students List  Api Call
  loadStudents() {
    this.loginService.getstudents().subscribe((data) => {

      this.lstStudents = data;
      this.dtTrigger.next();
    });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
