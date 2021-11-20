import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesMainComponent } from './fees-main.component';

describe('FeesMainComponent', () => {
  let component: FeesMainComponent;
  let fixture: ComponentFixture<FeesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
