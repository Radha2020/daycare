import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-teachers-details",
  templateUrl: "./teachers-details.component.html",
  styleUrls: ["./teachers-details.component.css"],
})
export class TeachersDetailsComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  ngOnInit() {}
  //settings form submit call
  settings() {
    this.toastr.success("Settings submit sucessfully...!", "Success");
  }
}
