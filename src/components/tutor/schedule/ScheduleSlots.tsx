'use client';

import React from 'react'
import { Day } from '@/interfaces'
import clsx from 'clsx';

interface Props {
  hour: string;
  day: Day;
  toggleSlotAvailability: (dayName: string, hour: string) => void;
  isEditable: boolean;
  isLastHour: boolean;
  isLastDay: boolean;
}

export const ScheduleSlots = ({ day, hour, toggleSlotAvailability, isEditable, isLastHour, isLastDay }: Props) => {

  const slot = day.slots!.find(s => s.hour === hour);

  const handleClick = () => {
    if (isEditable) {
      toggleSlotAvailability(day.name!, hour);
    }
  }

  return (
    <td
      key={`${day.name}-${hour}`}
      className={clsx('schedule-slot', {
        'available': slot?.state === 'available',
        'unavailable': slot?.state === 'unavailable',
        'occupied': slot?.state === 'occupied',
        'requested': slot?.state === 'requested',
        'available-schedule-slot': slot?.state === 'available',
        'cursor-pointer': isEditable,
        'rounded-br-[10px]': isLastHour && isLastDay
      })}
      onClick={handleClick}
    >
      {slot?.state === 'available' ? 'Disponible' : ''}
      {slot?.state === 'occupied' ? 'Ocupado' : ''}
      {slot?.state === 'requested' ? 'Solicitado' : ''}
    </td>
  )
}
