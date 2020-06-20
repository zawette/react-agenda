import React from "react";
import styles from "./Agenda.module.scss";

interface Props {}

const daysOftheWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let tempDays=Array.from(Array(30).keys());


function Agenda(props: Props) {
  return (
    <div className={styles.agendaContainer}>
      <div className="calendarCol">
        <div className="month">{months[1]} 1996</div>
        <div className="daysOftheWeek">
          {daysOftheWeek.map(dayOfWeek => (
            <div className="dayOftheWeek">{dayOfWeek}</div>
          ))}
        </div>
        <div className="dates">
        {tempDays.map(day=> <div className="day">{day}</div> )}
        </div>
      </div>
      <div className="eventsCol">
          
            <div className="event">Incididunt in proident excepteur nulla do esse qui ut in ut proident labore tempor et.</div>
            <div className="event">Incididunt in proident excepteur nulla do esse qui ut in ut proident labore tempor et.</div>
            <div className="event">Incididunt in proident excepteur nulla do esse qui ut in ut proident labore tempor et.</div>
            <div className="event">Incididunt in proident excepteur nulla do esse qui ut in ut proident labore tempor et.</div>
            <div className="event">Incididunt in proident excepteur nulla do esse qui ut in ut proident labore tempor et.</div>

      </div>
    </div>
  );
}

export default Agenda;
