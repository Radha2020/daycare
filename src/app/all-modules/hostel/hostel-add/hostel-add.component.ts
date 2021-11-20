import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { AllModulesService } from "../../all-modules.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-hostel-add",
  templateUrl: "./hostel-add.component.html",
  styleUrls: ["./hostel-add.component.css"],
})
export class HostelAddComponent implements OnInit {
  public addHostelForm: FormGroup;
  public url = "hostel";
  public pipe = new DatePipe("en-US");
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Add hostel form validation
    this.addHostelForm = this.formBuilder.group({
      block: ["", [Validators.required]],
      roomNo: ["", [Validators.required]],
      roomType: ["", [Validators.required]],
      noOfBeds: ["", [Validators.required]],
      costPerBed: ["", [Validators.required]],
      availability: ["", [Validators.required]],
    });
  }

  // Add hostel submit call
  addHostel() {
    let DateJoin = this.pipe.transform(this.addHostelForm.value.dob, "d MMM y");
    let obj = {
      block: this.addHostelForm.value.block,
      roomNo: this.addHostelForm.value.roomNo,
      roomType: this.addHostelForm.value.roomType,
      noOfBeds: this.addHostelForm.value.noOfBeds,
      costPerBed: this.addHostelForm.value.costPerBed,
      availability: this.addHostelForm.value.availability,
    };
    if (this.addHostelForm.valid) {
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.router.navigate(["/hostel/hostel-main"]);
        this.toastr.success("Hostel added sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }
}
