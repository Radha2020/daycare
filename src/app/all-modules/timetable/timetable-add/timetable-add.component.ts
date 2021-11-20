import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { AllModulesService } from "../../all-modules.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-timetable-add",
  templateUrl: "./timetable-add.component.html",
  styleUrls: ["./timetable-add.component.css"],
})
export class TimetableAddComponent implements OnInit {
  public addTimetableForm: FormGroup;
  public url = "timeTable";
  public pipe = new DatePipe("en-US");
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Add timetable form validation
    this.addTimetableForm = this.formBuilder.group({
      teacherId: ["", [Validators.required]],
      name: ["", [Validators.required]],
      class: ["", [Validators.required]],
      subject: ["", [Validators.required]],
      date: ["", [Validators.required]],
      startTime: ["", [Validators.required]],
      endTime: ["", [Validators.required]],
    });
  }

  // Add timetable submit call
  addTimetable() {
    let DateJoin = this.pipe.transform(
      this.addTimetableForm.value.date,
      "d MMM y"
    );
    let obj = {
      idNo: this.addTimetableForm.value.teacherId,
      name: this.addTimetableForm.value.name,
      class: this.addTimetableForm.value.class,
      subject: this.addTimetableForm.value.subject,
      date: DateJoin,
      startTime: this.addTimetableForm.value.startTime,
      endTime: this.addTimetableForm.value.endTime,
    };
    if (this.addTimetableForm.valid) {
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.router.navigate(["/timetable/timetable-main"]);
        this.toastr.success("Timetable added sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }
}
