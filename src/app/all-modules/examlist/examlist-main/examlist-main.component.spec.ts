import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamlistMainComponent } from './examlist-main.component';

describe('ExamlistMainComponent', () => {
  let component: ExamlistMainComponent;
  let fixture: ComponentFixture<ExamlistMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamlistMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamlistMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
