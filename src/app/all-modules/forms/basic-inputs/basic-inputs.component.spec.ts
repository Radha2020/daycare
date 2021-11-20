import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInputsComponent } from './basic-inputs.component';

describe('BasicInputsComponent', () => {
  let component: BasicInputsComponent;
  let fixture: ComponentFixture<BasicInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
