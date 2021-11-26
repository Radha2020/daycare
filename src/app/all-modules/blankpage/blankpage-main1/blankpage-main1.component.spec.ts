import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankpageMain1Component } from './blankpage-main1.component';

describe('BlankpageMainComponent', () => {
  let component: BlankpageMain1Component;
  let fixture: ComponentFixture<BlankpageMain1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankpageMain1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankpageMain1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
