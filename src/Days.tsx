import React from 'react';

interface Props {
  currentMonth: number;
  currentYear: number;
  disabledDays: Array<
    Date | { start: Date; end: Date } | { daysOfTheWeek: number[] }
  >;
  initialDayOfTheWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  selectedDays: {
    date: Date;
    color?: string;
    bgColor?: string;
    event?: string;
  }[];
  onDayClick?: (clickedDay: Date, event?: string) => any;
}

function Days(props: Props) {
  let getDays = () => {
    const today = new Date();
    let nbOfDaysInMonth = new Date(
      props.currentYear,
      props.currentMonth + 1,
      0
    ).getDate();
    let dateIterator = new Date(props.currentYear, props.currentMonth, 1);
    let isCurrentDay = () => {
      return dateIterator.toDateString() === today.toDateString();
    };
    let getSelectedDayData = (): any => {
      const index = props.selectedDays!.findIndex(
        d => d.date.toDateString() === dateIterator.toDateString()
      );
      const selectedDayStyle =
        index !== -1
          ? {
              color: props.selectedDays![index]?.color,
              backgroundColor: props.selectedDays![index]?.bgColor,
            }
          : {};
      return { selectedDayStyle, index };
    };
    let getDisabledDayStyle = (): any => {
      const disabledDay = props.disabledDays!.findIndex((d: any) => {
        if (d instanceof Date)
          return d.toDateString() === dateIterator.toDateString();
        else if (dateIterator >= d.start && dateIterator <= d.end) return true;
        else if ('daysOfTheWeek' in d)
          return d.daysOfTheWeek.includes(dateIterator.getDay());
        else return false;
      });
      return disabledDay !== -1
        ? { pointerEvents: 'none', opacity: '0.4' }
        : {};
    };
    let startingDay =
      1 + dateIterator.getDay() + ((7 - props.initialDayOfTheWeek!) % 7);

    let selectedDayData;
    let disabledDayStyle;
    let output = [];
    while (
      dateIterator.getDate() <= nbOfDaysInMonth &&
      props.currentMonth === dateIterator.getMonth()
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
            ...selectedDayData.selectedDayStyle,
            gridColumn: output.length === 0 ? startingDay : 'unset',
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

  return <div className="dates">{getDays()}</div>;
}

export default Days;
