import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesEditComponent } from './fees-edit.component';

describe('FeesEditComponent', () => {
  let component: FeesEditComponent;
  let fixture: ComponentFixture<FeesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
