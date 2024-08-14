import { Component } from '@angular/core';

interface Day {
  date: Date;
  isOutsideMonth: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedDate: Date = new Date();
  selectedYear: number = this.selectedDate.getFullYear();
  selectedMonth: number = this.selectedDate.getMonth();
  days: Day[] = [];

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor() {
    this.updateDaysInMonth();
  }

  updateDaysInMonth() {
    const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
    const lastDayOfMonth = new Date(
      this.selectedYear,
      this.selectedMonth + 1,
      0
    );
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    this.days = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      const date = new Date(
        this.selectedYear,
        this.selectedMonth,
        -firstDayOfWeek + i + 1
      );
      this.days.push({ date, isOutsideMonth: true });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.selectedYear, this.selectedMonth, i);
      this.days.push({ date, isOutsideMonth: false });
    }

    const daysToEndOfWeek = 7 - ((firstDayOfWeek + daysInMonth) % 7);
    for (let i = 1; i <= daysToEndOfWeek; i++) {
      const date = new Date(this.selectedYear, this.selectedMonth + 1, i);
      this.days.push({ date, isOutsideMonth: true });
    }
  }

  changeMonth(offset: number) {
    this.selectedMonth += offset;
    if (this.selectedMonth < 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else if (this.selectedMonth > 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    }
    this.updateDaysInMonth();
  }

  changeYear(offset: number) {
    this.selectedYear += offset;
    this.updateDaysInMonth();
  }

  selectDay(day: Date) {
    this.selectedDate = day;
  }
}
