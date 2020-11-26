import React from 'react';

interface Props {
  dir: 'rtl' | 'ltr';
  disableMonthNav: boolean;
  currentMonth: string;
  currentYear: number;
  prevYear: Function;
  prevMonth: Function;
  nextYear: Function;
  nextMonth: Function;
}

function MonthNavgation(props: Props) {
  const {
    dir,
    disableMonthNav,
    currentMonth,
    currentYear,
    prevYear,
    prevMonth,
    nextYear,
    nextMonth,
  } = props;
  const isRTL = dir === 'rtl';

  return disableMonthNav ? (
    <div className="month">{`${currentMonth} ${currentYear}`}</div>
  ) : (
    <>
      <button
        className="prevYear"
        onClick={() => {
          prevYear();
        }}
      >
        {isRTL ? '››' : '‹‹'}
      </button>
      <button
        className="prevMonth"
        onClick={() => {
          prevMonth();
        }}
      >
        {isRTL ? '›' : '‹'}
      </button>
      <button
        className="nextYear"
        onClick={() => {
          nextYear();
        }}
      >
        {isRTL ? '‹‹' : '››'}
      </button>
      <button
        className="nextMonth"
        onClick={() => {
          nextMonth();
        }}
      >
        {isRTL ? '‹' : '›'}
      </button>
      <div className="month">{`${currentMonth} ${currentYear}`}</div>
    </>
  );
}

export default MonthNavgation;
