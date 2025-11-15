'use client';
import React from 'react'
import { Day } from '../../../interfaces/schedule-interface';
import clsx from 'clsx';
import { useRequestStore } from '@/store';
import { formatHourSlot, isPastTimeSlot } from '@/utils';

interface Props {
  selectedDay: Day | null;
}

export const TimeSlotSelector = ({ selectedDay }: Props) => {
  const { hours, addHour, removeHour } = useRequestStore();

  const handleSlotClick = (hour: number, isAvailable: boolean) => {
    if (!isAvailable) return;

    if (hours.includes(hour)) {
      removeHour(hour);
    } else {
      addHour(hour);
    }
  };

  if (!selectedDay) {
    return (
      <p className='font-inter font-semibold text-[14px] text-(--grey) mt-[20px] text-center'>Selecciona una fecha</p>
    )
  }

  if (!selectedDay.slots || selectedDay.slots.length === 0) {
    return (
      <p className='font-inter font-semibold text-[14px] text-(--grey) mt-[20px] text-center'>El tutor no está disponible en este día</p>
    )
  }

  return (
    <div className='flex gap-x-[37px] flex-wrap mt-[10px]'>
      {
        selectedDay?.slots?.map((slot) => {
          const hourNumber = parseInt(slot.hour);
          const isSelected = hours.includes(hourNumber);
          const isStateAvailable = slot.state === 'available';
          const isInPast = isPastTimeSlot(hourNumber, selectedDay.date);
          const isAvailable = isStateAvailable && !isInPast;

          return (
            <div
              key={`${selectedDay.date}-${slot.hour}`}
              onClick={() => handleSlotClick(hourNumber, isAvailable)}
              className={clsx(
                'flex my-[10px] items-center justify-center w-[158px] h-[42px] border border-(--grey) text-[16px] rounded-[6px] transition-colors',
                {
                  'bg-(--dark-blue) text-white cursor-pointer': isSelected,
                  'cursor-pointer hover:bg-gray-50': !isSelected && isAvailable,
                  'cursor-not-allowed bg-(--light-grey) text-(--grey)': !isAvailable
                }
              )}>
              <p>
                {formatHourSlot(slot.hour)}
              </p>
            </div>
          );
        })
      }
    </div>
  )
}

