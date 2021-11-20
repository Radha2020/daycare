import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ShareDataService } from "../../share-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-events-add",
  templateUrl: "./events-add.component.html",
  styleUrls: ["./events-add.component.css"],
})
export class EventsAddComponent implements OnInit {
  @Output() onFilter = new EventEmitter();
  public addingEventsForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private shareData: ShareDataService,
    private router: Router
  ) {}

  ngOnInit() {
    // Add Events form validation
    this.addingEventsForm = this.formBuilder.group({
      eventId: ["", [Validators.required]],
      eventName: ["", [Validators.required]],
      eventDate: ["", [Validators.required]],
    });
  }

  // add event Data API call
  addingEvents() {
    let events = {
      title: this.addingEventsForm.value.eventName,
      date: this.addingEventsForm.value.eventDate,
      className: "bg-purple",
    };
    this.shareData.filter(events);
    this.router.navigate(["/events/events-main"]);
  }
}
