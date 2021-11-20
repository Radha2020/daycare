import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-library-edit",
  templateUrl: "./library-edit.component.html",
  styleUrls: ["./library-edit.component.css"],
})
export class LibraryEditComponent implements OnInit {
  public editId;
  public editLibraryForm: FormGroup;
  public pipe = new DatePipe("en-US");
  public url = "library";
  public lstLibrary;
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
    this.loadLibrary();
    //getting edit id of selected library list
    this.editId = parseInt(this.route.snapshot.queryParams["id"]);
    //editlibrary form validation
    this.editLibraryForm = this.formBuilder.group({
      bookId: ["", [Validators.required]],
      bookName: ["", [Validators.required]],
      language: ["", [Validators.required]],
      department: ["", [Validators.required]],
      class: ["", [Validators.required]],
      type: ["", [Validators.required]],
      status: ["", [Validators.required]],
    });
    setTimeout(() => {
      //<<<---using ()=> syntax
      this.edit();
    }, 1000);
  }

  // Get library List  Api Call
  loadLibrary() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstLibrary = data;
    });
  }

  // Edit library Submit call
  editLibrary() {
    if (isNaN(this.editId)) {
      this.obj = {
        idNo: this.editLibraryForm.value.bookId,
        name: this.editLibraryForm.value.bookName,
        language: this.editLibraryForm.value.language,
        department: this.editLibraryForm.value.department,
        class: this.editLibraryForm.value.class,
        type: this.editLibraryForm.value.type,
        status: this.editLibraryForm.value.status,
        id: 1,
      };
    } else {
      this.obj = {
        idNo: this.editLibraryForm.value.bookId,
        name: this.editLibraryForm.value.bookName,
        language: this.editLibraryForm.value.language,
        department: this.editLibraryForm.value.department,
        class: this.editLibraryForm.value.class,
        type: this.editLibraryForm.value.type,
        status: this.editLibraryForm.value.status,
        id: this.editId,
      };
    }

    if (this.editLibraryForm.valid) {
      this.srvModuleService.update(this.obj, this.url).subscribe((data) => {
        this.router.navigate(["/library/library-main"]);
        this.toastr.success("Library edited sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }

  // set values to library form
  edit() {
    if (isNaN(this.editId)) {
      const index = this.lstLibrary.findIndex((item) => {
        return item.id === 1;
      });
      let toSetValues = this.lstLibrary[index];
      this.editLibraryForm.patchValue({
        bookId: toSetValues.idNo,
        bookName: toSetValues.name,
        language: toSetValues.language,
        department: toSetValues.department,
        class: toSetValues.class,
        type: toSetValues.type,
        status: toSetValues.status,
      });
    } else {
      const index = this.lstLibrary.findIndex((item) => {
        return item.id === this.editId;
      });
      let toSetValues = this.lstLibrary[index];
      this.editLibraryForm.patchValue({
        bookId: toSetValues.idNo,
        bookName: toSetValues.name,
        language: toSetValues.language,
        department: toSetValues.department,
        class: toSetValues.class,
        type: toSetValues.type,
        status: toSetValues.status,
      });
    }
  }
}
