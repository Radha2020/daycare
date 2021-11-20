import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { AllModulesService } from "../../all-modules.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-salary",
  templateUrl: "./add-salary.component.html",
  styleUrls: ["./add-salary.component.css"],
})
export class AddSalaryComponent implements OnInit {
  public addSalaryForm: FormGroup;
  public url = "salaryList";
  public pipe = new DatePipe("en-US");
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Add salary form validation
    this.addSalaryForm = this.formBuilder.group({
      staffId: ["", [Validators.required]],
      name: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      joiningDate: ["", [Validators.required]],
      amount: ["", [Validators.required]],
    });
  }

  // Add salary submit call
  addSalary() {
    let DateJoin = this.pipe.transform(
      this.addSalaryForm.value.joiningDate,
      "d MMM y"
    );
    let obj = {
      idNo: this.addSalaryForm.value.staffId,
      name: this.addSalaryForm.value.name,
      gender: this.addSalaryForm.value.gender,
      joiningDate: DateJoin,
      amount: this.addSalaryForm.value.amount,
      status: "Unpaid",
    };
    if (this.addSalaryForm.valid) {
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.router.navigate(["/accounts/salary"]);
        this.toastr.success("Salary added sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }
}
