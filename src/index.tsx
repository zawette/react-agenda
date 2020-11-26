import React, { useState, useEffect } from 'react';
import styles from './Agenda.module.css';
import { daysOftheWeek, months, shiftArray, Props } from './AgendaHelper';
import Days from './Days';
import DaysOfTheWeek from './DaysOfTheWeek';
import MonthNavigation from './MonthNavgation';

function Agenda(props: Props) {
  let [currentDate, setCurrentDate] = useState(props.initialDate!);
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let daysOfTheWeekToRender = shiftArray(
    props.daysOfTheWeek!,
    props.initialDayOfTheWeek!
  );

  let nextMonth = () => {
    let tempDate = currentDate;
    tempDate.setDate(1);
    setCurrentDate(new Date(tempDate.setMonth(tempDate.getMonth() + 1)));
  };

  let prevMonth = () => {
    let tempDate = currentDate;
    tempDate.setDate(1);
    setCurrentDate(new Date(tempDate.setMonth(tempDate.getMonth() - 1)));
  };

  let nextYear = () => {
    let tempDate = currentDate;
    tempDate.setDate(1);
    setCurrentDate(new Date(tempDate.setFullYear(tempDate.getFullYear() + 1)));
  };

  let prevYear = () => {
    let tempDate = currentDate;
    tempDate.setDate(1);
    setCurrentDate(new Date(tempDate.setFullYear(tempDate.getFullYear() - 1)));
  };

  useEffect(() => {
    props.onDateChange && props.onDateChange!(currentDate);
  }, [currentDate, props.onDateChange]);

  return (
    <div
      className={`${styles.agendaContainer} ${props.className}`}
      dir={props.dir}
    >
      <MonthNavigation
        currentMonth={props.months![currentMonth].full}
        currentYear={currentYear}
        dir={props.dir}
        disableMonthNav={props.disableMonthNav}
        nextMonth={nextMonth}
        nextYear={nextYear}
        prevMonth={prevMonth}
        prevYear={prevYear}
      />
      <DaysOfTheWeek daysOfTheWeekToRender={daysOfTheWeekToRender} />
      <Days
        currentMonth={currentMonth}
        currentYear={currentYear}
        disabledDays={props.disabledDays}
        initialDayOfTheWeek={props.initialDayOfTheWeek}
        selectedDays={props.selectedDays}
        onDayClick={props.onDayClick}
      />
    </div>
  );
}

Agenda.defaultProps = {
  daysOfTheWeek: daysOftheWeek,
  initialDayOfTheWeek: 0,
  months: months,
  initialDate: new Date(),
  selectedDays: [],
  disabledDays: [],
  dir: 'ltr',
  className: '',
  disableMonthNav: false,
} as Partial<Props>;

export default Agenda;
