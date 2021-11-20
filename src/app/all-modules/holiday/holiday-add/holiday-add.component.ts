import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { AllModulesService } from "../../all-modules.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-holiday-add",
  templateUrl: "./holiday-add.component.html",
  styleUrls: ["./holiday-add.component.css"],
})
export class HolidayAddComponent implements OnInit {
  public addHolidayForm: FormGroup;
  public url = "holidayList";
  public pipe = new DatePipe("en-US");
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Add holiday form validation
    this.addHolidayForm = this.formBuilder.group({
      holidayId: ["", [Validators.required]],
      holidayName: ["", [Validators.required]],
      holidayType: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
    });
  }

  // Add holiday submit call
  addHoliday() {
    let startDate = this.pipe.transform(
      this.addHolidayForm.value.startDate,
      "d MMM y"
    );
    let EndDate = this.pipe.transform(
      this.addHolidayForm.value.endDate,
      "d MMM y"
    );
    let obj = {
      idNo: this.addHolidayForm.value.holidayId,
      holidayName: this.addHolidayForm.value.holidayName,
      type: this.addHolidayForm.value.holidayType,
      startDate: startDate,
      endDate: EndDate,
    };
    if (this.addHolidayForm.valid) {
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.router.navigate(["/holiday/holiday-main"]);
        this.toastr.success("Holiday added sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }
}
