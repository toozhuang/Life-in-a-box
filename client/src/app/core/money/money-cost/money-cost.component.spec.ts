import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyCostComponent } from './money-cost.component';

describe('MoneyCostComponent', () => {
  let component: MoneyCostComponent;
  let fixture: ComponentFixture<MoneyCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
