import React from 'react';

interface Props {
  daysOfTheWeekToRender: string[];
}

function DaysOfTheWeek(props: Props) {
  return (
    <div className="daysOftheWeek">
      {props.daysOfTheWeekToRender.map(dayOfWeek => (
        <div key={dayOfWeek} className="dayOftheWeek">
          {dayOfWeek}
        </div>
      ))}
    </div>
  );
}

export default DaysOfTheWeek;
