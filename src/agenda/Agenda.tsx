import React, { useState } from "react";
import styles from "./Agenda.module.scss";

interface Props {
  events?: { description: string; date: Date }[];
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

function Agenda(props: Props) {
  let [currentDate, setCurrentDate] = useState(new Date());
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  let getDays = () => {
    let nbOfDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    let dateIterator = new Date(currentYear, currentMonth, 1);
    const today = new Date()
    let output = [];
    while (dateIterator.getDate() < nbOfDaysInMonth && currentMonth === dateIterator.getMonth()) {
      let isCurrentDay =
      dateIterator.toDateString() === today.toDateString() ? "currentDay" : "";
      output.push(
        <div key={`day-${dateIterator.getDate()}`} id={`day-${dateIterator.getDate()}`} className={`day ${isCurrentDay}`}>{dateIterator.getDate()}</div>
      );
      dateIterator.setDate(dateIterator.getDate() + 1);
    }
    return output;
  };

  let nextMonth= ()=>{
    let tempDate=currentDate;
    setCurrentDate(new Date(tempDate.setMonth(tempDate.getMonth() + 1)));
  }

  let prevMonth= ()=>{
    let tempDate=currentDate;
    setCurrentDate(new Date(tempDate.setMonth(tempDate.getMonth() - 1)));
  }


  return (
    <div className={styles.agendaContainer}>
      <div className="calendarCol">
        <div className="monthsControl">
          <button className="prevMonth" onClick={()=>{prevMonth()}}>prev</button>
          <button className="nextMonth" onClick={()=>{nextMonth()}}>next</button>
          <div className="month">{`${months[currentMonth].full} ${currentYear}`}</div>
        </div>
        <div className="daysOftheWeek">
          {daysOftheWeek.map(dayOfWeek => (
            <div key={dayOfWeek} className="dayOftheWeek">{dayOfWeek}</div>
          ))}
        </div>
        <div className="dates">
          { getDays()}
        </div>
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
