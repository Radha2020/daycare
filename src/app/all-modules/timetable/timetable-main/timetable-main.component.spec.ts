import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableMainComponent } from './timetable-main.component';

describe('TimetableMainComponent', () => {
  let component: TimetableMainComponent;
  let fixture: ComponentFixture<TimetableMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
