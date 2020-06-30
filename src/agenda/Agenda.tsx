import React, { useState, useEffect } from "react";
import styles from "./Agenda.module.scss";

interface Props {
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
  dir:"rtl"|"ltr";
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

//TODO: rich tooltips ,month N year navigation

function Agenda(props: Props) {
  let [currentDate, setCurrentDate] = useState(props.initialDate!);
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let daysOfTheWeekToRender = shiftArray(
    props.daysOfTheWeek!,
    7 - props.initialDayOfTheWeek!
  );
  let isRTL=props.dir==="rtl";
  let getDays = () => {
    const today = new Date();
    let nbOfDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let dateIterator = new Date(currentYear, currentMonth, 1);
    let isCurrentDay = () => {
      return dateIterator.toDateString() === today.toDateString();
    };
    let getDayIndex = () => {
      return props.selectedDays!.findIndex(
        d => d.date.toDateString() === dateIterator.toDateString()
      );
    };
    let startingDay =
      dateIterator.getDay() === 0
        ? (7 + props.initialDayOfTheWeek!) % 7
        : dateIterator.getDay() + props.initialDayOfTheWeek!;

    let selectedDayIndex = getDayIndex();

    let output = [
      <span
        title={
          selectedDayIndex !== -1
            ? props.selectedDays![selectedDayIndex].event
            : ""
        }
        key={`day-${dateIterator.getDate()}`}
        className={`day${isCurrentDay() ? " currentDay" : ""} ${
          selectedDayIndex !== -1 ? " selectedDay" : ""
        }`}
        style={{
          gridColumn: startingDay,
          color:
            selectedDayIndex !== -1
              ? props.selectedDays![selectedDayIndex].color
              : "",
          backgroundColor:
            selectedDayIndex !== -1
              ? props.selectedDays![selectedDayIndex].bgColor
              : ""
        }}
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
      selectedDayIndex = getDayIndex();
      output.push(
        <span
          title={
            selectedDayIndex !== -1
              ? props.selectedDays![selectedDayIndex].event
              : ""
          }
          key={`day-${dateIterator.getDate()}`}
          className={`day${isCurrentDay() ? " currentDay" : ""} ${
            selectedDayIndex !== -1 ? " selectedDay" : ""
          }`}
          style={{
            color:
              selectedDayIndex !== -1
                ? props.selectedDays![selectedDayIndex].color
                : "",
            backgroundColor:
              selectedDayIndex !== -1
                ? props.selectedDays![selectedDayIndex].bgColor
                : ""
          }}
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
    tempDate.setDate(1);
    setCurrentDate(new Date(tempDate.setMonth(tempDate.getMonth() + 1)));
  };

  let prevMonth = () => {
    let tempDate = currentDate;
    tempDate.setDate(1);
    setCurrentDate(new Date(tempDate.setMonth(tempDate.getMonth() - 1)));
  };

  useEffect(() => {
    props.onMonthChange && props.onMonthChange!(currentDate);
  }, [currentDate, props.onMonthChange]);

  return (
    <div className={styles.agendaContainer} dir={props.dir}>
      <div className="monthsControl">
        <button
          className="prevMonth"
          onClick={() => {
            prevMonth();
          }}
        >
          {isRTL? "›" : "‹"}
        </button>
        <button
          className="nextMonth"
          onClick={() => {
            nextMonth();
          }}
        >
          {isRTL? "‹" : "›"}
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
  dir:"ltr"
} as Partial<Props>;

export default Agenda;
