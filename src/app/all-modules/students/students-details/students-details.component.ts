import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-students-details",
  templateUrl: "./students-details.component.html",
  styleUrls: ["./students-details.component.css"],
})
export class StudentsDetailsComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  ngOnInit() {}

  //settings form submit call
  settings() {
    this.toastr.success("Settings submit sucessfully...!", "Success");
  }
}
