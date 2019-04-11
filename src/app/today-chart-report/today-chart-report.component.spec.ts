import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayChartReportComponent } from './today-chart-report.component';

describe('TodayChartReportComponent', () => {
  let component: TodayChartReportComponent;
  let fixture: ComponentFixture<TodayChartReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayChartReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayChartReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
