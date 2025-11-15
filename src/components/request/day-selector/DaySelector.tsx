'use client';
import { Day } from '../../../interfaces'
import clsx from 'clsx';
import { useRequestStore } from '@/store';
import { parseDate, areDatesEqual, isPastDate } from '@/utils';

interface Props {
  days: Day[];
  handleSelectedDay: (day: Date) => void;
}

export const DaySelector = ({ days, handleSelectedDay }: Props) => {

  const { day: selectedDay, setDay } = useRequestStore();

  const handleDayClick = (day: Day) => {
    const dateObj = parseDate(day.date);
    if (!dateObj) return;

    setDay(dateObj);
    handleSelectedDay(dateObj);
  };

  const isDaySelected = (dayDate: Date | string | undefined) => {
    if (!dayDate || !selectedDay) return false;
    return areDatesEqual(dayDate, selectedDay);
  };

  return (
    <div className='flex gap-[37px]'>
      {
        days.map((day) => {
          const isSelected = isDaySelected(day.date);
          const hasAvailableSlots = day.slots && day.slots.some(slot => slot.state === 'available');
          const isInPast = isPastDate(day.date);
          const isAvailable = hasAvailableSlots && !isInPast;

          return (
            <div
              key={day.date?.toString()}
              onClick={() => isAvailable && handleDayClick(day)}
              className={clsx(
                'flex flex-col my-[20px] items-center justify-center w-[85px] h-[69px] border border-(--grey) text-[16px] rounded-[6px] transition-colors',
                {
                  'bg-(--dark-blue) text-white cursor-pointer': isSelected,
                  'cursor-pointer hover:bg-gray-50': !isSelected && isAvailable,
                  'cursor-not-allowed bg-(--light-grey) text-(--grey)': !isAvailable
                }
              )}>
              <p className='font-bold'>
                {day.name!.substring(0, 3)}
              </p>
              <p>
                {day.date!.toString().split('-')[2]}
              </p>
            </div>
          );
        })
      }

    </div>
  )
}

