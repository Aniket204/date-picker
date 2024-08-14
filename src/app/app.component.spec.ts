import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a selected date', () => {
    expect(component.selectedDate).toBeTruthy();
  });

  it('should display the correct day in the date display', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dayElement = compiled.querySelector('.day')!;
    expect(dayElement.textContent).toContain(
      component.selectedDate.getDate().toString()
    );
  });

  it('should update the month correctly when clicking next month', () => {
    const initialMonth = component.selectedMonth;
    component.changeMonth(1);
    expect(component.selectedMonth).toBe((initialMonth + 1) % 12);
  });

  it('should update the year correctly when clicking next year', () => {
    const initialYear = component.selectedYear;
    component.changeYear(1);
    expect(component.selectedYear).toBe(initialYear + 1);
  });

  it('should update the days in the month when the month changes', () => {
    spyOn(component, 'updateDaysInMonth').and.callThrough();
    component.changeMonth(1);
    expect(component.updateDaysInMonth).toHaveBeenCalled();
  });

  it('should correctly set a day as selected', () => {
    const testDate = new Date(
      component.selectedYear,
      component.selectedMonth,
      10
    );
    component.selectDay(testDate);
    expect(component.selectedDate).toEqual(testDate);
  });

  it('should render the correct number of days in the calendar grid', () => {
    const calendarDays = fixture.debugElement.queryAll(
      By.css('.calendar-grid div')
    );
    expect(calendarDays.length).toBe(component.days.length);
  });

  it('should highlight the selected day', () => {
    const testDate = new Date(
      component.selectedYear,
      component.selectedMonth,
      15
    );
    component.selectDay(testDate);
    fixture.detectChanges();
    const selectedDay = fixture.debugElement.query(By.css('.selected'));
    expect(selectedDay.nativeElement.textContent.trim()).toBe('15');
  });

  it('should handle changing the month from December to January', () => {
    component.selectedMonth = 11;
    component.changeMonth(1);
    expect(component.selectedMonth).toBe(0);
    expect(component.selectedYear).toBe(new Date().getFullYear() + 1);
  });

  it('should handle changing the month from January to December', () => {
    component.selectedMonth = 0;
    component.changeMonth(-1);
    expect(component.selectedMonth).toBe(11);
    expect(component.selectedYear).toBe(new Date().getFullYear() - 1);
  });
});
