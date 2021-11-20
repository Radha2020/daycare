import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EventsRoutingModule } from "./events-routing.module";
import { EventsComponent } from "./events.component";
import { EventsMainComponent } from "./events-main/events-main.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import interactionPlugin from "@fullcalendar/interaction";
import { EventsAddComponent } from "./events-add/events-add.component"; // a plugin
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);
@NgModule({
  declarations: [EventsComponent, EventsMainComponent, EventsAddComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EventsModule {}
