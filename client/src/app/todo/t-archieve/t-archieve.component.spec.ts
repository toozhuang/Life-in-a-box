import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TArchieveComponent } from './t-archieve.component';

describe('TArchieveComponent', () => {
  let component: TArchieveComponent;
  let fixture: ComponentFixture<TArchieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TArchieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TArchieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
