import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekChartReportComponent } from './week-chart-report.component';

describe('WeekChartReportComponent', () => {
  let component: WeekChartReportComponent;
  let fixture: ComponentFixture<WeekChartReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekChartReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekChartReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
