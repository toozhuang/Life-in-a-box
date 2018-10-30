import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyIncomeComponent } from './money-income.component';

describe('MoneyIncomeComponent', () => {
  let component: MoneyIncomeComponent;
  let fixture: ComponentFixture<MoneyIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
