import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { AllModulesService } from "../../all-modules.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-departments-add",
  templateUrl: "./departments-add.component.html",
  styleUrls: ["./departments-add.component.css"],
})
export class DepartmentsAddComponent implements OnInit {
  public addDepartmentsForm: FormGroup;
  public url = "departmentsList";
  public pipe = new DatePipe("en-US");
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    // Add departments form validation
    this.addDepartmentsForm = this.formBuilder.group({
      departmentId: ["", [Validators.required]],
      departmentName: ["", [Validators.required]],
      hod: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      noOfStudents: ["", [Validators.required]],
    });
  }

  // Add departments submit call
  addDepartments() {
    let newDate = this.addDepartmentsForm.value.startDate.split("-");
    let year = newDate[0];
    let obj = {
      idNo: this.addDepartmentsForm.value.departmentId,
      name: this.addDepartmentsForm.value.departmentName,
      hod: this.addDepartmentsForm.value.hod,
      startedYear: year,
      noOfStudents: this.addDepartmentsForm.value.noOfStudents,
    };
    if (this.addDepartmentsForm.valid) {
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.router.navigate(["/departments/departments-list"]);
        this.toastr.success("Departments added sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }
}
