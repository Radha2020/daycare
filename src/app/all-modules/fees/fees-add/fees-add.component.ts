import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { AllModulesService } from "../../all-modules.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-fees-add",
  templateUrl: "./fees-add.component.html",
  styleUrls: ["./fees-add.component.css"],
})
export class FeesAddComponent implements OnInit {
  public addFeesForm: FormGroup;
  public url = "feesList";
  public pipe = new DatePipe("en-US");
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Add fees form validation
    this.addFeesForm = this.formBuilder.group({
      feesId: ["", [Validators.required]],
      feesType: ["", [Validators.required]],
      gender: [""],
      feesAmount: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
    });
  }

  // Add fees submit call
  addFees() {
    let startDate = this.pipe.transform(
      this.addFeesForm.value.startDate,
      "d MMM y"
    );
    let endDate = this.pipe.transform(
      this.addFeesForm.value.endDate,
      "d MMM y"
    );
    let obj = {
      idNo: this.addFeesForm.value.feesId,
      feesName: this.addFeesForm.value.feesType,
      class: "6",
      amount: this.addFeesForm.value.feesAmount,
      startDate: startDate,
      endDate: endDate,
    };
    if (this.addFeesForm.valid) {
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.router.navigate(["/fees/fees-main"]);
        this.toastr.success("Fees added sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }
}
