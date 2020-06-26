import React, { useState, useEffect } from "react";
import styles from "./Agenda.module.scss";

interface Props {
  events?: { description: string; date: Date }[];
  initialDayOfTheWeek?: 0 | 1 | 2;
  daysOfTheWeek?: Array<string>;
  months?: Array<{ full: string; short: string }>;
  initialDate?: Date;
  onMonthChange?: (currentDate: Date) => any;
  onDayClick?: (clickedDay: Date) => any;
}
const daysOftheWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const months = [
  { full: "January", short: "Jan" },
  { full: "February", short: "Feb" },
  { full: "March", short: "Mar" },
  { full: "April", short: "Apr" },
  { full: "May", short: "May" },
  { full: "June", short: "June" },
  { full: "July", short: "July" },
  { full: "August", short: "Aug" },
  { full: "September", short: "Sept" },
  { full: "October", short: "Oct" },
  { full: "November", short: "Nov" },
  { full: "December", short: "Dec" }
];

let shiftArray = (arr: Array<any>, shiftBy: number) => {
  let tempArray = arr.slice();
  return tempArray.concat(tempArray.splice(0, shiftBy));
};

function Agenda(
  props: Props = {
    daysOfTheWeek: daysOftheWeek,
    initialDayOfTheWeek: 0,
    months: months
  }
) {
  let [currentDate, setCurrentDate] = useState(new Date());
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let daysOfTheWeekToRender = shiftArray(
    props.daysOfTheWeek!,
    7 - props.initialDayOfTheWeek!
  );

  let getDays = () => {
    const today = new Date();
    let nbOfDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let dateIterator = new Date(currentYear, currentMonth, 1);
    let isCurrentDay = () => {
      return dateIterator.toDateString() === today.toDateString()
        ? " currentDay"
        : "";
    };
    let startingDay =
      dateIterator.getDay() === 0
        ? (7 + props.initialDayOfTheWeek!) % 7
        : dateIterator.getDay() + props.initialDayOfTheWeek!;
    let output = [
      <span
        key={`day-${dateIterator.getDate()}`}
        className={`day${isCurrentDay()}`}
        style={{ gridColumn: startingDay }}
        data-date={dateIterator.toDateString()}
        onClick={(e: any) => {
          props.onDayClick &&
            props.onDayClick!(
              new Date(e.currentTarget.getAttribute("data-date"))
            );
        }}
      >
        {dateIterator.getDate()}
      </span>
    ];
    dateIterator.setDate(dateIterator.getDate() + 1);
    while (
      dateIterator.getDate() <= nbOfDaysInMonth &&
      currentMonth === dateIterator.getMonth()
    ) {
      output.push(
        <span
          key={`day-${dateIterator.getDate()}`}
          className={`day${isCurrentDay()}`}
          data-date={dateIterator.toDateString()}
          onClick={(e: any) => {
            props.onDayClick &&
              props.onDayClick!(
                new Date(e.currentTarget.getAttribute("data-date"))
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
    setCurrentDate(new Date(tempDate.setMonth(tempDate.getMonth() + 1)));
  };

  let prevMonth = () => {
    let tempDate = currentDate;
    setCurrentDate(new Date(tempDate.setMonth(tempDate.getMonth() - 1)));
  };

  useEffect(() => {
    props.onMonthChange && props.onMonthChange!(currentDate);
  }, [currentDate, props.onMonthChange]);

  return (
    <div className={styles.agendaContainer}>
      <div className="calendarCol">
        <div className="monthsControl">
          <button
            className="prevMonth"
            onClick={() => {
              prevMonth();
            }}
          >
            prev
          </button>
          <button
            className="nextMonth"
            onClick={() => {
              nextMonth();
            }}
          >
            next
          </button>
          <div className="month">{`${months[currentMonth].full} ${currentYear}`}</div>
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
      <div className="eventsCol">
        <div className="event">
          Incididunt in proident excepteur nulla do esse qui ut in ut proident
          labore tempor et.
        </div>
        <div className="event">
          Incididunt in proident excepteur nulla do esse qui ut in ut proident
          labore tempor et.
        </div>
        <div className="event">
          Incididunt in proident excepteur nulla do esse qui ut in ut proident
          labore tempor et.
        </div>
        <div className="event">
          Incididunt in proident excepteur nulla do esse qui ut in ut proident
          labore tempor et.
        </div>
        <div className="event">
          Incididunt in proident excepteur nulla do esse qui ut in ut proident
          labore tempor et.
        </div>
      </div>
    </div>
  );
}

export default Agenda;
