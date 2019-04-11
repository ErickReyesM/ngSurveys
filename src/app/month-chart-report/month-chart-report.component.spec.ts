import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthChartReportComponent } from './month-chart-report.component';

describe('MonthChartReportComponent', () => {
  let component: MonthChartReportComponent;
  let fixture: ComponentFixture<MonthChartReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthChartReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthChartReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
