'use client';
import clsx from 'clsx'
import React, { useState } from 'react'
import { Day, Schedule } from '@/interfaces';
import { DaySelector } from '../day-selector/DaySelector';
import { TimeSlotSelector } from '../time-slot-selector/TimeSlotSelector';
import { useRequestStore } from '@/store';
import { parseDate, areDatesEqual } from '@/utils';

interface Props {
  schedule: Schedule;
}

export const AvailabilityCard = ({ schedule }: Props) => {

  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const { setDay } = useRequestStore();

  const handleSelectedDay = (dayDate: Date) => {
    const foundDay = schedule.days.find(d => areDatesEqual(d.date, dayDate));
    if (foundDay) {
      setSelectedDay(foundDay);
    }
  }

  return (
    <div className='offer-detail-card'>
      <h3 className='font-inter font-bold text-[16px] text-(--dark-blue)'>
        1. Selecciona una fecha
      </h3>

      <DaySelector days={schedule.days} handleSelectedDay={handleSelectedDay} />

      <hr className='w-full text-(--grey)' />

      <h3 className='font-inter font-bold text-[16px] text-(--dark-blue) mt-[20px]'>
        2. Selecciona una o más horas
      </h3>

      <TimeSlotSelector selectedDay={selectedDay} />

    </div>
  )
}
