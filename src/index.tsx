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
  { event: "Event ", date: new Date("2020-06-24") ,bgColor:"#7DDE92" , color:"white" },
  { event: "another event ", date: new Date("2020-06-20") ,bgColor:"#4E4187", color:"white"},
  { event: "help", date: new Date("2020-06-21")},
  { date: new Date("2020-06-26") , bgColor:"#EEC170"},

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
      initialDate={new Date()}
      months={months}
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

serviceWorker.unregister();
