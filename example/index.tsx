import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Agenda from '../.';

const daysOftheWeek = ['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const months = [
  { full: 'January', short: 'Jan' },
  { full: 'February', short: 'Feb' },
  { full: 'March', short: 'Mar' },
  { full: 'April', short: 'Apr' },
  { full: 'May', short: 'May' },
  { full: 'June', short: 'June' },
  { full: 'July', short: 'July' },
  { full: 'August', short: 'Aug' },
  { full: 'September', short: 'Sept' },
  { full: 'October', short: 'Oct' },
  { full: 'November', short: 'Nov' },
  { full: 'December', short: 'Dec' },
];

const today = new Date();
let events = [
  {
    event: 'Event ',
    date: new Date(today.setDate(today.getDate() + 2)),
    bgColor: '#7DDE92',
    color: 'white',
  },
  {
    event: 'another event ',
    date: new Date(today.setDate(today.getDate() + 1)),
    bgColor: '#EEC170',
    color: 'white',
  },
  { event: 'help', date: new Date('2020-06-21') },
  { date: new Date('2020-06-26'), bgColor: '#4E4187', color: 'white' },
];

let onDateChange = (month: Date) => {
  console.log(month);
};

let onDayClicked = (clickedDay: Date, event: string) => {
  console.log(event);
};

const App = () => {
  return (
    <div>
      <Agenda
        className="myAgenda"
        daysOfTheWeek={daysOftheWeek}
        initialDayOfTheWeek={0}
        initialDate={new Date()}
        months={months}
        selectedDays={events}
        disabledDays={[
          new Date('2020-06-22'),
          new Date('2020-06-20'),
          { start: new Date('2020-07-20'), end: new Date('2020-07-26') },
          { daysOfTheWeek: [0, 6] },
        ]}
        onDateChange={(date: Date) => {
          onDateChange(date);
        }}
        onDayClick={(day: Date, event: string) => {
          onDayClicked(day, event);
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
