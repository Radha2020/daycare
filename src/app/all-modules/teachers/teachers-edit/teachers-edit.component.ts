import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-teachers-edit",
  templateUrl: "./teachers-edit.component.html",
  styleUrls: ["./teachers-edit.component.css"],
})
export class TeachersEditComponent implements OnInit {
  public editId;
  public editTeachersForm: FormGroup;
  public pipe = new DatePipe("en-US");
  public url = "teachersList";
  public lstTeachers;
  public obj;
  public setDate = "2 Feb 2002";
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadTeachers();
    //getting edit id of selected teachers list
    this.editId = parseInt(this.route.snapshot.queryParams["id"]);
    //edit teachers  form validation
    this.editTeachersForm = this.formBuilder.group({
      teacherId: ["", [Validators.required]],
      name: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      address: ["", [Validators.required]],
    });
    setTimeout(() => {
      //<<<---using ()=> syntax
      this.edit();
    }, 1000);
  }
  // Get teachers List  Api Call
  loadTeachers() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstTeachers = data;
    });
  }

  // Edit teachers Submit call
  editTeachers() {
    if (isNaN(this.editId)) {
      this.obj = {
        idNo: this.editTeachersForm.value.teacherId,
        name: this.editTeachersForm.value.name,
        gender: this.editTeachersForm.value.gender,
        mobileNumber: this.editTeachersForm.value.mobile,
        address: this.editTeachersForm.value.address,
        class: "11",
        subject: "Botony",
        section: "B",
        id: 1,
      };
    } else {
      this.obj = {
        idNo: this.editTeachersForm.value.teacherId,
        name: this.editTeachersForm.value.name,
        gender: this.editTeachersForm.value.gender,
        mobileNumber: this.editTeachersForm.value.mobile,
        address: this.editTeachersForm.value.address,
        class: "11",
        subject: "Botony",
        section: "B",
        id: this.editId,
      };
    }

    if (this.editTeachersForm.valid) {
      this.srvModuleService.update(this.obj, this.url).subscribe((data) => {
        this.router.navigate(["/teachers/teachers-list"]);
        this.toastr.success("Teachers edited sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }

  // set values to teachers form
  edit() {
    if (isNaN(this.editId)) {
      const index = this.lstTeachers.findIndex((item) => {
        return item.id === 1;
      });
      let toSetValues = this.lstTeachers[index];
      this.editTeachersForm.patchValue({
        teacherId: toSetValues.idNo,
        name: toSetValues.name,
        gender: toSetValues.gender,
        mobile: toSetValues.mobileNumber,
        address: toSetValues.address,
      });
    } else {
      const index = this.lstTeachers.findIndex((item) => {
        return item.id === this.editId;
      });
      let toSetValues = this.lstTeachers[index];
      this.editTeachersForm.patchValue({
        teacherId: toSetValues.idNo,
        name: toSetValues.name,
        gender: toSetValues.gender,
        mobile: toSetValues.mobileNumber,
        address: toSetValues.address,
      });
    }
  }
}
