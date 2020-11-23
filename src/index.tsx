import React, { useState, useEffect } from 'react';
import styles from './Agenda.module.css';
import { daysOftheWeek, months, shiftArray } from './AgendaHelper';

interface Props {
  disabledDays: Date[];
  selectedDays: {
    date: Date;
    color?: string;
    bgColor?: string;
    event?: string;
  }[];
  initialDayOfTheWeek: 0 | 1 | 2;
  daysOfTheWeek: Array<string>;
  months: Array<{ full: string; short: string }>;
  initialDate: Date;
  dir: 'rtl' | 'ltr';
  className: string;
  onDateChange?: (currentDate: Date) => any;
  onDayClick?: (clickedDay: Date, event?: string) => any;
}

function Agenda(props: Props) {
  let [currentDate, setCurrentDate] = useState(props.initialDate!);
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let daysOfTheWeekToRender = shiftArray(
    props.daysOfTheWeek!,
    7 - props.initialDayOfTheWeek!
  );
  let isRTL = props.dir === 'rtl';
  let getDays = () => {
    const today = new Date();
    let nbOfDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let dateIterator = new Date(currentYear, currentMonth, 1);
    let isCurrentDay = () => {
      return dateIterator.toDateString() === today.toDateString();
    };
    let getSelectedDayData = (): any => {
      const index = props.selectedDays!.findIndex(
        d => d.date.toDateString() === dateIterator.toDateString()
      );
      const selectedDayStyle = index !== -1
      ? {
          color: props.selectedDays![index]?.color,
          backgroundColor: props.selectedDays![index]?.bgColor,
        }
      : {};
      return {selectedDayStyle,index}
    };
    let getDisabledDayStyle = (): any => {
      const disabledDay = props.disabledDays!.findIndex(
        d => d.toDateString() === dateIterator.toDateString()
      );
      return disabledDay !== -1
        ? { pointerEvents: 'none', opacity: '0.4' }
        : {};
    };
    let startingDay =
      dateIterator.getDay() === 0
        ? (7 + props.initialDayOfTheWeek!) % 7
        : dateIterator.getDay() + props.initialDayOfTheWeek!;

    let selectedDayData = getSelectedDayData();
    let disabledDayStyle = getDisabledDayStyle();

    let output = [
      <span
        title={props.selectedDays![selectedDayData.index]?.event}
        key={`day-${dateIterator.getDate()}`}
        className={`day${isCurrentDay() ? ' currentDay' : ''} ${
          selectedDayData.index !== -1 ? ' selectedDay' : ''
        }`}
        style={{
          ...disabledDayStyle,
          ...selectedDayData.selectedDayStyle,
          gridColumn: startingDay,
        }}
        data-date={dateIterator.toDateString()}
        onClick={(e: any) => {
          props.onDayClick &&
            props.onDayClick!(
              new Date(e.currentTarget.getAttribute('data-date')),
              e.currentTarget.getAttribute('title')
            );
        }}
      >
        {dateIterator.getDate()}
      </span>,
    ];
    dateIterator.setDate(dateIterator.getDate() + 1);
    while (
      dateIterator.getDate() <= nbOfDaysInMonth &&
      currentMonth === dateIterator.getMonth()
    ) {
      selectedDayData = getSelectedDayData();
      disabledDayStyle = getDisabledDayStyle();
      output.push(
        <span
          title={props.selectedDays![selectedDayData.index]?.event}
          key={`day-${dateIterator.getDate()}`}
          className={`day${isCurrentDay() ? ' currentDay' : ''} ${
            selectedDayData.index !== -1 ? ' selectedDay' : ''
          }`}
          style={{
            ...disabledDayStyle,
            ...selectedDayData.selectedDayStyle
          }}
          data-date={dateIterator.toDateString()}
          onClick={(e: any) => {
            props.onDayClick &&
              props.onDayClick!(
                new Date(e.currentTarget.getAttribute('data-date')),
                e.currentTarget.getAttribute('title')
              );
          }}
        >
          {dateIterator.getDate()}
        </span>
      );
      dateIterator.setDate(dateIterator.getDate() + 1);
    }
    return output;
  };

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
      <div className="monthsControl">
        <button
          className="prevYear"
          onClick={() => {
            prevYear();
          }}
        >
          {isRTL ? '››' : '‹‹'}
        </button>
        <button
          className="prevMonth"
          onClick={() => {
            prevMonth();
          }}
        >
          {isRTL ? '›' : '‹'}
        </button>
        <button
          className="nextYear"
          onClick={() => {
            nextYear();
          }}
        >
          {isRTL ? '‹‹' : '››'}
        </button>
        <button
          className="nextMonth"
          onClick={() => {
            nextMonth();
          }}
        >
          {isRTL ? '‹' : '›'}
        </button>

        <div className="month">{`${
          props.months![currentMonth].full
        } ${currentYear}`}</div>
      </div>
      <div className="daysOftheWeek">
        {daysOfTheWeekToRender.map(dayOfWeek => (
          <div key={dayOfWeek} className="dayOftheWeek">
            {dayOfWeek}
          </div>
        ))}
      </div>
      <div className="dates">{getDays()}</div>
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
} as Partial<Props>;

export default Agenda;
