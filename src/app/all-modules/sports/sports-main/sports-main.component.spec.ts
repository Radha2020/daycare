import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsMainComponent } from './sports-main.component';

describe('SportsMainComponent', () => {
  let component: SportsMainComponent;
  let fixture: ComponentFixture<SportsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
