import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sports-edit",
  templateUrl: "./sports-edit.component.html",
  styleUrls: ["./sports-edit.component.css"],
})
export class SportsEditComponent implements OnInit {
  public editId;
  public editSportsForm: FormGroup;
  public pipe = new DatePipe("en-US");
  public url = "sports";
  public lstSports;
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
    this.loadSports();
    //getting edit id of selected sports list
    this.editId = parseInt(this.route.snapshot.queryParams["id"]);
    //editsports form validation
    this.editSportsForm = this.formBuilder.group({
      sportsId: ["", [Validators.required]],
      sportsName: ["", [Validators.required]],
      coachName: ["", [Validators.required]],
      startedYear: ["", [Validators.required]],
    });
    setTimeout(() => {
      //<<<---using ()=> syntax
      this.edit();
    }, 1000);
  }

  // Get sports List  Api Call
  loadSports() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstSports = data;
    });
  }

  // Edit sports Submit call
  editSports() {
    let newDate = this.editSportsForm.value.startedYear.split("-");
    let year = newDate[0];
    if (isNaN(this.editId)) {
      this.obj = {
        idNo: this.editSportsForm.value.sportsId,
        name: this.editSportsForm.value.sportsName,
        coach: this.editSportsForm.value.coachName,
        startedYear: year,
        id: 1,
      };
    } else {
      this.obj = {
        idNo: this.editSportsForm.value.sportsId,
        name: this.editSportsForm.value.sportsName,
        coach: this.editSportsForm.value.coachName,
        startedYear: year,
        id: this.editId,
      };
    }

    if (this.editSportsForm.valid) {
      this.srvModuleService.update(this.obj, this.url).subscribe((data) => {
        this.router.navigate(["/sports/sports-main"]);
        this.toastr.success("Sports edited sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }

  // set values to sports form
  edit() {
    if (isNaN(this.editId)) {
      const index = this.lstSports.findIndex((item) => {
        return item.id === 1;
      });
      let toSetValues = this.lstSports[index];
      this.editSportsForm.patchValue({
        sportsId: toSetValues.idNo,
        sportsName: toSetValues.name,
        coachName: toSetValues.coach,
      });
      let newDate = toSetValues.startedYear.split("-");
      let pushDate = newDate.push("02-12");
      let joiningDate = newDate.join("-");
      this.setDate = joiningDate;
    } else {
      const index = this.lstSports.findIndex((item) => {
        return item.id === this.editId;
      });
      let toSetValues = this.lstSports[index];
      this.editSportsForm.patchValue({
        sportsId: toSetValues.idNo,
        sportsName: toSetValues.name,
        coachName: toSetValues.coach,
      });
      let newDate = toSetValues.startedYear.split("-");
      let pushDate = newDate.push("02-12");
      let joiningDate = newDate.join("-");
      this.setDate = joiningDate;
    }
  }
}
