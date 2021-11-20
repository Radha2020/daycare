import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "@fullcalendar/core";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { ShareDataService } from "../../share-data.service";
import { AllModulesService } from "../../all-modules.service";

declare const $: any;
@Component({
  selector: "app-events-main",
  templateUrl: "./events-main.component.html",
  styleUrls: ["./events-main.component.css"],
})
export class EventsMainComponent implements OnInit {
  public addEventsForm: FormGroup;
  public addEventDate;
  public editEventsForm: FormGroup;
  public editEventDate;
  public editEventName;
  public fromAddComponent;
  public url = "events";
  public getCalendarData;
  public calendarEditIndex;
  calendarOptions: CalendarOptions;
  eventsModel: any;
  @ViewChild("fullcalendar", { static: true }) fullcalendar: FullCalendarComponent;
  constructor(
    private formBuilder: FormBuilder,
    private shareData: ShareDataService,
    private srvModuleService: AllModulesService
  ) {
    // call eventFromComponent functio from Add events Component
    this.shareData.listen().subscribe((m: any) => {
      this.eventFromComponent(m);
    });
  }

  ngOnInit() {
    // Add Events form validation
    this.addEventsForm = this.formBuilder.group({
      eventName: ["", [Validators.required]],
      category: ["", [Validators.required]],
    });

    // Edit Events form validation
    this.editEventsForm = this.formBuilder.group({
      eventName: ["", [Validators.required]],
    });

    // Full calendar Plugin configuration
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, bootstrapPlugin],
      editable: true,
      themeSystem: "bootstrap",
      events: [],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridDay",
      },

      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this),
    };
    this.getEvents();
  }

  // for open modal popup
  handleDateClick(arg) {
    this.addEventDate = arg.dateStr;
    $("#my_event").modal("show");
  }
  // for open modal popup
  handleEventClick(arg) {
    this.editEventDate = arg.dateStr;
    this.editEventName = arg.event._def.title;
    $("#edit_event").modal("show");
  }
  // for drag and drop event
  handleEventDragStop(arg) {}

  updateHeader() {
    this.calendarOptions.headerToolbar = {
      left: "prev,next myCustomButton",
      center: "title",
      right: "",
    };
  }

  //get events data API call
  getEvents() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.calendarOptions.events = data;
      this.getCalendarData = data;
    });
  }

  //add events data API call
  addEvents() {
    let newEvent = {
      title: this.addEventsForm.value.eventName,
      date: this.addEventDate,
      className: this.addEventsForm.value.category,
    };

    this.srvModuleService.add(newEvent, this.url).subscribe((data) => {});
    $("#my_event").modal("hide");
    this.getEvents();
  }
  //add events data API call from another component
  eventFromComponent(event) {
    this.fromAddComponent = event;
    this.srvModuleService.add(event, this.url).subscribe((data) => {});
    this.getEvents();
  }

  //edit events data API call
  editEvents() {
    this.calendarEditIndex = this.calendarOptions.events;
    let index = this.calendarEditIndex.findIndex(
      (x) => x.title === this.editEventName
    );
    let newEvent = {
      id: index + 1,
      title: this.editEventsForm.value.eventName,
      date: this.calendarOptions.events[index].date,
      className: this.calendarOptions.events[index].className,
    };
    this.srvModuleService.update(newEvent, this.url).subscribe((data) => {});
    $("#edit_event").modal("hide");
    this.getEvents();
  }

  //delete events data API call
  deleteEvents() {
    this.calendarEditIndex = this.calendarOptions.events;
    // this.calendarOptions.events.push(newEvent);
    let index =
      this.calendarEditIndex.findIndex((x) => x.title === this.editEventName) +
      1;
    if (index !== -1) {
      this.calendarEditIndex.splice(index, 1);
    }
    let id: any = Number(index);
    this.srvModuleService.delete(id, this.url).subscribe((res) => {});
    $("#edit_event").modal("hide");
    this.getEvents();
  }
}
