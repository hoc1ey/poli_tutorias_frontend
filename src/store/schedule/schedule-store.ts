import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Schedule, SlotState } from '@/interfaces';
import { baseScheduleSeedData } from '@/seed';

interface ScheduleState {
  weeklySchedule: Schedule;
  toggleSlotAvailability: (dayName: string, hour: string) => void;
  initializeSchedule: (schedule?: Schedule) => void;
  clearSchedule: () => void;
  setSchedule: (schedule: Schedule) => void;
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set) => ({
      weeklySchedule: baseScheduleSeedData,

      toggleSlotAvailability: (dayName: string, hour: string) => {
        set((state) => {
          const newSchedule: Schedule = {
            ...state.weeklySchedule,
            days: state.weeklySchedule.days.map((day) => {
              if (day.name === dayName) {
                return {
                  ...day,
                  slots: day.slots!.map((slot) => {
                    if (slot.hour === hour) {
                      const newState: SlotState = slot.state === 'unavailable' ? 'available' : 'unavailable';
                      return {
                        ...slot,
                        state: newState,
                      };
                    }
                    return slot;
                  }),
                };
              }
              return day;
            }),
          };

          return { weeklySchedule: newSchedule };
        });
      },

      initializeSchedule: (schedule?: Schedule) => {
        set({ weeklySchedule: schedule || baseScheduleSeedData });
      },

      setSchedule: (schedule: Schedule) => {
        set({ weeklySchedule: schedule });
      },

      clearSchedule: () => {
        set({ weeklySchedule: baseScheduleSeedData });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('base-schedule');
        }
      },
    }),
    {
      name: 'base-schedule',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : {
          getItem: () => null,
          setItem: () => { },
          removeItem: () => { },
        }
      ),
    }
  )
);
