import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { AllModulesService } from "../../all-modules.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sports-add",
  templateUrl: "./sports-add.component.html",
  styleUrls: ["./sports-add.component.css"],
})
export class SportsAddComponent implements OnInit {
  public addSportsForm: FormGroup;
  public url = "sports";
  public pipe = new DatePipe("en-US");
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Add sports form validation
    this.addSportsForm = this.formBuilder.group({
      sportsId: ["", [Validators.required]],
      sportsName: ["", [Validators.required]],
      coachName: ["", [Validators.required]],
      startedYear: ["", [Validators.required]],
    });
  }

  // Add sports submit call
  addSports() {
    let newDate = this.addSportsForm.value.startedYear.split("-");
    let year = newDate[0];
    let obj = {
      idNo: this.addSportsForm.value.sportsId,
      name: this.addSportsForm.value.sportsName,
      coach: this.addSportsForm.value.coachName,
      startedYear: year,
    };
    if (this.addSportsForm.valid) {
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.router.navigate(["/sports/sports-main"]);
        this.toastr.success("Sports added sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }
}
