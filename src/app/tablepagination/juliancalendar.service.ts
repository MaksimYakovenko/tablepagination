import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JuliancalendarService {

  constructor() { }

  toJulianDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a; // Строка вычесляющая год
    const m = month + 12 * a - 3; // Строка вычесляющая месяц

    const julianDay = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    // Формула для вычисления юлианского дня.
    // • day - количество дней
    // • Math.floor((153 * m + 2) / 5) - Часть формулы, отвечающая за учет месяца и вычисление определенного значения.
    // • 365 * y - Количество дней в годах
    // • Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - Коррекция на високосные года.
    // • 32045 - Коррекция для соответствия формату юлианских дней.

    return julianDay.toString();
  }
}
