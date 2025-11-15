export interface Schedule {
  weekStart?: Date;
  weekEnd?: Date;
  days: Day[];
}

export interface Day {
  date?: Date;
  name?: string;
  slots?: Slot[];
}

export type SlotState = 'unavailable' | 'available' | 'occupied' | 'requested';

export interface Slot {
  hour: string;
  state: SlotState;
  // request?:
}