export const daysOftheWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export const months = [
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

export let shiftArray = (arr: Array<any>, shiftBy: number) => {
  let tempArray = arr.slice();
  return tempArray.concat(tempArray.splice(0, shiftBy));
};

export interface Props {
  disabledDays: Array<
    Date | { start: Date; end: Date } | { daysOfTheWeek: number[] }
  >;
  selectedDays: {
    date: Date;
    color?: string;
    bgColor?: string;
    event?: string;
  }[];
  initialDayOfTheWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  daysOfTheWeek: Array<string>;
  months: Array<{ full: string; short: string }>;
  initialDate: Date;
  dir: 'rtl' | 'ltr';
  className: string;
  onDateChange?: (currentDate: Date) => void;
  onDayClick?: (clickedDay: Date, event?: string) => void;
  onTodayBtnClick?: (Day: Date) => void;
  todayBtn?: string;
  disableMonthNav: boolean;
}
