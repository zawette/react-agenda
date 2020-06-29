import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Agenda from "./agenda/Agenda";
import * as serviceWorker from "./serviceWorker";

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

let events = [
  { event: "Event1", date: new Date("2020-06-24") ,bgColor:"red" , color:"white" },
  { event: "Event2", date: new Date("2020-06-20") ,bgColor:"blue", color:"white"}
];

let onMonthChange = (month: Date) => {
  console.log(month);
};

let onDayClicked = (clickedDay: Date) => {
  console.log(clickedDay);
};

ReactDOM.render(
  <React.StrictMode>
    <Agenda
      daysOfTheWeek={daysOftheWeek}
      initialDayOfTheWeek={1}
      months={months}
      // events={events}
      selectedDays={events}
      onMonthChange={(month: Date) => {
        onMonthChange(month);
      }}
      onDayClick={(day: Date) => {
        onDayClicked(day);
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
