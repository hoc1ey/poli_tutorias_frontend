import { create } from 'zustand';

interface RequestState {
  price: number;
  day: Date | null;
  hours: number[];
  paymentMethod: 'cash' | 'transfer' | null;

  // Actions
  setDay: (day: Date) => void;
  setHours: (hours: number[]) => void;
  addHour: (hour: number) => void;
  removeHour: (hour: number) => void;
  setPrice: (price: number) => void;
  setPaymentMethod: (method: 'cash' | 'transfer') => void;
  resetRequest: () => void;
}

const initialState = {
  price: 0,
  day: null,
  hours: [],
  paymentMethod: null,
};

export const useRequestStore = create<RequestState>((set) => ({
  ...initialState,

  setDay: (day: Date) => set((state) => {
    if (state.day && state.day.getTime() === day.getTime()) {
      return state;
    }
    return {
      ...state,
      day,
      hours: [],
    };
  }),

  setHours: (hours: number[]) => set({ hours }),

  addHour: (hour: number) => set((state) => ({
    hours: state.hours.includes(hour)
      ? state.hours
      : [...state.hours, hour].sort((a, b) => a - b)
  })),

  removeHour: (hour: number) => set((state) => ({
    hours: state.hours.filter(h => h !== hour)
  })),

  setPrice: (price: number) => set({ price }),

  setPaymentMethod: (method: 'cash' | 'transfer') => set({ paymentMethod: method }),

  resetRequest: () => set(initialState),
}));
