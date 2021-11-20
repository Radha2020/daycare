import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-timetable-edit",
  templateUrl: "./timetable-edit.component.html",
  styleUrls: ["./timetable-edit.component.css"],
})
export class TimetableEditComponent implements OnInit {
  public editId;
  public editTimetableForm: FormGroup;
  public pipe = new DatePipe("en-US");
  public url = "timeTable";
  public lstTimetable;
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
    this.loadTimetable();
    //getting edit id of selected timetable list
    this.editId = parseInt(this.route.snapshot.queryParams["id"]);
    //edittimtable form validation
    this.editTimetableForm = this.formBuilder.group({
      teacherId: ["", [Validators.required]],
      name: ["", [Validators.required]],
      class: ["", [Validators.required]],
      subject: ["", [Validators.required]],
      date: ["", [Validators.required]],
      startTime: ["", [Validators.required]],
      endTime: ["", [Validators.required]],
    });
    setTimeout(() => {
      //<<<---using ()=> syntax
      this.edit();
    }, 1000);
  }

  // Get timetable List  Api Call
  loadTimetable() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstTimetable = data;
    });
  }

  // Edit timetable Submit call
  editTimetable() {
    let DateJoin = this.pipe.transform(
      this.editTimetableForm.value.date,
      "d MMM y"
    );
    if (isNaN(this.editId)) {
      this.obj = {
        idNo: this.editTimetableForm.value.teacherId,
        name: this.editTimetableForm.value.name,
        class: this.editTimetableForm.value.class,
        subject: this.editTimetableForm.value.subject,
        date: DateJoin,
        startTime: this.editTimetableForm.value.startTime,
        endTime: this.editTimetableForm.value.endTime,
        id: 1,
      };
    } else {
      this.obj = {
        idNo: this.editTimetableForm.value.teacherId,
        name: this.editTimetableForm.value.name,
        class: this.editTimetableForm.value.class,
        subject: this.editTimetableForm.value.subject,
        date: DateJoin,
        startTime: this.editTimetableForm.value.startTime,
        endTime: this.editTimetableForm.value.endTime,
        id: this.editId,
      };
    }

    if (this.editTimetableForm.valid) {
      this.srvModuleService.update(this.obj, this.url).subscribe((data) => {
        this.router.navigate(["/timetable/timetable-main"]);
        this.toastr.success("Timetable edited sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }

  // set values to timetable form
  edit() {
    if (isNaN(this.editId)) {
      const index = this.lstTimetable.findIndex((item) => {
        return item.id === 1;
      });
      let toSetValues = this.lstTimetable[index];
      this.editTimetableForm.patchValue({
        teacherId: toSetValues.idNo,
        name: toSetValues.name,
        class: toSetValues.class,
        subject: toSetValues.subject,
        mobileNumber: toSetValues.date,
        startTime: toSetValues.startTime,
        endTime: toSetValues.endTime,
      });
      this.setDate = toSetValues.date;
    } else {
      const index = this.lstTimetable.findIndex((item) => {
        return item.id === this.editId;
      });
      let toSetValues = this.lstTimetable[index];
      this.editTimetableForm.patchValue({
        teacherId: toSetValues.idNo,
        name: toSetValues.name,
        class: toSetValues.class,
        subject: toSetValues.subject,
        mobileNumber: toSetValues.date,
        startTime: toSetValues.startTime,
        endTime: toSetValues.endTime,
      });
      this.setDate = toSetValues.date;
    }
  }
}
