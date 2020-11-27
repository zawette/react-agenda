# react-zaw-agenda

Lightweight react calendar component with no dependencies .

![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-zaw-agenda)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/zawette/react-agenda/CI)
![version](https://img.shields.io/npm/v/react-zaw-agenda)

- Add events to the calendar
- RTL support
- Supports any language
- disable days based on their week number (weekends for instance \[0,6] ), or a date range

## install

> npm i react-zaw-agenda

## demo

https://zawette.github.io/react-agenda/

## Usage

```jsx
import Agenda from 'react-zaw-agenda';

const daysOftheWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
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

let events = [
  {
    event: 'Event ',
    date: new Date('2020-06-24'),
    bgColor: '#7DDE92',
    color: 'white',
  },
  {
    event: 'another event ',
    date: new Date('2020-06-20'),
    bgColor: '#4E4187',
    color: 'white',
  },
  { event: 'help', date: new Date('2020-06-21') },
  { date: new Date('2020-06-26'), bgColor: '#EEC170' },
];

let onMonthChange = month => {
  console.log(month);
};

let onDayClicked = (clickedDay, eventName) => {
  console.log(eventName);
};

<Agenda
  className="myAgenda"
  daysOfTheWeek={daysOftheWeek}
  initialDayOfTheWeek={1}
  initialDate={new Date()}
  months={months}
  selectedDays={events}
  todayBtn="Today"
  onDateChange={(month: Date) => {
    onMonthChange(month);
  }}
  onDayClick={(day, eventName) => {
    onDayClicked(day, eventName);
  }}
  disabledDays={[
    new Date(),
    new Date('2020-06-20'),
    { start: new Date('2020-07-20'), end: new Date('2020-07-26') },
    { daysOfTheWeek: [0, 6] },
  ]}
  disableMonthNav={true}
/>;
```

## API

all props are optional

| name                | type                                                                       | description                                                                                     |
| ------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| daysOfTheWeek       | Array \<string>                                                            | custom days of the week, must start with Sunday                                                 |
| initialDayOfTheWeek | number                                                                     | specifies the initial day of of the week, 0 representing sunday, monday = 1, saturday = 6 etc.. |
| months              | Array<{ full: string; short: string }>                                     | custom short and full months strings                                                            |
| selectedDays        | { date: Date; color?: string; bgColor?: string; event?: string; }[]        | adds events to the calendar                                                                     |
| onDateChange        | (currentDate: Date) => void;                                               | called when user changes the Date (month or year)                                               |
| onDayClick          | (clickedDay: Date, event?: string) => void;                                | called when user click on a day                                                                 |
| disabledDays        | Array \<Date \| { start: Date; end: Date } \| { daysOfTheWeek: number[] }> | disable click on specific days or a date range                                                  |
| className           | string                                                                     | custom className                                                                                |
| disableMonthNav     | bool                                                                       | disables month navigation                                                                       |
| todayBtn            | string                                                                     | displays a button that navigates to the current month with the specified string                 |
| onTodayBtnClick     | (Day: Date) => void;                                                       | called when todayBtn is clicked, if todayBtn is set                                             |
