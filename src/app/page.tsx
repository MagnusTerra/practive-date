"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@heroui/calendar";
import { parseDate, today, CalendarDate, isWeekend, getLocalTimeZone, DateValue } from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  const [date1] = useState(parseDate("2025-01-15"));
  const [date2] = useState(today(getLocalTimeZone()));
  const [daysBetween, setDaysBetween] = useState(0);
  const {locale} = useLocale();

  const disabledDates = (date: DateValue) => {
    return isWeekend(date, locale);
  };

  useEffect(() => {
    const calculateBusinessDays = (startDate: CalendarDate, endDate: CalendarDate) => {
      let count = 0;
      let currentDate = startDate;
      while (currentDate.compare(endDate) <= 0) {
        const dayOfWeek = currentDate.toDate(getLocalTimeZone()).getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sundays and Saturdays
          count++;
        }
        currentDate = currentDate.add({ days: 1 });
      }
      return count;
    };

    setDaysBetween(calculateBusinessDays(date1, date2));
  }, [date1, date2]);

  return (
    <div className="dark flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <main className="flex flex-col gap-8 items-center sm:items-start">
      <h1 className="text-center text-4xl sm:text-5xl">Business Days Calculator</h1>
      <p className="text-center text-sm sm:text-base">Calculate the number of business days between two dates.</p>
      <div className="flex flex-col sm:flex-row gap-8">
        <div>
        <h2 className="text-center mb-4 text-lg sm:text-xl">Date: 15/01/2025</h2>
        <Calendar aria-label="Date (Controlled)" value={date1} isDateUnavailable={disabledDates} />
        </div>
        <div>
        <h2 className="text-center mb-4 text-lg sm:text-xl">Current Date</h2>
        <Calendar aria-label="Current Date" value={date2} isDateUnavailable={disabledDates} errorMessage />
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg sm:text-xl">Business Days Between: {daysBetween}</h3>
        <h3 className="text-lg sm:text-xl">Total hours worked: {daysBetween * 8}</h3>
      </div>
      </main>
    </div>
  );
}
