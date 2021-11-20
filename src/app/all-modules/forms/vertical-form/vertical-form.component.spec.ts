import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalFormComponent } from './vertical-form.component';

describe('VerticalFormComponent', () => {
  let component: VerticalFormComponent;
  let fixture: ComponentFixture<VerticalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
