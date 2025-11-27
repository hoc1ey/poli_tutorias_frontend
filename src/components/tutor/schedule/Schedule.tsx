'use client';

import { useEffect } from 'react'
import { Schedule as ScheduleInterface } from '@/interfaces';
import './Schedule.css'
import clsx from 'clsx';
import { ScheduleSlots } from './ScheduleSlots';
import { useScheduleStore } from '@/store';
import { baseScheduleSeedData } from '@/seed';
import { formatHourSlot } from '@/utils';

interface Props {
  weeklyScheduleProp: ScheduleInterface | null;
  isEditable: boolean;
}

export const Schedule = ({ weeklyScheduleProp, isEditable }: Props) => {

  const { weeklySchedule, toggleSlotAvailability, initializeSchedule, setSchedule } = useScheduleStore();

  useEffect(() => {
    if (weeklyScheduleProp && weeklyScheduleProp.days && weeklyScheduleProp.days.length > 0) {
      setSchedule(weeklyScheduleProp);
    }
    else if (weeklySchedule.days.length === 0) {
      initializeSchedule(baseScheduleSeedData);
    }
  }, [weeklyScheduleProp, initializeSchedule, setSchedule, weeklySchedule.days.length]);

  const currentSchedule = weeklySchedule;

  const hours = currentSchedule.days[0]?.slots?.map(slot => slot.hour) || [];

  if (!weeklyScheduleProp) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="offer-grid-no-content">Error al cargar el horario.</p>
      </div>
    )
  }

  return (
    <div className='flex w-full items-center align-middle justify-center mt-7 mb-[46px]'>
      <table>
        <thead >
          <tr>
            <th className='schedule-header rounded-tl-[10px]'>
              Hora
            </th>

            {
              currentSchedule.days.map((day, i) => (
                <th
                  key={`${day.name}`}
                  className={clsx('schedule-header', {
                    'rounded-tr-[10px]': i === currentSchedule.days.length - 1
                  })}
                >
                  {day.name} {day.date?.toString().split('-')[2]}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            hours.map((hour, hourIndex) => (
              <tr key={hour}>
                <td className={clsx('schedule-hour',
                  {
                    'rounded-bl-[10px]': hourIndex === hours.length - 1
                  })}>
                  {formatHourSlot(hour)}
                </td>
                {
                  currentSchedule.days.map((day, dayIndex) => {
                    return (
                      <ScheduleSlots
                        key={`${day.name}${hour}`}
                        hour={hour}
                        day={day}
                        toggleSlotAvailability={toggleSlotAvailability}
                        isEditable={isEditable}
                        isLastHour={hourIndex === hours.length - 1}
                        isLastDay={dayIndex === currentSchedule.days.length - 1}
                      />
                    );
                  })
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
