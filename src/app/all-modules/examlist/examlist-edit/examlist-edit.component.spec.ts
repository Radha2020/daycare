import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamlistEditComponent } from './examlist-edit.component';

describe('ExamlistEditComponent', () => {
  let component: ExamlistEditComponent;
  let fixture: ComponentFixture<ExamlistEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamlistEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamlistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
