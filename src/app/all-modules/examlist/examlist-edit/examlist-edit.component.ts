import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { AllModulesService } from "../../all-modules.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-examlist-edit",
  templateUrl: "./examlist-edit.component.html",
  styleUrls: ["./examlist-edit.component.css"],
})
export class ExamlistEditComponent implements OnInit {
  public editId;
  public editExamForm: FormGroup;
  public pipe = new DatePipe("en-US");
  public url = "examList";
  public lstExam;
  public obj;
  public setDate;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadExam();
    //getting edit id of selected exam list
    this.editId = parseInt(this.route.snapshot.queryParams["id"]);
    //editexam form validation
    this.editExamForm = this.formBuilder.group({
      examName: ["", [Validators.required]],
      class: ["", [Validators.required]],
      subject: ["", [Validators.required]],
      fees: [""],
      startTime: ["", [Validators.required]],
      endTime: ["", [Validators.required]],
      eventDate: ["", [Validators.required]],
    });
    setTimeout(() => {
      //<<<---using ()=> syntax
      this.edit();
    }, 1000);
  }

  // Get exam List  Api Call
  loadExam() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstExam = data;
    });
  }

  // Edit exam Submit call
  editExam() {
    let DateJoin = this.pipe.transform(
      this.editExamForm.value.eventDate,
      "d MMM y"
    );

    if (isNaN(this.editId)) {
      this.obj = {
        examName: this.editExamForm.value.examName,
        class: this.editExamForm.value.class,
        subject: this.editExamForm.value.subject,
        startTime: this.editExamForm.value.startTime,
        endTime: this.editExamForm.value.endTime,
        date: DateJoin,
        id: 1,
      };
    } else {
      this.obj = {
        examName: this.editExamForm.value.examName,
        class: this.editExamForm.value.class,
        subject: this.editExamForm.value.subject,
        startTime: this.editExamForm.value.startTime,
        endTime: this.editExamForm.value.endTime,
        date: DateJoin,
        id: this.editId,
      };
    }

    if (this.editExamForm.valid) {
      this.srvModuleService.update(this.obj, this.url).subscribe((data) => {
        this.router.navigate(["/examlist/examlist-main"]);
        this.toastr.success("Exam List edited sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }

  // set values to exam form
  edit() {
    if (isNaN(this.editId)) {
      const index = this.lstExam.findIndex((item) => {
        return item.id === 1;
      });
      let toSetValues = this.lstExam[index];
      this.editExamForm.patchValue({
        examName: toSetValues.examName,
        class: toSetValues.class,
        subject: toSetValues.subject,
        startTime: toSetValues.startTime,
        endTime: toSetValues.endTime,
        date: toSetValues.eventDate,
        fees: "$120",
      });
      this.setDate = toSetValues.date;
    } else {
      const index = this.lstExam.findIndex((item) => {
        return item.id === this.editId;
      });
      let toSetValues = this.lstExam[index];
      this.editExamForm.patchValue({
        examName: toSetValues.examName,
        class: toSetValues.class,
        subject: toSetValues.subject,
        startTime: toSetValues.startTime,
        endTime: toSetValues.endTime,
        date: toSetValues.eventDate,
        fees: "$120",
      });
      this.setDate = toSetValues.date;
    }
  }
}
